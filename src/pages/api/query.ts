import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function scrapeSources(query: string) {
  // Dummy HTML data for handwash services
  const dummyHTML = `
    <div class="listing">
      <div class="name">Handwasher Co.</div>
      <div class="rating">4.8</div>
      <div class="price">50</div>
    </div>
    <div class="listing">
      <div class="name">San Francisco Handwash Experts</div>
      <div class="rating">4.5</div>
      <div class="price">60</div>
    </div>
    <div class="listing">
      <div class="name">Quick Handwash Services</div>
      <div class="rating">4.7</div>
      <div class="price">55</div>
    </div>
    <div class="listing">
      <div class="name">Speedy Wash Pros</div>
      <div class="rating">4.6</div>
      <div class="price">65</div>
    </div>
    <div class="listing">
      <div class="name">Eco Handwash Solutions</div>
      <div class="rating">4.9</div>
      <div class="price">70</div>
    </div>
  `;

  const $ = cheerio.load(dummyHTML);
  const listings: { name: string; rating: number; price: number }[] = [];

  $('.listing').each((_: unknown, element: any) => {
    const name = $(element).find('.name').text();
    const rating = parseFloat($(element).find('.rating').text());
    const price = parseFloat($(element).find('.price').text());

    listings.push({ name, rating, price });
  });

  return listings;
}

function calculateNeptuneScore(listing: { rating: number; price: number }): number {
  const ratingScore = listing.rating * 20;
  const priceScore = 100 - listing.price;
  return Math.round(ratingScore + priceScore);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const scrapedResults = await scrapeSources(query);

      const resultsWithScores = scrapedResults.map((listing) => ({
        ...listing,
        neptuneScore: calculateNeptuneScore(listing),
      }));

      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-nano-2025-04-14',
        messages: [
          { role: 'system', content: 'Enhance the following scraped results with additional insights.' },
          { role: 'user', content: JSON.stringify(resultsWithScores) },
        ],
        max_tokens: 600,
      });

      let enhancedResults;
      try {
        enhancedResults = JSON.parse(completion.choices[0].message.content || '{}');
      } catch (parseError) {
        console.warn('Response is not valid JSON, returning plain text:', completion.choices[0].message.content);
        enhancedResults = [{ text: completion.choices[0].message.content || 'No content available' }];
      }

      res.status(200).json({ results: enhancedResults.length > 0 ? enhancedResults : resultsWithScores });
    } catch (error) {
      console.error('Error processing query:', error);
      res.status(500).json({ message: 'Failed to process query.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
