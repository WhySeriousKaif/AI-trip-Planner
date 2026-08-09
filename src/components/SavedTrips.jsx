import React, { useState, useEffect } from "react";
import { db } from "../create-trip/fireBaseConfig";
import { getDocs, query, where, collection } from "firebase/firestore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./UserTripCardItem";
import Header from "@/components/custom/Header"; // Import the Header component
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

const SavedTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, authLoading } = useGoogleAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.error("User not logged in or profile missing. Please sign in.");
      navigate("/create-trip");
      return;
    }

    getSavedTrips(user);
  }, [authLoading, user, navigate]);

  const getSavedTrips = async (user) => {
    try {
      const q = query(collection(db, "trips"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => doc.data());
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to fetch trips. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-ice-cold to-freeze-purple">
      <Header />
      <div className="pt-28 pb-16 px-5 sm:px-10 md:px-20 xl:px-32">
        <h1 className="font-extrabold text-2xl sm:text-3xl mb-10 text-center text-gray-900">
          My Trips
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading your trips...</p>
          </div>
        ) : userTrips.length === 0 ? (
          <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-md p-10">
            <p className="text-gray-600">You haven't saved any trips yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTrips;