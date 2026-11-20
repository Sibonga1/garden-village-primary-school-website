import type { Metadata } from "next";
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Garden Village Primary School | Education is Power",
  description:
    "Garden Village Primary School, South Africa — where curiosity grows and community thrives. Quality education, dedicated teaching, and a strong sense of community.",
  keywords: [
    "Garden Village",
    "Primary School",
    "South Africa",
    "Education is Power",
    "School",
  ],
  authors: [{ name: "Garden Village School" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Garden Village Primary School",
    description: "Where curiosity grows and community thrives.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${jakarta.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
