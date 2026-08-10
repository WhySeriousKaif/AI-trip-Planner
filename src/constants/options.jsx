export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A solo traveler exploring the world',
      icon: '🧍‍♂️',
      people: '1 Person',
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '🥂',
      people: '2 People',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A fun-loving family adventure',
      icon: '👨‍👩‍👧‍👦',
      people: '3 to 5 People',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'Exploring together with your squad',
      icon: '🧑‍🤝‍🧑',
      people: '3 to 6 People',
    },
    {
      id: 5,
      title: 'Large Group',
      desc: 'A big crew ready to make memories',
      icon: '🎉',
      people: '7+ People',
    },
    {
      id: 6,
      title: 'Work Trip',
      desc: 'Business meets travel with colleagues',
      icon: '💼',
      people: 'Varies',
    },
    {
      id: 7,
      title: 'Adventure Team',
      desc: 'Thrill-seekers and explorers',
      icon: '🏕️',
      people: '4 to 8 People',
    },
    
  ];

  export const AI_Prompt = `Generate a detailed travel plan for the following:
Location: {location}
Duration: {totalDays} days
Traveler: {traveler}
Budget: {budget}

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

Requirements:
- Include exactly 5 distinct, real, well-known hotels in or near {location} that fit the {budget} budget. Do not return fewer than 5.
- Include exactly {totalDays} entries in "itinerary" (day: 1, 2, 3, ...), each with 4-5 distinct, real, well-known places/activities. Do not return fewer than 4 per day.
- Use real, specific, well-known hotels and places for {location} — no generic placeholders like "Local Hotel" or "City Park".
- "description" and "details" should be 1-2 sentences of genuinely useful, specific information (not generic filler).
- Keep "price", "ticketPricing", "travelTime", and "bestTimeToVisit" short (max 4-5 words, no parenthetical explanations) so they fit on a small badge. Example values: "$60-120/night", "Free entry", "30-45 min", "Early morning".`;