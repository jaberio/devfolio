import { getConfig } from '@/lib/config';
import ContactForm from '@/components/ContactForm';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-static';

export default function ContactPage() {
    const config = getConfig();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <header className="mb-20 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter"
                >
                    Let&apos;s talk<span className="text-blue-600">.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Have a project in mind or just want to connect? Drop me a message below.
                </motion.p>
            </header>

            <ContactForm email={config.social.email} github={config.social.github} twitter={config.social.twitter} />
        </div>
    );
}
