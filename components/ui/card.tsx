"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import * as React from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "neon" | "feature" | "glass";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      variant === "neon" && "neon-card border-0",
      variant === "feature" && "feature-card",
      variant === "glass" && "glass-card",
      className
    )}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    whileTap="tap"
    variants={cardVariants}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <motion.h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.1, duration: 0.3 }}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <motion.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("p-6 pt-0 w-full", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.3 }}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.3 }}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
