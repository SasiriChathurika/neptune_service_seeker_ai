"use client";

import React, { useState } from 'react';

interface QueryFormProps {
  onSubmit: (query: string) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
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
  );
};

export default QueryForm;
