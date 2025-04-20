export const extractItineraryDetails = (tripData) => {
  const dailyItinerary = tripData?.tripPlan?.dailyItinerary || [];
  return dailyItinerary.map(day => ({
    dayNumber: day.dayNumber,
    theme: day.theme,
    places: day.places.map(place => ({
      placeName: place.placeName,
      placeDetails: place.placeDetails,
      placeImageUrl: place.placeImageUrl,
      bestTimeToVisit: place.bestTimeToVisit,
      ticketPricing: place.ticketPricing,
      timeTravel: place.timeTravel,
      geoCoordinates: place.geoCoordinates
    }))
  }));
};
