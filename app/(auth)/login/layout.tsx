import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - LinkSnip",
  description: "Login to your account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
