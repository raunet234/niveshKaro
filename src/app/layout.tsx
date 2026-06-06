import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NiveshMitra — Discover Smart Investments | India's Investment Discovery Platform",
    description:
        "Discover verified investment opportunities across India. Explore real estate, businesses, mutual funds, gold & more. Connect directly with business owners. Free for investors.",
    keywords: [
        "investment",
        "India",
        "discover investments",
        "real estate investment",
        "business investment",
        "mutual funds",
        "NiveshMitra",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
