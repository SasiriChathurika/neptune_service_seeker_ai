// This file defines the API endpoint for handling search queries.
// It fetches and processes data, then returns the results to the client.

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Initialize the OpenAI client with the API key.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function scrapeSources(query: string) {
  // Dummy HTML data for dishwasher repair services.
  const dummyHTML = `
    <div class="listing">
      <div class="name">Dishwasher Repair Co.</div>
      <div class="rating">4.9</div>
      <div class="price">$80</div>
      <div class="booking"><a href="https://example.com/book-dishwasher-repair-co">Book Now</a></div>
    </div>
    <div class="listing">
      <div class="name">San Francisco Dishwasher Experts</div>
      <div class="rating">4.8</div>
      <div class="price">$75</div>
      <div class="booking"><a href="https://example.com/book-sf-dishwasher-experts">Book Now</a></div>
    </div>
    <div class="listing">
      <div class="name">Quick Dishwasher Services</div>
      <div class="rating">4.7</div>
      <div class="price">$70</div>
      <div class="booking"><a href="https://example.com/book-quick-dishwasher-services">Book Now</a></div>
    </div>
    <div class="listing">
      <div class="name">Speedy Dishwasher Pros</div>
      <div class="rating">4.6</div>
      <div class="price">$85</div>
      <div class="booking"><a href="https://example.com/book-speedy-dishwasher-pros">Book Now</a></div>
    </div>
    <div class="listing">
      <div class="name">Eco Dishwasher Solutions</div>
      <div class="rating">4.9</div>
      <div class="price">$90</div>
      <div class="booking"><a href="https://example.com/book-eco-dishwasher-solutions">Book Now</a></div>
    </div>
  `;

  // Use Cheerio to parse the HTML and extract data.
  const $ = cheerio.load(dummyHTML);

  // Explicitly define the type for the results array.
  const results: Array<{ name: string; rating: number; price: string; booking: string }> = [];

  $('.listing').each((_, element) => {
    const name = $(element).find('.name').text();
    const rating = parseFloat($(element).find('.rating').text());
    const price = $(element).find('.price').text();
    const booking = $(element).find('.booking a').attr('href');

    // Ensure all properties are non-nullable before pushing to the results array.
    if (name && rating && price && booking) {
      results.push({ name, rating, price, booking });
    }
  });

  return results;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const results = await scrapeSources(query);
      res.status(200).json({ results });
    } catch (error) {
      console.error('Error processing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
