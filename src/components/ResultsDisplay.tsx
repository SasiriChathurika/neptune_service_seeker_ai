// This component displays the search results fetched from the API.
// It handles both text-based and structured results.

import React from 'react';

interface Result {
  // Optional properties for each result.
  name?: string;
  rating?: number;
  price?: string;
  neptuneScore?: number;
  text?: string;
}

interface ResultsDisplayProps {
  // Array of results to be displayed.
  results?: Result[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results = [] }) => {
  return (
    // Render the results container.
    <div className="p-4 bg-gray-800 rounded-lg shadow-md overflow-y-auto w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-300 mb-4">Search Results</h2>
      {results.length === 0 ? (
        // Display a message if no results are found.
        <p className="text-gray-400">No results found.</p>
      ) : (
        // Render a list of results.
        <ul>
          {results.map((result, index) => (
            <li key={index} className="mb-4">
              {result.text ? (
                // Render text-based results with formatting.
                <div
                  className="text-gray-300 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: result.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'),
                  }}
                ></div>
              ) : (
                // Render structured results.
                <>
                  <div className="font-medium text-white">{result.name}</div>
                  <div className="text-gray-400">Rating: {result.rating} / 5</div>
                  <div className="text-gray-400">Price: {result.price}</div>
                  <div className="text-gray-400">Neptune Score: {result.neptuneScore}</div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsDisplay;
