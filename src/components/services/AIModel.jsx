import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API key
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-preview-03-25",
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

Respond strictly in this JSON format:

{
  "hotels": [
    {
      "name": "",
      "address": "",
      "price": "",
      "rating": "",
      "imageUrl": "",
      "geo": {
        "lat": "",
        "lng": ""
      },
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "placeName": "",
          "details": "",
          "imageUrl": "",
          "geo": {
            "lat": "",
            "lng": ""
          },
          "ticketPricing": "",
          "travelTime": "",
          "bestTimeToVisit": ""
        }
      ]
    }
  ]
}

Ensure:
- JSON is valid and properly formatted.
- All string values are double-quoted.
- Consistent structure across all days and places.
- Include 3–4 places per day.
- Use realistic data.

Only respond with valid JSON. No explanations, markdown, or extra text.
          `,
        },
      ],
    },
  ],
});