import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getCookies } from "./actions/actions";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkSnip - URL Shortener",
  description:
    "Shorten your URLs and track their performance. Create QR codes and manage your links with ease.",
  keywords: [
    "URL Shortener",
    "Link Management",
    "Link Analytics",
    "Shorten Links",
    "Track Links",
    "LinkSnip",
    "URL Shortening Service",
    "Link Tracking",
  ],
  authors: [
    {
      name: "Md Rejoyan Islam",
      url: "https://md-rejoyan-islam.github.io/",
    },
  ],
  creator: "Md Rejoyan Islam",
  openGraph: {
    title: "LinkSnip - URL Shortener",
    description:
      "Shorten your URLs and track their performance. Create QR codes and manage your links with ease.",
    url: process.env.CLIENT_URL!,
    siteName: "LinkSnip",
    images: [
      {
        url: "/link.png",
        width: 1200,
        height: 630,
        alt: "LinkSnip - URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getCookies();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider token={token}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
            <Toaster
              toastOptions={{
                classNames: {
                  success: "bg-green-500! text-white! border-green-600!",
                  error: "bg-red-500! text-white! border-red-600!",
                },
              }}
              closeButton
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
