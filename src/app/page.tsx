"use client";

import { useState } from "react";
import QueryForm from "../components/QueryForm";
import ResultsDisplay from "../components/ResultsDisplay";

export default function Home() {
	const [results, setResults] = useState([]);

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
			setResults(data.results);
		} catch (error) {
			console.error("Error fetching results:", error);
		}
	};

	return (
		<div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-3 sm:p-20 bg-gray-900 text-white font-sans">
			<h1 className="text-7xl font-extrabold mb-4 text-center">Neptune Seek</h1>
			<p className="text-lg text-gray-400 mb-6 text-center">
				Your AI-powered search assistant for best Service Providers.
			</p>
			<QueryForm onSubmit={fetchResults} />
			<ResultsDisplay results={results} />
		</div>
	);
}
