import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/create-trip/fireBaseConfig";
import Infosection from "@/components/Infosection";
import Hotel from "@/components/Hotel";
import Itinerary from "@/components/Itinerary";
import Footer from "@/components/Footer";

import Header from "@/components/custom/Header";

const ViewTrip = () => {
  const { tripID } = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (tripID) fetchTripData();
  }, [tripID]);

  const fetchTripData = async () => {
    try {
      const docRef = doc(db, "trips", tripID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Trip data:", data);
        setTripData(data);
      } else {
        toast.error("No such trip found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Error fetching trip data");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my trip on WonderMate!',
        text: 'Here is the link to my trip itinerary.',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      toast.error("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-ice-cold to-freeze-purple bg-cover bg-center">
      
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
  <Header />
</div>
  
      {/* Content area with same padding */}
      <div className="sm:px-10 md:px-20 lg:px-44 xl:px-56 pt-20 pb-16">
      <Infosection trip={tripData} />
      <Hotel trip={tripData} />
      <Itinerary trip={tripData} />
      </div>

      <Footer />
    </div>
  );
}
export default ViewTrip;
