"use client";

import { removeCookies, serverLogin } from "@/app/actions/actions";
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

export function AuthProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | null;
}) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await serverLogin(email, password);

        const { user } = response;

        setUser({
          username: user?.username,
          email: user?.email,
          id: user?._id,
        });

        localStorage.setItem("user", JSON.stringify(user));

        resolve(response.data); // Resolve with the API response data
      } catch (error) {
        reject(
          new Error(
            (error as unknown as { message?: string })?.message ||
              "An unexpected error occurred"
          )
        );
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

  const logout = async () => {
    removeCookies();
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
