"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, ExternalLink, CircleArrowOutUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import LoadingScreen from "./LoadingScreen";

export default function PortfolioClientSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [experienceYears, setExperienceYears] = useState(3); // Default fallback
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Contact form state and logic
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Basic bad words regex (expand as needed)
  const badWords = /\b(ass|shit|fuck|bitch|bastard|damn|crap|dick|piss|cunt|cock|fag|slut|whore|nigger|nigga|retard|moron|idiot|douche)\b/i;

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateMessage(msg: string) {
    return (
      msg &&
      msg.trim().length >= 15 &&
      !badWords.test(msg)
    );
  }

  const isFormValid = validateEmail(email) && validateMessage(message);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validateMessage(message)) {
      setError(
        message.trim().length < 15
          ? "Message must be at least 15 characters."
          : "Please avoid inappropriate language."
      );
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mjkrnegj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message })
      });
      if (res.ok) {
        setSuccess("Thank you! Your message has been sent.");
        setEmail("");
        setMessage("");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    }
    setSubmitting(false);
  }

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate dynamic experience years only on client side
  useEffect(() => {
    if (!isMounted) return;

    const calculateExperience = () => {
      const startDate = new Date('2021-09-01');
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
      const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
      return diffYears;
    };

    setExperienceYears(calculateExperience());
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    // Dynamically import ScrollTrigger to avoid SSR issues
    const initAnimations = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.3
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.bento-card');

        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    };

    initAnimations();

    return () => {
      // Cleanup ScrollTrigger
      if (typeof window !== "undefined") {
        // Cleanup any existing ScrollTrigger instances
        gsap.killTweensOf(cardsRef.current);
        gsap.killTweensOf(heroRef.current);
      }
    };
  }, [isMounted, isLoading]);

  // Show loading screen if not mounted or still loading
  if (!isMounted || isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#293241] via-[#3d5a80] to-[#98c1d9]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div ref={heroRef} className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
          {/* Name, Title, and Tagline */}
          <div className="space-y-8">
            {/* Name - 2x font size */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#e0fbfc] tracking-tight leading-none">
              <span className="bg-gradient-to-r from-[#98c1d9] via-[#e0fbfc] to-[#98c1d9] bg-clip-text text-transparent">
                Ankit Mangal
              </span>
            </h1>

            {/* Title - x font size with lines */}
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#98c1d9] rounded-full"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#98c1d9] tracking-wide">
                Frontend Developer
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#98c1d9] rounded-full"></div>
            </div>

            {/* Tagline - x/2 font size */}
            <p className="text-lg md:text-xl lg:text-2xl text-[#e0fbfc]/90 font-medium tracking-wide">
              I shape imaginations into working ideas on web
            </p>
          </div>
        </div>
      </section>
      
      {/* Bento Grid Portfolio Sections */}
      <section className="container mx-auto px-4 pb-16">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Row 1: Image DP [1r, 1c] | About Me [1r, 2c] | Education [1r, 3c] */}

          {/* Profile Image - Row 1, Column 1 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-4 border border-[#98c1d9] flex items-center justify-center">
            <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-[#98c1d9]">
              <img
                src="/ankit dp.jpeg"
                alt="Ankit - Frontend Developer"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 39%' }}
              />
            </div>
          </div>

          {/* About Me - Row 1, Column 2 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9]">
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">About Me</h2>
            <p className="text-[#e0fbfc] leading-relaxed mb-4">
              A passionate frontend developer with {experienceYears}+ years of expertise crafting high-performance web applications.
              I specialize in React, Next.js, and TypeScript, delivering scalable solutions that drive business growth.
            </p>
            <a
              href="https://drive.google.com/file/d/1s9D0EuBGOrjAyv487D20Gmf-HHQ4ubWz/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 px-5 py-2 text-sm bg-[#98c1d9] text-[#293241] rounded-lg hover:bg-[#e0fbfc] hover:text-[#3d5a80] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="mr-2 w-5 h-5" />
              View Resume
            </a>
          </div>

          {/* Education - Row 1, Column 3 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9]">
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">Education</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-[#98c1d9] font-semibold">Bachelor of Technology</h3>
                <p className="text-[#e0fbfc] text-sm">Computer Engineering</p>
                <p className="text-[#e0fbfc]/90 text-sm">Bharati Vidyapeeth Deemed University College of Engineering</p>
                <p className="text-[#e0fbfc] text-sm">Pune | CGPA: 7.9 | 2017–2021</p>
              </div>
              <div className="pt-2 border-t border-[#98c1d9]">
                <h3 className="text-[#98c1d9] font-semibold text-sm">Certifications</h3>
                <p className="text-[#e0fbfc]/90 text-sm">AWS Cloud Practitioner (85%)</p>
              </div>
            </div>
          </div>

          {/* Row 2: Experience [2r, 1c, 2c] | Skills [2r, 3c] */}

          {/* Experience - Row 2, Span 2 columns */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9] md:col-span-2">
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">Work Experience</h2>
            <div className="space-y-6">

              <div className="border-l-2 border-[#98c1d9] pl-4">
                <h3 className="text-[#98c1d9] font-semibold">
                  <a 
                    href="https://www.linkedin.com/company/quoppo/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#e0fbfc] transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    QUOPPO VENTURES PVT. LTD.
                    <CircleArrowOutUpRight className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-[#e0fbfc] text-sm mb-2">Frontend Developer | Nov 2024 – Present | Pune, India</p>

                <p className="text-[#e0fbfc] text-sm italic">Menyala AI Copilot</p>
                <p className="text-[#e0fbfc] text-sm mb-3">
                  At Menyala AI Copilot, I led a team of three developers in migrating the codebase from React to Next.js, improving page load times by 30%, performance by 25%, and reducing bug reports by 40%. I introduced Agile methodologies across the team, increasing delivery speed by 30% and minimizing post-release bugs. Additionally, I overhauled the UI with Tailwind CSS and Next.js to improve user research efficiency by 10%, and conducted performance-focused code reviews that elevated team-wide code quality by 20%.
                </p>

                <p className="text-[#e0fbfc] text-sm italic">HeartFocus by Deski</p>
                <p className="text-[#e0fbfc] text-sm">
                  As the sole frontend contributor for HeartFocus, I rebuilt the complete portal UI using React and Tailwind CSS, reducing onboarding time by 50% and modernizing the UX. I integrated Stripe for secure license transactions, enhanced form validation to cut security risks by 30%, and collaborated closely with backend developers to speed up delivery by 40% while maintaining clean, maintainable code.
                </p>
              </div>
              
              <div className="border-l-2 border-[#98c1d9] pl-4">
                <h3 className="text-[#98c1d9] font-semibold">
                  <a 
                    href="https://www.linkedin.com/company/epam-systems/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#e0fbfc] transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    EPAM SYSTEMS
                    <CircleArrowOutUpRight className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-[#e0fbfc] text-sm mb-2">Software Engineer L1 – Frontend | Feb 2022 – Dec 2024 | Pune, India</p>
                <p className="text-[#e0fbfc] text-sm">
                  At EPAM, I contributed to 6+ enterprise applications in diverse domains like fashion, education, and insurance. My work included optimizing brand sites like Victoria's Secret, H&M, and Alo Yoga, resulting in performance gains of up to 30%. I ensured 100% bug-free, test-covered code and helped ship two product releases. Additionally, I implemented Arabic font support using Base64 encoding and worked with modern frontend stacks including React, TypeScript, GraphQL, Redux, and MongoDB.
                </p>
              </div>

              <div className="border-l-2 border-[#98c1d9] pl-4">
                <h3 className="text-[#98c1d9] font-semibold">
                  <a 
                    href="https://www.linkedin.com/company/capgemini/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#e0fbfc] transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    CAPGEMINI
                    <CircleArrowOutUpRight className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-[#e0fbfc] text-sm mb-2">Analyst | July 2021 – Jan 2022 | Bangalore, India</p>
                <p className="text-[#e0fbfc] text-sm">
                  At Capgemini, I underwent intensive training in JavaScript, React, and cloud architecture fundamentals. I earned my AWS Cloud Practitioner certification with an 85% score, establishing a solid foundation in cloud services and frontend engineering best practices.
                </p>
              </div>

            </div>
          </div>



          {/* Skills - Row 2, Column 3 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9]">
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">Skills</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-[#98c1d9] font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#3d5a80] text-[#e0fbfc] rounded-full text-sm border border-[#98c1d9]/30 hover:bg-[#98c1d9] hover:text-[#293241] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#98c1d9] font-semibold mb-2">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Redux', 'Next.js', 'Material UI', 'Tailwind CSS', 'Radix UI', 'Zustand', 'Jest', 'React Testing Library', 'Formik'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#3d5a80] text-[#e0fbfc] rounded-full text-sm border border-[#98c1d9]/30 hover:bg-[#98c1d9] hover:text-[#293241] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#98c1d9] font-semibold mb-2">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'Vite', 'Vercel', 'Netlify', 'JIRA', 'Docker', 'Jenkins', 'AWS', 'Firebase', 'Clerk'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[#3d5a80] text-[#e0fbfc] rounded-full text-sm border border-[#98c1d9]/30 hover:bg-[#98c1d9] hover:text-[#293241] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Featured Project [3r, 1c] | Get In Touch [3r, 2c] | Contact Form [3r, 3c] */}

          {/* Featured Project - Row 3, Column 1 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#e0fbfc] tracking-tight">Projects</h2>
              <Link href="https://www.github.com/ankit-mangal" target="_blank" className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors text-sm">
                {/* <CircleArrowOutUpRight className="ml-1 w-4 h-4" /> */}
                <Github className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="bg-[#3d5a80] rounded-xl p-4 border border-[#98c1d9] hover:bg-[#98c1d9]/10 transition-colors cursor-pointer" onClick={() => window.open('https://wisepenny.netlify.app/', '_blank')}>
                <h3 className="text-[#98c1d9] font-semibold mb-2">Wisepenny</h3>
                <p className="text-[#e0fbfc] text-sm mb-3">
                  Expenses and Income Manager built with React, Redux, Chart.js, and Tailwind CSS.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['React', 'Redux', 'JavaScript', 'Tailwind'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-[#98c1d9] text-[#293241] rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#3d5a80] rounded-xl p-4 border border-[#98c1d9] hover:bg-[#98c1d9]/10 transition-colors cursor-pointer" onClick={() => window.open('https://weather-app-sigmadev.vercel.app/', '_blank')}>
                <h3 className="text-[#98c1d9] font-semibold mb-2">Weather App</h3>
                <p className="text-[#e0fbfc] text-sm mb-3">
                  A weather app built with React, TypeScript, and Tailwind CSS that allows users to search for weather information by city name.
                </p>
                <div className="flex flex-wrap gap-1">
                  {['React', 'Tailwind', 'OpenWeatherMap API'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-[#98c1d9] text-[#293241] rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Get In Touch - Row 3, Column 2 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9]">
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">Get In Touch</h2>
            <div className="space-y-3">
              <a href="mailto:mangalankit843@gmail.com" className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors">
                <Mail className="mr-2 w-4 h-4" />
                mangalankit843@gmail.com
              </a>
              <a href="https://github.com/ankit-mangal" className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors">
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ankit-0725/" className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors" target="_blank">
                <Linkedin className="mr-2 w-4 h-4" />
                LinkedIn
              </a>
              <div className="flex items-center text-[#98c1d9]">
                <MapPin className="mr-2 w-4 h-4" />
                Gwalior, India
              </div>
              <div className="mt-4">
                <iframe
                  title="Gwalior, India Map"
                  src="https://www.google.com/maps?q=Gwalior,India&z=12&output=embed"
                  width="100%"
                  height="160"
                  style={{ border: '2px solid #98c1d9', borderRadius: '0.75rem' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form - Row 3, Column 3 */}
          <div className="bento-card bg-[#293241] rounded-2xl p-6 border border-[#98c1d9]">
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">Contact Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-[#98c1d9] text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[#3d5a80] border border-[#98c1d9] rounded-lg text-[#e0fbfc] placeholder-[#98c1d9]/60 focus:outline-none focus:border-[#e0fbfc] focus:ring-1 focus:ring-[#e0fbfc] transition-colors"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#98c1d9] text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-[#3d5a80] border border-[#98c1d9] rounded-lg text-[#e0fbfc] placeholder-[#98c1d9]/60 focus:outline-none focus:border-[#e0fbfc] focus:ring-1 focus:ring-[#e0fbfc] transition-colors resize-none"
                  placeholder="Your message here..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
              {error && <div className="text-red-400 text-sm font-medium">{error}</div>}
              {success && <div className="text-green-400 text-sm font-medium">{success}</div>}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#98c1d9] text-[#293241] rounded-lg hover:bg-[#e0fbfc] hover:text-[#3d5a80] transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!isFormValid || submitting}
              >
                {submitting ? "Sending..." : "Connect"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-[#e0fbfc]/80">
          © 2025 Ankit. Built with ❤️.
        </p>
      </footer>
    </div>
  );
}