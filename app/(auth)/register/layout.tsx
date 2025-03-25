import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - LinkSnip",
  description: "Register for a new account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
