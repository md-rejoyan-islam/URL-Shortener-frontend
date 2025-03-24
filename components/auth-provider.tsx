"use client";

import api from "@/lib/axios-instance";
import axios, { AxiosResponse } from "axios";
import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Check if user is logged in
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  //   setIsLoading(false);
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/api/v1/auth/me", {
          withCredentials: true,
        });

        if (response.data) {
          setUser({
            id: response.data?.data?.id,
            username: response.data?.data?.username,
            email: response.data?.data?.email,
          });
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse = await api.post("/api/v1/auth/login", {
          email,
          password,
        });

        const { user } = response.data;

        setUser({
          username: user?.username,
          email: user?.email,
          id: user?._id,
        });

        localStorage.setItem("user", JSON.stringify(user));

        resolve(response.data); // Resolve with the API response data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          reject(
            new Error(error.response.data.error.message || "Login failed")
          );
        } else {
          reject(new Error("An unexpected error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse = await api.post(
          "/api/v1/auth/register",
          {
            email,
            password,
            username: name,
          }
        );

        resolve(response.data); // Resolve with the API response data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          reject(
            new Error(
              error.response.data.error.message || "Registration failed"
            )
          );
        } else {
          reject(new Error("An unexpected error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
