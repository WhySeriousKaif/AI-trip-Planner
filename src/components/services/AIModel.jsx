import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-preview-03-25",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a detailed travel plan for Las Vegas for 4 days for a couple on a budget. 
          Include a list of hotels with the following details: 
          - Hotel Name
          - Hotel Address
          - Price (in USD)
          - Rating (4 stars and above)
          - Hotel Image URL
          - Geo Coordinates
          - Description

          Provide a day-wise itinerary with the following details for each day:
          - Day Number
          - Place Name
          - Place Details
          - Place Image URL
          - Geo Coordinates
          - Ticket Pricing
          - Time Travel
          - Best Time to Visit

          Ensure the response is in JSON format and consistent across all prompts.`,
        },
      ],
    },
  ],
});

  
  
