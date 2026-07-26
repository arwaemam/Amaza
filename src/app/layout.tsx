import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ScrollAnimationProvider } from '@/components/animations';
import './globals.css';

// Font configuration with optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// Global metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://amazepms.com'),
  title: {
    default: 'AmazePMS - Property Management System for Hospitality',
    template: '%s | AmazePMS',
  },
  description:
    'Streamline your hospitality business with AmazePMS. Comprehensive property management software for hotels, vacation rentals, and B&Bs.',
  keywords: [
    'property management',
    'hospitality software',
    'hotel management',
    'vacation rental',
    'PMS',
    'hotel PMS',
    'property management system',
  ],
  authors: [{ name: 'AmazePMS Team' }],
  creator: 'AmazePMS',
  publisher: 'AmazePMS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amazepms.com',
    siteName: 'AmazePMS',
    title: 'AmazePMS - Property Management System for Hospitality',
    description:
      'Streamline your hospitality business with AmazePMS. Comprehensive property management software for hotels, vacation rentals, and B&Bs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AmazePMS Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@amazepms',
    creator: '@amazepms',
    title: 'AmazePMS - Property Management System',
    description:
      'Streamline your hospitality business with AmazePMS. Comprehensive property management software for hotels, vacation rentals, and B&Bs.',
    images: ['/twitter-image.jpg'],
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
  verification: {
    google: 'google-site-verification-token',
    yandex: 'yandex-verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to external resources */}
        <link rel='preconnect' href='https://api.amazepms.com' />
        <link rel='preconnect' href='https://analytics.google.com' />
        {/* Reduced motion support */}
        <meta name='color-scheme' content='light dark' />
        <meta name='theme-color' content='#2563eb' />
      </head>
      <body
        className={`font-sans antialiased bg-white text-neutral-900 selection:bg-primary-100 selection:text-primary-900`}
        suppressHydrationWarning={true}
      >
        <ScrollAnimationProvider>
          {/* Skip to main content for accessibility */}
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200'
          >
            Skip to main content
          </a>
          
          <div id='root'>
            {children}
          </div>
        </ScrollAnimationProvider>
      </body>
    </html>
  );
}