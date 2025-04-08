import { Input } from "@/components/ui/input";
import React from "react";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_Prompt, SelectTravelsList } from "@/constants/options";
import { SelectBudgetOptions } from "@/constants/option2";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/components/services/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "./fireBaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState({});
  const [FormData, setFormData] = useState({});
  const [opendialog, setopendialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [savedTripId, setSavedTripId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDialogClose = () => {
    setopendialog(false);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      console.log("User Profile:", response.data);
      localStorage.setItem("userProfile", JSON.stringify(response.data));
      setopendialog(false);
      generateTrip();  
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        console.log("Login Success: currentUser:", codeResponse);
        localStorage.setItem("user", JSON.stringify(codeResponse));
        await getUserProfile(codeResponse);
        setopendialog(false);
        toast.success("Successfully logged in!");
      } catch (error) {
        console.error("Login Failed:", error);
        toast.error("Login Failed");
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      toast.error("Login Failed");
    }
  });

  const checkTokenExpiration = () => {
    const userSection= JSON.parse(localStorage.getItem("user"));
    if (!user) return false;

    // Check if token is expired (expires_in is in seconds)
    const expirationTime = user.expires_in * 1000; // Convert to milliseconds
    const currentTime = new Date().getTime();
    const tokenTimestamp = new Date(user.expiry_date).getTime();

    return currentTime < tokenTimestamp;
  };

  const validateForm = () => {
    const errors = [];
    if (!FormData.location?.label) errors.push("destination");
    if (!FormData.noOfDays) errors.push("number of days");
    if (!FormData.budget) errors.push("budget");
    if (!FormData.people) errors.push("travel group");
    
    if (errors.length > 0) {
      toast.error(`Please select: ${errors.join(", ")}`);
      return false;
    }
    
    if (parseInt(FormData.noOfDays) > 5) {
      toast.error("You can only plan a trip for up to 5 days");
      return false;
    }
    
    return true;
  };

 
 const generateTrip = async () => {
  const user = localStorage.getItem("user");
  if (!user) {
    setopendialog(true);
    return;
  }

  if (!validateForm()) return;

  setIsGenerating(true);
  try {
    const finalAiPrompt = AI_Prompt
      .replace("{location}", FormData.location?.label)
      .replace("{totalDays}", FormData.noOfDays)
      .replace("{traveler}", FormData.people)
      .replace("{budget}", FormData.budget);

    console.log("Final AI Prompt:", finalAiPrompt);

    const result = await chatSession.sendMessage(finalAiPrompt);
    if (!result?.response) {
      throw new Error("No response from AI");
    }

    const responseText = await result.response.text();
    console.log("AI Response:", responseText);

    // Attempt to extract JSON from the response
    let tripPlanText;
    try {
      // Use regex to extract JSON if wrapped in code blocks
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        tripPlanText = jsonMatch[1];
      } else {
        // If no JSON markers, try parsing the entire response
        tripPlanText = JSON.parse(responseText);
      }
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      throw new Error("Invalid JSON format in AI response");
    }

    if (tripPlanText) {
      await SaveAiTrip(tripPlanText);
    } else {
      throw new Error("Failed to extract JSON from AI response");
    }

  } catch (error) {
    console.error("Error generating trip:", error);
    toast.error(error.message || "Failed to generate trip");
  } finally {
    setIsGenerating(false);
  }
};
const SaveAiTrip = async (tripData) => {
  try {
    setLoading(true);

    const localUser = JSON.parse(localStorage.getItem("userProfile"));
    if (!localUser || !localUser.email) {
      throw new Error("User profile or email not found");
    }

    const docId = Date.now().toString();
    
    const tripDocument = {
      userSelection: FormData,
      tripPlan: JSON.parse(tripData), // Ensure tripPlan is parsed as JSON
      userEmail: localUser.email,
      userId: localUser.id,
      userName: localUser.name || "",
      createdAt: serverTimestamp(),
      lastModified: serverTimestamp(),
      status: 'active'
    };

    console.log("Saving trip document:", tripDocument);

    await setDoc(doc(db, "trips", docId), tripDocument);
    
    toast.success("Trip saved successfully!");
    navigate(`/view-trip/${docId}`);
    
  } catch (error) {
    console.error("Error saving trip:", error);
    toast.error(`Failed to save trip: ${error.message}`);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    console.log("Form Data", FormData);
  }, [FormData]);

  useEffect(() => {
    console.log(
      "API Key available:",
      !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    );
  }, []);

  const toggleScroll = (disable) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      toggleScroll(false);
    };
  }, []);

  return (
    <div className="sm:px-10  md:px-32  lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* form  */}
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-2 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Search for a destination...",
              
              }
            }
          />
        </div>
        <div>
          <h2 className="text-xl my-2 font-medium"> How many days are you planing your trip?</h2>
          <Input
            placeholder={"Ex-3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            
          />
          <p className="text-sm text-gray-500"> *You can plan a trip for up to 5 days</p>
        </div>
      </div>

      {/* Budget Selection */}
      <div>
        <h2 className="text-xl my-2 font-medium">What is Your Budget?</h2>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SelectBudgetOptions.map((item,index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-5 border rounded-lg flex gap-5 items-center hover:shadow-md transition-all duration-200 cursor-pointer
                ${FormData?.budget === item.title ? "border-blue-500 bg-blue-50" : ""}`}
            >
              {/* icon */}
              <div className="w-10 h-10 flex justify-center items-center text-4xl">
                {item.icon}
              </div>
              <div>
                <h2 className="font-bold text-lg ">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="text-sm font-medium text-black">{item.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Type */}
      <div className="mt-10">
        <h2 className="text-xl my-2 font-medium">
          What do you plan on traveling with on your next adventure ?
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-5 border rounded-lg flex gap-5 items-center hover:shadow-md transition-all duration-200 cursor-pointer
                ${FormData?.people === item.people ? "border-blue-500 bg-blue-50" : ""}`}
              onClick={() => handleInputChange("people", item.people)}
            >
              {/* icon */}
              <div className="w-10 h-10 text-4xl flex justify-center items-center">
                {item.icon}
              </div>
              <div>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="text-black">{item.people}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Button */}

      <div className="mt-10 flex justify-end mb-10 mr-10">
        <Button 
          onClick={generateTrip} 
          className="px-6 py-2"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Trip'}
        </Button>
      </div>
      <Dialog open={opendialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col items-center text-center">
                <img src="/logo.svg" alt="Logo" className="w-20 h-20 mb-4" />
                <h2 className="font-bold text-2xl my-2">
                  Sign in with Google to continue
                </h2>
                <div className="text-gray-500 mb-6">
                  Sign in to the app with Google authentication secure
                </div>

                <Button 
                  
                  className="w-full mt-5 flex items-center justify-center gap-2"
                  onClick={() => loginWithGoogle()}
                >
                  <FcGoogle className="text-xl" />
                  Sign In with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
