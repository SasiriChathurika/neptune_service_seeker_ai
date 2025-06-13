import React from 'react';

interface Result {
  name?: string;
  rating?: number;
  price?: string;
  neptuneScore?: number;
  text?: string;
}

interface ResultsDisplayProps {
  results?: Result[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results = [] }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md overflow-y-auto w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-300 mb-4">Search Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index} className="mb-4">
              {result.text ? (
                <div
                  className="text-gray-300 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: result.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'),
                  }}
                ></div>
              ) : (
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
