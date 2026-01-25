import Script from 'next/script';

export function VercelAnalytics() {
    // Vercel Analytics is automatically enabled in production on Vercel
    // This component adds the web vitals tracking script
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) return null;

    return (
        <Script
            id="vercel-analytics"
            strategy="afterInteractive"
            src="https://va.vercel-scripts.com/v1/script.js"
        />
    );
}
