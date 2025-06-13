"use client";

// This is the main entry point for the Neptune Seek application.
// It manages the state for search results and controls the visibility of the results display.

// Import necessary modules and components.
import { useState } from "react";
import QueryForm from "../components/QueryForm";
import ResultsDisplay from "../components/ResultsDisplay";

export default function Home() {
	// State to store the search results fetched from the API.
	const [results, setResults] = useState([]);
	// State to control whether the results display is visible.
	const [showResults, setShowResults] = useState(false);

	// Function to fetch search results from the API based on the user's query.
	const fetchResults = async (query: string) => {
		try {
			const response = await fetch("/api/query", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});
			const data = await response.json();
			// Update the results state with the fetched data.
			setResults(data.results);
			// Show the results display component.
			setShowResults(true);
		} catch (error) {
			// Log any errors that occur during the fetch operation.
			console.error("Error fetching results:", error);
		}
	};

	return (
		// Render the main application layout.
		<div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-3 sm:p-20 bg-gray-900 text-white font-sans">
			{/* Application title */}
			<h1 className="text-7xl font-extrabold mb-4 text-center">Neptune Seek</h1>
			{/* Application description */}
			<p className="text-lg text-gray-400 mb-6 text-center">
				Your AI-powered search assistant for best Service Providers.
			</p>
			{/* Query form for user input */}
			<QueryForm onSubmit={fetchResults} showResults={showResults} results={[]} />
			{/* Conditionally render the results display component */}
			{showResults && <ResultsDisplay results={results} />}
		</div>
	);
}
