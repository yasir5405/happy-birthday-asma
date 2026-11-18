import type { Metadata, Viewport } from "next";
import { content } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `Happy Birthday, ${content.name}`,
  description: `A little something for ${content.name}, with all my love.`,
};

export const viewport: Viewport = {
  themeColor: "#fbf5ef",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
