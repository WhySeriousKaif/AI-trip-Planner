import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

// Define generation config
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "application/json",
};

// Define chat session with strict JSON format prompt
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `
Generate a detailed travel plan for Las Vegas for 4 days for a couple on a budget.

Respond with ONLY a single JSON object (no markdown, no code fences) with this exact shape:
{
  "hotels": [
    { "name": string, "address": string, "price": string, "rating": number, "description": string }
  ],
  "itinerary": [
    { "day": number, "activities": [
      { "placeName": string, "details": string, "ticketPricing": string, "travelTime": string, "bestTimeToVisit": string }
    ] }
  ]
}

Include exactly 5 distinct, real hotels and exactly 4 days with 4-5 real activities each. Use realistic, specific data. Keep price/ticketPricing/travelTime/bestTimeToVisit short (max 4-5 words).
          `,
        },
      ],
    },
  ],
});