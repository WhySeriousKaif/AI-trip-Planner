import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";

export const useGoogleAuth = () => {
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
      toast.success("Successfully logged in!");
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

  return { loginWithGoogle };
};
