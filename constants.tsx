import React from 'react';
import type { Feature, Testimonial, HowItWorksStep, FAQItem } from './types';

// SVG Icons
export const LogoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VinScanIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h7.5v7.5h-7.5z" />
  </svg>
);

export const AiPricingIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-7.5 0C4.508 19.64 2.25 15.184 2.25 10.5 2.25 5.816 4.508 1.36 8.25 1.36c3.742 0 6 4.456 6 9.14 0 4.684-2.258 9.14-6 9.14z" />
  </svg>
);

export const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const AppPreviewIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="450" rx="12" fill="#0F172A"/>
    <rect x="20" y="20" width="150" height="410" rx="8" fill="#1E293B"/>
    <rect x="40" y="40" width="90" height="10" rx="5" fill="#334155"/>
    <rect x="40" y="70" width="110" height="8" rx="4" fill="#475569"/>
    <rect x="40" y="90" width="70" height="8" rx="4" fill="#334155"/>
    <rect x="40" y="110" width="100" height="8" rx="4" fill="#334155"/>

    <rect x="190" y="20" width="590" height="60" rx="8" fill="#1E293B"/>
    <rect x="210" y="40" width="200" height="20" rx="5" fill="#334155"/>
    <rect x="720" y="40" width="40" height="20" rx="10" fill="#475569"/>
    
    <rect x="190" y="100" width="285" height="150" rx="8" fill="#1E293B"/>
    <rect x="210" y="120" width="100" height="10" rx="5" fill="#334155"/>
    <rect x="210" y="150" width="245" height="80" rx="5" fill="#008171" fillOpacity="0.3"/>
    <path d="M210 230 C 250 190, 290 210, 330 180 S 410 160, 455 190" stroke="#00ae98" strokeWidth="3" fill="none"/>
    
    <rect x="495" y="100" width="285" height="150" rx="8" fill="#1E293B"/>
    <rect x="515" y="120" width="120" height="10" rx="5" fill="#334155"/>
    <rect x="515" y="150" width="40" height="80" rx="5" fill="#334155"/>
    <rect x="565" y="150" width="40" height="80" rx="5" fill="#475569"/>
    <rect x="615" y="150" width="40" height="80" rx="5" fill="#334155"/>
    <rect x="665" y="150" width="40" height="80" rx="5" fill="#475569"/>
    
    <rect x="190" y="270" width="590" height="160" rx="8" fill="#1E293B"/>
    <rect x="210" y="290" width="150" height="10" rx="5" fill="#334155"/>
    <rect x="210" y="320" width="550" height="8" rx="4" fill="#475569"/>
    <rect x="210" y="340" width="510" height="8" rx="4" fill="#334155"/>
    <rect x="210" y="360" width="550" height="8" rx="4" fill="#334155"/>
    <rect x="210" y="380" width="480" height="8" rx="4" fill="#334155"/>
  </svg>
);


// Navigation Links
export const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

// Features Data
export const FEATURES_DATA: Feature[] = [
  {
    icon: <VinScanIcon className="w-8 h-8 text-brand-green-400" />,
    title: 'Instant VIN Scanner',
    description: 'Eliminate manual data entry. Scan a vehicle\'s VIN with your phone to instantly pull up its year, make, model, and trim.',
  },
  {
    icon: <AiPricingIcon className="w-8 h-8 text-brand-green-400" />,
    title: 'AI-Powered Pricing',
    description: 'Our smart algorithm analyzes the vehicle, selected services, and your business costs to recommend a profitable price every time.',
  },
  {
    icon: <QuoteIcon className="w-8 h-8 text-brand-green-400" />,
    title: 'Professional PDF Quotes',
    description: 'Generate and send sleek, professional PDF quotes to your clients in seconds, complete with your branding and service details.',
  },
];

// How It Works Data
export const HOW_IT_WORKS_DATA: HowItWorksStep[] = [
    {
        step: 1,
        icon: <VinScanIcon className="w-10 h-10 text-brand-green-400" />,
        title: 'Scan the VIN',
        description: 'Use your device\'s camera to scan the vehicle\'s VIN barcode or enter it manually.'
    },
    {
        step: 2,
        icon: <AiPricingIcon className="w-10 h-10 text-brand-green-400" />,
        title: 'Select Services',
        description: 'Choose from your pre-defined services and packages for the specific vehicle.'
    },
    {
        step: 3,
        icon: <QuoteIcon className="w-10 h-10 text-brand-green-400" />,
        title: 'Generate Quote',
        description: 'Our AI generates an accurate, profitable quote instantly. Review and send it to your customer.'
    }
];

// Testimonials Data
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: 'Slick Solutions changed the game for us. Our pricing is now consistent, and we\'ve boosted our profit margins by 15%. I can\'t imagine running my business without it.',
    author: 'Carlos Rodriguez',
    company: 'Prestige Auto Detailing',
    avatarUrl: 'https://picsum.photos/id/1005/100/100'
  },
  {
    quote: 'The VIN scanner is ridiculously fast and accurate. It saves me at least 5-10 minutes per quote, which adds up massively over a week. My customers are impressed with the professional PDFs.',
    author: 'Jessica Chen',
    company: 'Chen\'s Mobile Shine',
    avatarUrl: 'https://picsum.photos/id/1011/100/100'
  },
  {
    quote: 'I used to underprice my services constantly. The AI pricing gave me the confidence to charge what I\'m worth. Signing up for Slick Solutions was the best business decision I made this year.',
    author: 'Mike Thompson',
    company: 'Thompson\'s Touch',
    avatarUrl: 'https://picsum.photos/id/1027/100/100'
  }
];

// FAQ Data
export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Is Slick Solutions suitable for mobile detailers?',
    answer: 'Absolutely! Slick Solutions is a web-based application, meaning you can access it from any device with an internet connection, including your smartphone or tablet. It\'s perfect for generating quotes on the go.',
  },
  {
    question: 'Can I customize the services and pricing?',
    answer: 'Yes, you have full control. You can create, edit, and price your own list of services and packages. The AI uses your custom pricing as a baseline to generate its recommendations, ensuring quotes are tailored to your business.',
  },
  {
    question: 'What happens after the 14-day free trial?',
    answer: 'After your free trial ends, you\'ll be prompted to choose a subscription plan that fits your needs. All the data and settings you configured during the trial will be saved and ready for you.',
  },
  {
    question: 'How does the AI pricing work?',
    answer: 'Our AI analyzes multiple data points, including the vehicle\'s make, model, age, trim level, the services you\'ve selected, and your base pricing. It then compares this to market data to suggest a price that is both competitive and profitable for you.',
  },
  {
      question: 'Do I need to install any software?',
      answer: 'No installation is needed. Slick Solutions is a fully cloud-based SaaS application. Just sign up, log in through your web browser, and you\'re ready to start creating quotes.',
  },
];