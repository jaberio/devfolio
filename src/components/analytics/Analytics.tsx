'use client';

import { GoogleAnalytics } from './GoogleAnalytics';
import { VercelAnalytics } from './VercelAnalytics';

type AnalyticsProps = {
    googleAnalyticsId?: string;
    enableVercelAnalytics?: boolean;
};

export function Analytics({ googleAnalyticsId, enableVercelAnalytics }: AnalyticsProps) {
    return (
        <>
            {googleAnalyticsId && <GoogleAnalytics measurementId={googleAnalyticsId} />}
            {enableVercelAnalytics && <VercelAnalytics />}
        </>
    );
}
