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

const CreateTrip = () => {
  const [place, setPlace] = useState({});
  const [FormData, setFormData] = useState({});
  const [opendialog, setopendialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // Add expiration time to the response
        const expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds() + codeResponse.expires_in);
        
        const userDataWithExpiry = {
          ...codeResponse,
          expiry_date: expiryDate.toISOString()
        };

        console.log("Login Success: currentUser:", userDataWithExpiry);
        localStorage.setItem("user", JSON.stringify(userDataWithExpiry));
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
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return false;

      const expirationTime = new Date(user.expiry_date).getTime();
      const currentTime = new Date().getTime();

      return currentTime < expirationTime;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    setIsAuthenticated(false);
    toast.info("Session expired. Please login again.");
  };

  const validateForm = () => {
    const errors = [];
    if (!FormData.location?.label) errors.push("destination");
    if (!FormData.noOFdays) errors.push("number of days");
    if (!FormData.budget) errors.push("budget");
    if (!FormData.people) errors.push("travel group");
    
    if (errors.length > 0) {
      toast.error(`Please select: ${errors.join(", ")}`);
      return false;
    }
    
    if (parseInt(FormData.noOFdays) > 5) {
      toast.error("You can only plan a trip for up to 5 days");
      return false;
    }
    
    return true;
  };

  const generateTrip = async () => {
    if (!isAuthenticated) {
      setopendialog(true);
      toast.error("Please login to continue");
      return;
    }

    if (isGenerating) return;
    if (!validateForm()) return;

    try {
      setIsGenerating(true);
      toggleScroll(true);
      document.body.style.overflow = 'hidden';
      
      const toastId = toast.loading("Generating your personalized trip plan...");

      const finalPrompt = AI_Prompt.replace("{location}", FormData?.location?.label)
        .replace("{totalDays}", FormData?.noOFdays)
        .replace("{traveler}", FormData?.people)
        .replace("{budget}", FormData?.budget);

      const result = await chatSession.sendMessage(finalPrompt);
      const response = await result?.response?.text();
      
      toast.dismiss(toastId);
      setTripPlan(response);
      
      // Smooth scroll to top with offset for header
      window.scrollTo({ 
        top: 0,
        behavior: 'smooth'
      });
      
      toast.success("Your trip plan is ready!");

    } catch (error) {
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        toast.error("We're experiencing high demand. Please try again in a few minutes.");
      } else {
        toast.error("Unable to generate trip plan. Please try again.");
      }
      console.error("Error generating trip:", error);
    } finally {
      setIsGenerating(false);
      document.body.style.overflow = 'auto';
      toggleScroll(false);
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
    const checkAuth = () => {
      const isValid = checkTokenExpiration();
      setIsAuthenticated(isValid);
      if (!isValid && localStorage.getItem("user")) {
        handleLogout();
      }
    };

    // Check immediately on mount
    checkAuth();

    // Set up interval to check periodically
    const interval = setInterval(checkAuth, 60000); // Check every minute

    // Check on window focus
    const handleFocus = () => {
      checkAuth();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500">
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
              isLoading: !import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
              loadingMessage: () => "Loading...",
              noOptionsMessage: () => "No locations found",
              styles: {
                control: (provided) => ({
                  ...provided,
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#cbd5e1'
                  }
                }),
                input: (provided) => ({
                  ...provided,
                  fontSize: '16px'
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#f1f5f9' : 'white',
                  color: '#1e293b',
                  cursor: 'pointer',
                  padding: '8px 16px'
                })
              }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-2 font-medium">
            How many days are you planing your trip?
          </h2>
          <Input
            placeholder={"Ex-3"}
            type="number"
            onChange={(e) => handleInputChange("noOFdays", e.target.value)}
          />
        </div>
      </div>

      {/* Budget Selection */}
      <div>
        <h2 className="text-xl my-2 font-medium">What is Your Budget?</h2>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-5 border rounded-lg flex gap-5 items-center hover:shadow-md transition-all duration-200 cursor-pointer
                ${FormData?.budget === item.title ? "border-blue-500 bg-blue-50" : ""}`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center text-xl">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-5 border rounded-lg flex gap-5 items-center hover:shadow-md transition-all duration-200 cursor-pointer
                ${FormData?.people === item.people ? "border-blue-500" : ""}`}
              onClick={() => handleInputChange("people", item.people)}
            >
              {/* icon */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
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
            <DialogDescription>
              <div className="flex flex-col items-center text-center">
                <img src="/logo.svg" alt="Logo" className="w-20 h-20 mb-4" />
                <h2 className="font-bold text-2xl my-2">
                  {isAuthenticated ? "Session Expired" : "Sign in with Google to continue"}
                </h2>
                <p className="text-gray-500 mb-6">
                  {isAuthenticated 
                    ? "Your session has expired. Please sign in again."
                    : "Sign in to the app with Google authentication secure"}
                </p>

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

      {tripPlan && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setTripPlan(null);
              toggleScroll(false);
            }
          }}
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 relative">
              <Button 
                variant="ghost" 
                className="absolute right-4 top-4"
                onClick={() => {
                  setTripPlan(null);
                  toggleScroll(false);
                }}
              >
                ✕
              </Button>
              <h3 className="text-2xl font-bold mb-4">Your Trip Plan</h3>
              <div className="prose max-w-none max-h-[70vh] overflow-y-auto">
                <div className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg border">
                  {tripPlan}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setTripPlan(null);
                    toggleScroll(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const tripData = {
                      plan: tripPlan,
                      destination: FormData.location?.label,
                      days: FormData.noOFdays,
                      budget: FormData.budget,
                      travelers: FormData.people,
                      date: new Date().toISOString()
                    };
                    console.log("Saving trip:", tripData);
                    // Implement save functionality here
                    toast.success("Trip plan saved!");
                  }}
                >
                  Save Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
