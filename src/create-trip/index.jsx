import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import DestinationAutocomplete from "@/components/custom/DestinationAutocomplete";
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
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "./fireBaseConfig";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Header from "@/components/custom/Header";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

const CreateTrip = () => {
  const [place, setPlace] = useState({});
  const [FormData, setFormData] = useState({});
  const [opendialog, setopendialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
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

  const { user, loginWithGoogle } = useGoogleAuth({
    onLoginSuccess: (loggedInUser) => {
      setopendialog(false);
      generateTrip(loggedInUser);
    },
  });

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

  const generateTrip = async (authUser = user) => {
    if (!authUser) {
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
        console.error("Response causing error:", responseText);
        throw new Error("Invalid JSON format in AI response");
      }

      if (tripPlanText) {
        setTripPlan(tripPlanText);
        await SaveAiTrip(tripPlanText, authUser);
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

  const SaveAiTrip = async (tripData, authUser = user) => {
    try {
      setLoading(true);

      if (!authUser?.email) {
        throw new Error("User profile or email not found");
      }

      const docId = Date.now().toString();

      const tripDocument = {
        userSelection: FormData,
        tripPlan: tripData,
        userEmail: authUser.email,
        userId: authUser.uid,
        userName: authUser.displayName || "",
        createdAt: serverTimestamp(),
        lastModified: serverTimestamp(),
        status: 'active',
        id: docId
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

  const toggleScroll = (disable) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      toggleScroll(false);
    };
  }, []);

  console.log("Trip Plan:", tripPlan);

  return (
    <div className="relative bg-gradient-to-r from-ice-cold to-freeze-purple bg-cover bg-center w-full min-h-screen flex flex-col">
      <Header />
      {isGenerating && <LoadingScreen />}
      <div className="px-5 sm:px-10 w-full flex-grow flex justify-center pt-28 pb-16">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 sm:p-10">
          <h2 className="font-extrabold text-2xl sm:text-3xl text-gray-900">
            Tell us your travel preferences 🏕️🌴
          </h2>
          <p className="mt-3 text-gray-500 text-base sm:text-lg">
            Just provide some basic information, and our trip planner will generate
            a customized itinerary based on your preferences.
          </p>

          {/* form  */}
          <div className="mt-10 flex flex-col gap-8">
            <div>
              <h2 className="text-lg my-2 font-semibold text-gray-800">
                What is your destination of choice?
              </h2>
              <DestinationAutocomplete
                value={place}
                onChange={(v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                }}
                placeholder="Search for a destination..."
                disabled={isGenerating}
              />
            </div>
            <div>
              <h2 className="text-lg my-2 font-semibold text-gray-800"> How many days are you planing your trip?</h2>
              <Input
                placeholder={"Ex-3"}
                type="number"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-400 mt-1"> *You can plan a trip for up to 5 days</p>
            </div>
          </div>

          {/* Budget Selection */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800">What is Your Budget?</h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SelectBudgetOptions.map((item,index) => {
                const selected = FormData?.budget === item.title;
                return (
                <div
                  key={index}
                  onClick={() => !isGenerating && handleInputChange("budget", item.title)}
                  className={`p-5 border-2 rounded-2xl flex gap-4 items-center transition-all duration-200 cursor-pointer
                    ${selected ? "border-cyan-500 bg-cyan-50 shadow-md" : "border-gray-100 hover:border-cyan-200 hover:shadow-md"} ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {/* icon */}
                  <div className="w-11 h-11 flex justify-center items-center text-3xl bg-gray-50 rounded-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    <p className="text-sm font-medium text-cyan-700 mt-0.5">{item.cost}</p>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Travel Type */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800">
              What do you plan on traveling with on your next adventure ?
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SelectTravelsList.map((item, index) => {
                const selected = FormData?.people === item.people;
                return (
                <div
                  key={index}
                  className={`p-5 border-2 rounded-2xl flex gap-4 items-center transition-all duration-200 cursor-pointer
                    ${selected ? "border-cyan-500 bg-cyan-50 shadow-md" : "border-gray-100 hover:border-cyan-200 hover:shadow-md"} ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isGenerating && handleInputChange("people", item.people)}
                >
                  {/* icon */}
                  <div className="w-11 h-11 text-3xl flex justify-center items-center bg-gray-50 rounded-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    <p className="text-cyan-700 text-sm font-medium mt-0.5">{item.people}</p>
                  </div>
                </div>
              )})}
            </div>
          </div>
          {/* Button */}

          <div className="mt-12 flex justify-center">
            <Button
              onClick={generateTrip}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-3 rounded-full transition-all duration-300 disabled:opacity-60"
              disabled={isGenerating || loading}
            >
              {isGenerating ? 'Generating...' : loading ? 'Saving...' : 'Generate Trip'}
            </Button>
          </div>
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
                    disabled={isGenerating}
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
    </div>
  );
};

export default CreateTrip;