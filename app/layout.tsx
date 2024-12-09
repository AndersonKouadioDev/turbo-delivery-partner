import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import NextAuthSessionProvider from "@/providers/next-auth-session.provider";

export const metadata: Metadata = {
    title: {
        template: '%s | Turbo Delivery Restaurant - Restaurant management platform',
        default: 'Turbo Delivery Restaurant - Restaurant management platform',
        absolute: 'Turbo Delivery Restaurant - Restaurant management platform',
    },
    description: "Turbo Delivery Restaurant, leader de la livraison de restaurant à Abidjan. Spécialistes en livraison de restaurant en Côte d'Ivoire. Expertise locale, service personnalisé.",
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    referrer: 'origin-when-cross-origin',
    keywords: [
        'Livraison de restaurant Abidjan',
        "Livraison de restaurant Côte d'Ivoire",
        'Livraison de restaurant en ligne',
        'Livraison de restaurant à domicile',
        "Livraison de restaurant en ligne Côte d'Ivoire",
        'Livraison de restaurant à domicile Abidjan',
        'Livraison de restaurant en ligne Abidjan',
        "Gestion de restaurant Côte d'Ivoire",
        'Programmes de restaurant Abidjan',
        "Expert livraison de restaurant Côte d'Ivoire",
        'Agence de livraison de restaurant de confiance',
    ],
    authors: [{ name: 'LUNION-LAB Developers', url: 'https://www.lunion-lab.com' }],
    creator: 'LUNION-LAB',
    publisher: 'LUNION-LAB',
    alternates: {
        canonical: 'https://www.turbo-delivery-restaurant.com',
        languages: {
            'fr-CI': 'https://www.turbo-delivery-restaurant.com',
            'en-US': 'https://www.turbo-delivery-restaurant.com/en',
        },
    },
    openGraph: {
        type: 'website',
        locale: 'fr_CI',
        url: 'https://www.turbo-delivery-restaurant.com',
        siteName: 'Turbo Delivery Restaurant',
        title: 'Turbo Delivery Restaurant - Restaurant management platform',
        description: "Turbo Delivery Restaurant, leader de la livraison de restaurant à Abidjan. Spécialistes en livraison de restaurant en Côte d'Ivoire. Expertise locale, service personnalisé.",
        images: [
            {
                url: 'https://www.turbo-delivery-restaurant.com/og-image.png',
                width: 630,
                height: 630,
                alt: 'Turbo Delivery Restaurant - Restaurant management platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@Turbo Delivery Restaurant',
        creator: '@Turbo Delivery Restaurant',
        title: 'Turbo Delivery Restaurant - Restaurant management platform',
        description: "Turbo Delivery Restaurant, leader de la livraison de restaurant à Abidjan. Spécialistes en livraison de restaurant en Côte d'Ivoire. Expertise locale, service personnalisé.",
        images: ['https://www.turbo-delivery-restaurant.com/twitter-image.png'],
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    category: 'Restaurant',
    verification: {
        google: 'google-site-verification=fFyjcvBvLd5IQC3thbjB7iTjZ9vdurwAWMCIyH_O-UE',
        yandex: '42c2b5a41dd6bade',
        other: {
            bing: '0C95FF49E95D55275C93B0A21CA0A039',
        },
    },
    other: {
        'fb:app_id': '1075289994232342',
        'og:phone_number': '+225 01 43 483 131',
        'og:email': 'info@turbo-delivery-restaurant.com',
        'og:latitude': '5.284599',
        'og:longitude': '-3.974556',
        'og:street-address': "Marcory Zone 4, Rue du 7 décembre | Abidjan Côte d'Ivoire",
        'og:locality': 'Abidjan',
        'og:region': "Côte d'Ivoire",
        'og:postal-code': '22 BP 1022 Abidjan 22',
        'og:country-name': "Côte d'Ivoire",
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

const nunito = Lato({
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthSessionProvider>
            <html lang="en" className="light">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body className={nunito.variable}>
                    <SessionProvider>
                        <ProviderComponent>{children}</ProviderComponent>
                    </SessionProvider>
                </body>
            </html>
        </NextAuthSessionProvider>
    );
}
