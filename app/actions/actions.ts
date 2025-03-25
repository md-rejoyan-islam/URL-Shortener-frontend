"use server";
import api from "@/lib/axios-instance";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function serverLogin(email: string, password: string) {
  try {
    const response: AxiosResponse = await api.post("/api/v1/auth/login", {
      email,
      password,
    });

    const { token } = response.data;

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: +(process.env.NEXT_PUBLIC_COOKIES_EXPIRES || 3600 * 24 * 30), // 30 days
      path: "/",
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function getCookies() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  return token ? token.value : null;
}

export async function removeCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
