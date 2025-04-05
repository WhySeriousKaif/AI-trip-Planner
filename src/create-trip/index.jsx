import { Input } from "@/components/ui/input";
import React from "react";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_Prompt, SelectTravelsList } from "@/constants/options";
import { SelectBudgetOptions } from "@/constants/option2";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/components/services/AIModel";


const CreateTrip = () => {
  const [place, setPlace] = useState({});
  const [FormData, setFormData] = useState({});
  const handleInputChange = (name,value) => {
    setFormData({
        ...FormData,
        [name]: value,
    })

  }

useEffect(() => {
    console.log("Form Data", FormData);
  }, [FormData]);

const generateTrip = async () => {
  try {
    // Validate all required fields
    if (!FormData.location || !FormData.noOFdays || !FormData.budget || !FormData.people) {
      toast.error("Please fill out all the required fields");
      return;
    }
    if (FormData.noOFdays > 5) {
      toast.error("You can only plan a trip for 5 days");
      return;
    }

    // Show loading state
    toast.loading("Generating your trip plan...");

    // If all validations pass, proceed with trip generation
    const finalPrompt = AI_Prompt.replace("{location}", FormData?.location?.label)
      .replace("{totalDays}", FormData?.noOFdays)
      .replace("{traveler}", FormData?.people)
      .replace("{budget}", FormData?.budget);

    const result = await chatSession.sendMessage(finalPrompt);
    const response = await result?.response?.text();
    
    // Show success message
    toast.success("Trip plan generated successfully!");
    
    // Handle the response here
    console.log("Generated Trip Plan:", response);
    
  } catch (error) {
    // Handle specific error types
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      toast.error("API rate limit reached. Please try again in a few minutes.");
    } else {
      toast.error("Failed to generate trip plan. Please try again.");
    }
    console.error("Error generating trip:", error);
  }
};
  
  useEffect(() => {
    console.log(
      "API Key available:",
      !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    );
  }, []);
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
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
               handleInputChange("location",v)
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-2 font-medium">
            How many days are you planing your trip?
          </h2>
          <Input placeholder={"Ex-3"} type="number" onChange={(e)=>handleInputChange('noOFdays',e.target.value)} />
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
              className={`p-5 border rounded-lg flex gap-5 items-center hover:shadow-md transition-all duration-200 cursor-pointer1
                ${FormData?.budget === item.title ? "border-blue-500" : ""}`}

              

             
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
         >
           Generate Trip
         </Button>
       </div>
    </div>
  );
};

export default CreateTrip;
