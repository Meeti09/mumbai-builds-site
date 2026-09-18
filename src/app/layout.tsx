import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./gn-03.css";

export const metadata: Metadata = {
  title: "Mumbai Builds — Build What Matters",
  description:
    "A Mumbai-wide student innovation platform connecting promising builders with industry, technology, mentors, and real-world problems.",
  openGraph: {
    title: "Mumbai Builds — Build What Matters",
    description:
      "A Mumbai-wide student innovation platform connecting promising builders with industry, technology, mentors, and real-world problems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Google Sans isn't in next/font/google, and self-hosting would mean
            vendoring ~25 unicode subsets per weight (the timeline needs the
            Devanagari subset). */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden max-w-[100vw] bg-[#0e0e0e]">
        {children}
      </body>
    </html>
  );
}
