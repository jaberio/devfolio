'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type GoogleAnalyticsProps = {
    measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!measurementId) return;

        // Load Google Analytics script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', measurementId);

        // Make gtag available globally
        (window as any).gtag = gtag;
    }, [measurementId]);

    useEffect(() => {
        if (!measurementId || !(window as any).gtag) return;

        // Track page views on route change
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        (window as any).gtag('config', measurementId, {
            page_path: url,
        });
    }, [pathname, searchParams, measurementId]);

    return null;
}

// Type declaration for window.dataLayer
declare global {
    interface Window {
        dataLayer: any[];
    }
}
