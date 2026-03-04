import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriLife – Personalized Nutrition & Expert Consultations",
  description: "AI-powered diet plans and expert nutritionist consultations for a healthier tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
