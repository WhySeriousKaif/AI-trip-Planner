import React from 'react'

const Hotel = ({trip}) => {
  // Parse the plan string to get hotel options
  let hotels = [];
  try {
    if (trip?.plan) {
      const parsedPlan = JSON.parse(trip.plan);
      hotels = parsedPlan.hotelOptions || [];
      console.log('Extracted hotels:', hotels);
    }
  } catch (error) {
    console.error('Error parsing plan:', error);
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="mt-6">
        <h2 className='font-bold text-2xl mb-4'>Hotel Recommendations</h2>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">No hotel recommendations available at the moment.</p>
        </div>
      </div>
    );
  }

  // Helper function to format price display with error handling
  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    
    // If it's already a string with ₹, return as is
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    
    // Handle the dollar sign conversion if needed
    if (typeof price === 'string') {
      switch(price) {
        case '$$$': return '₹₹₹';
        case '$$': return '₹₹';
        case '$': return '₹';
        default: return price;
      }
    }
    
    return 'Price not available';
  };

  return (
    <div className="mt-6">
      <h2 className='font-bold text-2xl mb-4'>Hotel Recommendations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {hotels.map((hotel, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={hotel.hotelImageUrl} 
              alt={hotel.hotelName} 
              className='w-full h-48 object-cover'
              onError={(e) => {
                e.target.src = 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
              }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{hotel.hotelName || 'Hotel Name Not Available'}</h3>
              <p className="text-gray-600 text-sm mb-1 line-clamp-2">{hotel.hotelAddress || 'Address Not Available'}</p>
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-600">{formatPrice(hotel.price)}</p>
                <p className="text-yellow-500">{'⭐'.repeat(Math.round(hotel.rating || 0))}</p>
              </div>
              <p className="text-gray-500 text-sm mb-3 line-clamp-3">{hotel.description || 'No description available'}</p>
              <div className="flex gap-2">
                {hotel.geoCoordinates && (
                  <button 
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm"
                    onClick={() => window.open(`https://www.google.com/maps?q=${hotel.geoCoordinates.latitude},${hotel.geoCoordinates.longitude}`, '_blank')}
                  >
                    View on Map
                  </button>
                )}
                <button 
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-sm"
                  onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(hotel.hotelName + ' ' + (hotel.hotelAddress || ''))}`, '_blank')}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotel
