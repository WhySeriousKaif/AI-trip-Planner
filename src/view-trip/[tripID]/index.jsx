import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '@/create-trip/fireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import TripInformation from '@/components/Infosection';
import Hotel from '@/components/Hotel';

const ViewTrip = () => {
  const { tripID } = useParams(); // Note: matches the :tripID in the route
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        // Try to get data from localStorage first
        const localData = localStorage.getItem('currentTripData');
        if (localData) {
          const parsedData = JSON.parse(localData);
          if (parsedData.id === tripID) {
            setTripData(parsedData);
            setLoading(false);
            return;
          }
        }

        // If not in localStorage, fetch from Firestore
        const tripRef = doc(db, 'trips', tripID);
        const tripDoc = await getDoc(tripRef);
        
        if (tripDoc.exists()) {
          setTripData(tripDoc.data());
        } else {
          toast.error("Trip not found");
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
        toast.error("Error loading trip data");
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Trip Not Found</h1>
        <p className="text-gray-600 mt-2">The trip you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
   <>
  <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
  <TripInformation trip={tripData}/>

  <Hotel trip={tripData }/>

  </div>
   </>
  );
};

export default ViewTrip;
