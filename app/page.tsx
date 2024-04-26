"use client";

import { useState } from "react";

export default function Home() {
  const [reviews, setReviews] = useState(["Great service!", "Amazing flavors!"]);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const addReview = () => {
    const review = prompt("Enter your review:");
    if (review) {
      setReviews((prevReviews) => [...prevReviews, review]);
    }
  };

  const generateSummary = async () => {
    setIsLoading(true);

    // Convert array of reviews to a string
    const reviewText = JSON.stringify(reviews);

    // Send review text to OpenAI for summarization
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewText }),
    });

    const data = await response.json();
    const { summary } = data;
    console.log(summary)
    // Update the summary state with the generated summary
    setSummary(summary);
    setApiMessage(summary); // Set the API message
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <h1 className="text-5xl font-sans">Review Summary Generator</h1>

      <div className="flex flex-col items-center justify-center my-8">
        <button
          onClick={addReview}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
        >
          Add Review
        </button>
        <button
          onClick={generateSummary}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Generate Summary
        </button>
      </div>

      <div className="w-full max-w-xl">
        {reviews.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Reviews:</h2>
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className="mb-2">
                  {review}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : summary ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Summary:</h2>
            <p>{summary}</p>
          </div>
        ) : (
          <div>No summary generated yet.</div>
        )}

        {/* Display API message */}
        {/* {apiMessage && (
          <div>
            <h2 className="text-lg font-semibold mb-2">API Message:</h2>
            <p>{apiMessage}</p>
          </div>
        )} */}
      </div>
    </main>
  );
}

