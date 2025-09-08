
export interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatarUrl: string;
}

export interface HowItWorksStep {
    step: number;
    icon: JSX.Element;
    title: string;
    description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
