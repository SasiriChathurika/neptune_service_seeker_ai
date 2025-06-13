# Neptune Seek

Neptune Seek is a modern, sleek, AI-powered search web application built with Next.js. It allows users to submit natural language queries and receive synthesized search results from multiple sources, enhanced by OpenAI's GPT-4 model.

## Features

- **Natural Language Query:** Users can input queries in plain English.
- **AI Integration:** Utilizes OpenAI's GPT-4 for intelligent result synthesis.
- **Responsive Design:** Modern, dark-themed UI optimized for all screen sizes.
- **Dynamic Results:** Fetches real-time search results from multiple sources.
- **Neptune Score:** Calculates a unique score for each listing based on rating and price.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/neptune-seek.git
   ```

2. Navigate to the project directory:
   ```bash
   cd neptune-seek
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your OpenAI API key:
     ```env
     OPENAI_API_KEY=your_openai_api_key_here
     ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Enter a query in the input box (e.g., "Who are the best-rated dishwasher repair technicians in San Francisco?").
3. View the search results with enhanced insights and Neptune Scores.

## Technologies Used

- **Next.js:** Framework for building server-rendered React applications.
- **React:** Library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **OpenAI API:** Integration for AI-powered result enhancement.
- **Cheerio:** Library for parsing and extracting data from HTML.

## Project Structure

- `src/app/page.tsx`: Main page layout and logic.
- `src/components/QueryForm.tsx`: Component for user query input.
- `src/components/ResultsDisplay.tsx`: Component for displaying search results.
- `src/pages/api/query.ts`: API endpoint for handling queries and integrating OpenAI.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for their powerful GPT-4 model.
- [Next.js](https://nextjs.org/) for the amazing framework.
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities.
