"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "./config";

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  isConfigured: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isGuest: true,
  loading: false,
  isConfigured: false,
  loginWithGoogle: async () => {},
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  logout: async () => {},
  continueAsGuest: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsGuest(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      throw new Error("Firebase is not configured. Please set NEXT_PUBLIC_FIREBASE_API_KEY.");
    }
    await signInWithPopup(auth, googleProvider);
    setIsGuest(false);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error("Firebase is not configured. Please set NEXT_PUBLIC_FIREBASE_API_KEY.");
    }
    await signInWithEmailAndPassword(auth, email, pass);
    setIsGuest(false);
  };

  const registerWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error("Firebase is not configured. Please set NEXT_PUBLIC_FIREBASE_API_KEY.");
    }
    await createUserWithEmailAndPassword(auth, email, pass);
    setIsGuest(false);
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setIsGuest(true);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        loading,
        isConfigured: isFirebaseConfigured,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
