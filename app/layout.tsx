import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Starlog - notes from the journey", template: "%s | Starlog" },
  description: "A quiet corner of the internet for stories, ideas, and things worth remembering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Nav /><main>{children}</main><footer className="site-footer"><span>STARLOG</span><span>Made for curious minds | {new Date().getFullYear()}</span></footer></body></html>;
}
