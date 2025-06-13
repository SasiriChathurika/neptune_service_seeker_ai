// This component renders the query form for user input.
// It handles user interactions and submits the query to fetch results.

"use client";

import React, { useState } from 'react';
import ResultsDisplay from './ResultsDisplay';

interface QueryFormProps {
  // Function to handle query submission.
  onSubmit: (query: string) => void;
  // Boolean to control the visibility of results.
  showResults: boolean;
  // Array to store the search results.
  results: any[];
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit, showResults, results }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    // Render the query form and conditionally display results.
    <>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md w-full max-w-4xl mx-auto">
        <label htmlFor="query" className="block text-lg font-medium mb-2">
          Enter your query:
        </label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g., Who are the best-rated dishwasher repair technicians in San Francisco, CA USA and what do they charge? How do I book?"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {showResults && results && results.length > 0 && <ResultsDisplay results={results} />}
    </>
  );
};

export default QueryForm;
