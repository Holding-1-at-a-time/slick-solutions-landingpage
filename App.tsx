import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionTemplate, Variants } from 'framer-motion';
import type { Feature, Testimonial, HowItWorksStep, FAQItem } from './types';
import {
  NAV_LINKS,
  FEATURES_DATA,
  TESTIMONIALS_DATA,
  HOW_IT_WORKS_DATA,
  FAQ_DATA,
  LogoIcon,
  AppPreviewIcon
} from './constants';

// --- Mock Integrations ---

const SignUpButton = ({ children, className, ...rest }: { children: React.ReactNode, className?: string; [key: string]: any }) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={className} 
    onClick={() => alert('This would redirect to the Clerk Sign Up page.')}
    {...rest}
  >
    {children}
  </motion.button>
);

const useQuery = <T,>(data: T): [T | null, boolean] => {
  const [state, setState] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(data);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);
  return [state, loading];
};


// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const howItWorksItemVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// --- Components ---

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <LogoIcon className="w-8 h-8 text-brand-green-500" />
            <span className="text-2xl font-bold text-white">Slick Solutions</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="text-slate-300 hover:text-brand-green-400 transition-colors duration-300">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <SignUpButton className="bg-brand-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-brand-green-700 transition-all duration-300 shadow-lg shadow-brand-green-900/50">
              Get Started
            </SignUpButton>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" aria-expanded={isMenuOpen}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 origin-top"
            >
              <div className="bg-slate-900 rounded-lg p-4">
                {NAV_LINKS.map(link => (
                  <a key={link.name} href={link.href} className="block text-slate-300 hover:text-brand-green-400 py-2" onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                  </a>
                ))}
                <SignUpButton className="w-full mt-4 bg-brand-green-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-brand-green-700 transition-colors duration-300">
                  Get Started
                </SignUpButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLElement>) => {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  
  const cardRotateX = useTransform(mouseY, [0, 400], [10, -10]);
  const cardRotateY = useTransform(mouseX, [0, 800], [-10, 10]);

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-slate-800/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
       <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-50 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px at ${mouseX}px ${mouseY}px,
              rgba(0, 174, 152, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green-900/50 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-900/50 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      <motion.div 
        className="container mx-auto px-6 text-center z-10"
        style={{ transformStyle: 'preserve-3d', rotateX: cardRotateX, rotateY: cardRotateY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 leading-tight tracking-tighter" style={{transform: 'translateZ(20px)'}}>
          Stop Guessing.
          <br />
          Start Quoting with Confidence.
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-400" style={{transform: 'translateZ(40px)'}}>
          Slick Solutions is the AI-powered sidekick for your detailing business. Create accurate, profitable, and professional quotes in seconds, not minutes.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10 flex justify-center items-center gap-4" style={{transform: 'translateZ(60px)'}}>
          <SignUpButton 
            className="bg-brand-green-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-brand-green-700 transition-all duration-300 transform shadow-2xl shadow-brand-green-900/60"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          >
            Sign Up for Free
          </SignUpButton>
          <motion.a href="#features" className="text-slate-300 font-semibold px-6 py-4 rounded-lg hover:bg-slate-800/50 transition-colors duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Learn More &rarr;
          </motion.a>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-16" style={{transform: 'translateZ(80px)'}}>
          <div className="relative mx-auto w-full max-w-4xl h-auto">
            <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-brand-green-700 to-teal-700 blur opacity-20"></div>
            <AppPreviewIcon className="relative rounded-xl border border-slate-700/50 shadow-2xl shadow-slate-950" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  
  const cardRotateX = useTransform(mouseY, [0, 300], [10, -10]);
  const cardRotateY = useTransform(mouseX, [0, 400], [-10, 10]);

  return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(200);
          mouseY.set(150);
        }}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: cardRotateX,
          rotateY: cardRotateY,
        }}
        variants={itemVariants}
        className="relative bg-slate-900 p-8 rounded-xl border border-slate-800 h-full"
      >
        <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  250px at ${mouseX}px ${mouseY}px,
                  rgba(0, 174, 152, 0.1),
                  transparent 80%
                )
              `,
            }}
          />
        <div style={{ transform: 'translateZ(20px)' }}>
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-2 text-slate-400">{feature.description}</p>
        </div>
      </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-32">
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">The Toolkit for a Smarter Detailing Business</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            Everything you need to streamline your quoting process, impress customers, and grow your profits.
          </p>
        </motion.div>
        <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" 
            style={{ perspective: '1000px' }}
            variants={containerVariants}
        >
          {FEATURES_DATA.map((feature: Feature, index: number) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-slate-900/50">
      <motion.div 
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        style={{ perspective: '1000px' }}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Get a Perfect Quote in 3 Simple Steps</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            From vehicle arrival to customer approval in under a minute.
          </p>
        </motion.div>
        <div className="mt-20">
          <div className="relative">
            <div className="absolute left-0 right-0 top-10 h-0.5 bg-slate-700/50 hidden md:block" aria-hidden="true"></div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-8"
              variants={containerVariants}
            >
              {HOW_IT_WORKS_DATA.map((step: HowItWorksStep) => (
                <motion.div 
                  key={step.step} 
                  variants={howItWorksItemVariants} 
                  className="text-center flex flex-col items-center relative"
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="mb-6 w-20 h-20 rounded-full bg-slate-800 border-2 border-brand-green-500 flex items-center justify-center z-10">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const [testimonials, loading] = useQuery(TESTIMONIALS_DATA);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const targetItem = carousel.children[index] as HTMLElement;
      if (targetItem) {
        const scrollAmount = targetItem.offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handlePrev = useCallback(() => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    handleScrollTo(newIndex);
  }, [activeIndex, handleScrollTo]);

  const handleNext = useCallback(() => {
    if (!testimonials) return;
    const newIndex = Math.min(activeIndex + 1, testimonials.length - 1);
    setActiveIndex(newIndex);
    handleScrollTo(newIndex);
  }, [activeIndex, testimonials, handleScrollTo]);
  
  useEffect(() => {
    const container = carouselRef.current;
    if (!container || loading) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries.filter(e => e.isIntersecting);
            if (visibleEntries.length > 0) {
                visibleEntries.sort((a, b) => {
                    const aIndex = parseInt(a.target.getAttribute('data-index') || '0', 10);
                    const bIndex = parseInt(b.target.getAttribute('data-index') || '0', 10);
                    return aIndex - bIndex;
                });
                const firstVisibleIndex = parseInt(visibleEntries[0].target.getAttribute('data-index') || '0', 10);
                setActiveIndex(firstVisibleIndex);
            }
        },
        {
            root: container,
            threshold: 0.5,
        }
    );

    const children = Array.from(container.children);
    children.forEach(child => observer.observe(child));

    return () => children.forEach(child => observer.unobserve(child));
  }, [loading, testimonials]);


  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <motion.div 
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Trusted by Detailers Like You</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            Hear how Slick Solutions is transforming detailing businesses across the country.
          </p>
        </motion.div>
        
        <div className="mt-16 relative">
          <motion.div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-slate-900 p-8 rounded-xl border border-slate-800 animate-pulse flex-shrink-0 snap-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
                      <div className="h-24 bg-slate-700 rounded"></div>
                      <div className="flex items-center mt-6 space-x-4">
                          <div className="w-12 h-12 rounded-full bg-slate-700"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-700 rounded"></div>
                            <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                          </div>
                      </div>
                  </div>
              ))
            ) : (
              testimonials?.map((testimonial: Testimonial, index: number) => (
                <motion.figure 
                  key={index} 
                  variants={itemVariants}
                  data-index={index}
                  className="bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col flex-shrink-0 snap-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]"
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <blockquote className="flex-grow">
                    <p className="text-slate-300">"{testimonial.quote}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center space-x-4">
                    <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-bold text-white">{testimonial.author}</div>
                      <div className="text-slate-400 text-sm">{testimonial.company}</div>
                    </div>
                  </figcaption>
                </motion.figure>
              ))
            )}
          </motion.div>
          
          {testimonials && testimonials.length > 1 && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 -left-0 md:-left-4 hidden md:flex">
                  <button 
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-0 md:-right-4 hidden md:flex">
                  <button 
                    onClick={handleNext}
                    disabled={activeIndex === testimonials.length - 1}
                    className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Next testimonial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
              </div>
            </>
          )}
        </div>
        
        {testimonials && testimonials.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleScrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-brand-green-500 scale-125' : 'bg-slate-600 hover:bg-slate-500'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                        aria-current={activeIndex === index}
                    />
                ))}
            </div>
        )}
      </motion.div>
    </section>
  );
};

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="border-b border-slate-800 last:border-b-0" variants={itemVariants}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-900/50 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white">{item.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
           <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '0rem', paddingBottom: '1.25rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' },
              collapsed: { opacity: 0, height: 0, marginTop: '0rem', paddingBottom: '0rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 pr-8">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const FAQSection: React.FC = () => {
    return (
        <section id="faq" className="py-20 sm:py-32 bg-slate-900/50">
            <motion.div
                className="container mx-auto px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div className="text-center max-w-2xl mx-auto" variants={itemVariants}>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </motion.div>
                <motion.div 
                    className="mt-16 max-w-3xl mx-auto"
                    variants={containerVariants}
                 >
                    {FAQ_DATA.map((item, index) => (
                        <AccordionItem key={index} item={item} />
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};


const CTASection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <div className="relative bg-gradient-to-r from-brand-green-800 to-teal-800 rounded-2xl p-8 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-900/[0.1]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Transform Your Detailing Business Today</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-green-100">
                Join hundreds of detailers who are saving time, increasing profits, and winning more jobs with Slick Solutions.
              </p>
              <div className="mt-10">
                <SignUpButton className="bg-white text-brand-green-700 font-bold px-8 py-4 rounded-lg hover:bg-slate-200 transition-all duration-300 shadow-2xl">
                  Start Your Free Trial
                </SignUpButton>
                <p className="mt-4 text-sm text-green-200">No credit card required. 14-day free trial.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <a href="#" className="flex items-center space-x-2" aria-label="Slick Solutions - Back to top">
            <LogoIcon className="w-6 h-6 text-slate-400" />
            <span className="text-lg font-semibold text-slate-300">Slick Solutions</span>
          </a>
          <div className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Slick Solutions. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;