import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/create-trip/fireBaseConfig";
import { toast } from "sonner";

export const useGoogleAuth = ({ onLoginSuccess, onLoginError } = {}) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Successfully logged in!");
      onLoginSuccess?.(result.user);
      return result.user;
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Login Failed");
      onLoginError?.(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    // Force a full reload so no component can act on a stale pre-logout
    // closure/state instead of waiting for React to propagate the change.
    window.location.reload();
  };

  return { user, authLoading, loginWithGoogle, logout };
};
