import React from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/create-trip/fireBaseConfig';
import Infosection from '@/components/Infosection';
import Hotel from '@/components/Hotel';
import Itinerary from '@/components/Itinerary';
import { useState } from 'react';

const ViewTrip = () => {
  const {tripID}=useParams();
  const [tripData,setTripData]=useState([]);
  useEffect(() => {
    tripID && fetchTripData();
  }, [tripID]) 
  
  //fetching data from firestore

  const fetchTripData=async()=>{
    const docRef=doc(db,"trips",tripID);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
      const tripData=docSnap.data();
      console.log("Document data:", tripData);
      setTripData(tripData);
    }
    else{
      console.log("No such document");
      toast.error("No such document");
    }
  }
  return (
    <div className='sm:px-10  md:px-20  lg:px-44 xl:px-56 mt-5'>
      {/* Infromation about the trip */}
      <Infosection trip={tripData}/>
      {/* Recommended Hotels */}
      <Hotel trip={tripData}/>
      {/* Itinerary */}
      <Itinerary trip={tripData}/>
    </div>
  )
}

export default ViewTrip
