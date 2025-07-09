"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ScissorsLineDashed, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MainNav({
  from,
  isAuthenticated,
}: {
  from: string;
  isAuthenticated: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/analytics", label: "Analytics" },
    { href: "/login", label: "Login" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex items-center justify-between w-full md:w-auto md:justify-start md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <ScissorsLineDashed className="h-7 w-7  text-purple-800 dark:text-purple-600" />
        <span className="font-bold text-lg inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
          LinkSnip
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className={cn(from === "home" ? "hidden md:flex gap-6" : "hidden")}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              item.label === "Login" && "block md:hidden",
              item.label === "Login" && !isAuthenticated && "block md:hidden",
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={clsx(from === "home" ? "md:hidden" : "hidden")}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="h-5 w-5 eee" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={toggleMobileMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-card border-l border-border p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={toggleMobileMenu}
                  >
                    <ScissorsLineDashed className="h-6 w-6" />
                    <span className="font-bold">LinkSnip</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMobileMenu}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                        pathname === item.href
                          ? "bg-accent text-primary"
                          : "text-muted-foreground",
                        item.label === "Login" && isAuthenticated && "hidden"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
