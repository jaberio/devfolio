import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { getConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: {
      default: `${config.site.name} | ${config.site.title}`,
      template: `%s | ${config.site.name}`,
    },
    description: config.site.description,
    metadataBase: new URL(config.site.url),
    openGraph: {
      title: config.site.name,
      description: config.site.description,
      url: config.site.url,
      siteName: config.site.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: '/icon.png',
          width: 512,
          height: 512,
          alt: config.site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.site.name,
      description: config.site.description,
      images: ['/icon.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getConfig();

  // Get analytics configuration from environment variables
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
  const enableVercelAnalytics = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar config={config} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer config={config} />
        </Providers>
        <Analytics
          googleAnalyticsId={googleAnalyticsId}
          enableVercelAnalytics={enableVercelAnalytics}
        />
      </body>
    </html>
  );
}
