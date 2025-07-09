"use client";
import clsx from "clsx";
import Link from "next/link";
import { useAuth } from "../../providers/auth-provider";
import { Button } from "../ui/button";
import { UserNav } from "../user-nav";
import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ from }: { from: "home" | "auth" }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4 max-w-[1380px] mx-auto px-4">
        <MainNav from={from} isAuthenticated={user ? true : false} />
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          {user ? (
            <UserNav />
          ) : (
            <div
              className={clsx(
                from === "home" ? "hidden md:flex md:gap-2" : "hidden"
              )}
            >
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
