"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  CircleArrowOutUpRight,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import LoadingScreen from "./LoadingScreen";
import { BentoCardData, ContactInfo, Experience, Project, SkillCategory } from "@/types";
import { bentoCardsData } from "@/app/data/ankit-mangal-data";


// Dynamic Bento Card Component
const BentoCard = ({
  data,
  experienceYears,
}: {
  data: BentoCardData;
  experienceYears: number;
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const badWords =
    /\b(ass|shit|fuck|bitch|bastard|damn|crap|dick|piss|cunt|cock|fag|slut|whore|nigger|nigga|retard|moron|idiot|douche)\b/i;

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateMessage(msg: string) {
    return msg && msg.trim().length >= 15 && !badWords.test(msg);
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
        body: JSON.stringify({ email, message }),
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

  const renderCardContent = () => {
    switch (data.type) {
      case "profile":
        return (
          <div className="w-full hidden lg:block h-64 rounded-xl overflow-hidden border-2 border-[#98c1d9]">
            <img
              src={data.content.imageSrc}
              alt={data.content.alt}
              className="w-full h-full object-cover"
              style={{ objectPosition: data.content.objectPosition }}
            />
          </div>
        );

      case "about":
        return (
          <>
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-2 tracking-tight">
              {data.title}
            </h2>
            <p className="text-[#e0fbfc] leading-relaxed mb-5">
              {data.content.description.replace(
                "{experienceYears}",
                experienceYears.toString()
              )}
            </p>
            <a
              href={data.content.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 px-5 py-3 text-sm bg-[#98c1d9] text-[#293241] rounded-lg hover:bg-[#e0fbfc] hover:text-[#3d5a80] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="mr-2 w-5 h-5" />
              {data.content.resumeText}
            </a>
          </>
        );

      case "education":
        return (
          <>
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">
              {data.title}
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-[#98c1d9] font-semibold">
                  {data.content.degree.title}
                </h3>
                <p className="text-[#e0fbfc] text-sm">
                  {data.content.degree.field}
                </p>
                <p className="text-[#e0fbfc]/90 text-sm">
                  {data.content.degree.institution}
                </p>
                <p className="text-[#e0fbfc] text-sm">
                  {data.content.degree.details}
                </p>
              </div>
              <div className="pt-2 border-t border-[#98c1d9]">
                <h3 className="text-[#98c1d9] font-semibold text-sm">
                  Certifications
                </h3>
                {data.content.certifications.map(
                  (cert: string, index: number) => (
                    <p key={index} className="text-[#e0fbfc]/90 text-sm">
                      {cert}
                    </p>
                  )
                )}
              </div>
            </div>
          </>
        );

      case "experience":
        return (
          <>
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">
              {data.title}
            </h2>
            <div className="space-y-6">
              {data.content.experiences.map(
                (exp: Experience, index: number) => (
                  <div key={index} className="border-l-2 border-[#98c1d9] pl-4">
                    <h3 className="text-[#98c1d9] font-semibold">
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#e0fbfc] transition-colors duration-300 inline-flex items-center gap-2"
                        >
                          {exp.company}
                          <CircleArrowOutUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h3>
                    <p className="text-[#e0fbfc] text-sm mb-2">
                      {exp.position} | {exp.duration} | {exp.location}
                    </p>

                    {exp.projects?.map((project, pIndex) => (
                      <div key={pIndex} className="mb-3">
                        <p className="text-[#e0fbfc] text-sm italic">
                          {project.name}
                        </p>
                        <p className="text-[#e0fbfc] text-sm">
                          {project.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        );

      case "skills":
        return (
          <>
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">
              {data.title}
            </h2>
            <div className="space-y-4">
              {data.content.categories.map(
                (category: SkillCategory, index: number) => (
                  <div key={index}>
                    <h3 className="text-[#98c1d9] font-semibold mb-2">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-[#3d5a80] text-[#e0fbfc] rounded-full text-sm border border-[#98c1d9]/30 hover:bg-[#98c1d9] hover:text-[#293241] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        );

      case "projects":
        return (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#e0fbfc] tracking-tight">
                {data.title}
              </h2>
              <Link
                href={data.content.githubUrl}
                target="_blank"
                className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors text-sm"
              >
                <Github className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {data.content.projects.map((project: Project, index: number) => (
                <div
                  key={index}
                  className="bg-[#3d5a80] rounded-xl p-4 border border-[#98c1d9] hover:bg-[#98c1d9]/10 transition-colors cursor-pointer"
                  onClick={() => window.open(project.url, "_blank")}
                >
                  <h3 className="text-[#98c1d9] font-semibold mb-2">
                    {project.name}
                  </h3>
                  <p className="text-[#e0fbfc] text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[#98c1d9] text-[#293241] rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "contact":
        const contactInfo = data.content as ContactInfo;
        return (
          <>
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">
              {data.title}
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors"
              >
                <Mail className="mr-2 w-4 h-4" />
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.github}
                className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors"
              >
                <Github className="mr-2 w-4 h-4" />
                GitHub
              </a>
              <a
                href={contactInfo.linkedin}
                className="flex items-center text-[#98c1d9] hover:text-[#e0fbfc] transition-colors"
                target="_blank"
              >
                <Linkedin className="mr-2 w-4 h-4" />
                LinkedIn
              </a>
              <div className="flex items-center text-[#98c1d9]">
                <MapPin className="mr-2 w-4 h-4" />
                {contactInfo.location}
              </div>
              <div className="mt-4">
                <iframe
                  title={`${contactInfo.location} Map`}
                  src={contactInfo.mapEmbedUrl}
                  width="100%"
                  height="160"
                  style={{
                    border: "2px solid #98c1d9",
                    borderRadius: "0.75rem",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </>
        );

      case "contact-form":
        return (
          <>
            <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">
              {data.title}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#98c1d9] text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-[#3d5a80] border border-[#98c1d9] rounded-lg text-[#e0fbfc] placeholder-[#98c1d9]/60 focus:outline-none focus:border-[#e0fbfc] focus:ring-1 focus:ring-[#e0fbfc] transition-colors"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[#98c1d9] text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-[#3d5a80] border border-[#98c1d9] rounded-lg text-[#e0fbfc] placeholder-[#98c1d9]/60 focus:outline-none focus:border-[#e0fbfc] focus:ring-1 focus:ring-[#e0fbfc] transition-colors resize-none"
                  placeholder="Your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm font-medium">{error}</div>
              )}
              {success && (
                <div className="text-green-400 text-sm font-medium">
                  {success}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#98c1d9] text-[#293241] rounded-lg hover:bg-[#e0fbfc] hover:text-[#3d5a80] transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!isFormValid || submitting}
              >
                {submitting ? "Sending..." : "Connect"}
              </button>
            </form>
          </>
        );

      case "machine-coding":
        return (
          <>
            <div className="flex justify-between flex-col h-full">
              <div>
                <h2 className="text-2xl font-bold text-[#e0fbfc] mb-4 tracking-tight">
                  {data.title}
                </h2>
                <p className="text-[#e0fbfc] leading-relaxed mb-4">
                  {data.content.description}
                </p>
              </div>
              <div>
                <a
                  href={data.content.routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 px-5 py-3 text-sm bg-[#98c1d9] text-[#293241] rounded-lg hover:bg-[#e0fbfc] hover:text-[#3d5a80] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="mr-2 w-5 h-5" />
                  {data.content.buttonText}
                </a>
              </div>
            </div>
          </>
        );

      default:
        return <div>Unknown card type</div>;
    }
  };

  const getColSpanClass = (colSpan: number) => {
    switch (colSpan) {
      case 2:
        return "md:col-span-2";
      case 3:
        return "md:col-span-3";
      default:
        return "";
    }
  };

  return (
    <div
      className={`bento-card bg-[#293241] rounded-2xl ${
        data.type === "profile" ? "p-4" : "p-6"
      } border border-[#98c1d9] ${getColSpanClass(data.colSpan)} ${
        data.className || ""
      }`}
    >
      {data.type === "profile" ? (
        <div className="flex items-center justify-center">
          {renderCardContent()}
        </div>
      ) : (
        renderCardContent()
      )}
    </div>
  );
};

export default function PortfolioClientSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [experienceYears, setExperienceYears] = useState(3);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateExperience = () => {
      const startDate = new Date("2021-09-01");
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
      const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
      return diffYears;
    };

    setExperienceYears(calculateExperience());
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    const initAnimations = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".bento-card");

        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
            scale: 0.95,
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
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    };

    initAnimations();

    return () => {
      if (typeof window !== "undefined") {
        gsap.killTweensOf(cardsRef.current);
        gsap.killTweensOf(heroRef.current);
      }
    };
  }, [isMounted, isLoading]);

  if (!isMounted || isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#293241] via-[#3d5a80] to-[#98c1d9]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div
          ref={heroRef}
          className="flex flex-col items-center justify-center lg:min-h-[70vh] text-center space-y-8"
        >
          <div className="space-y-8 mt-20 mb-14">
            <h1 className="text-5xl lg:text-9xl font-black text-[#e0fbfc] tracking-tight leading-none">
              <span className="bg-gradient-to-r from-[#98c1d9] via-[#e0fbfc] to-[#98c1d9] bg-clip-text text-transparent">
                Ankit Mangal
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 lg:w-36 h-0.5 bg-gradient-to-r from-transparent to-[#98c1d9] rounded-full"></div>
              <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-[#98c1d9] tracking-tight">
                Frontend Developer
              </h2>
              <div className="w-16 lg:w-36 h-0.5 bg-gradient-to-l from-transparent to-[#98c1d9] rounded-full"></div>
            </div>

            <p className="text-base tracking-wider md:text-xl lg:text-2xl text-[#e0fbfc]/90 max-w-64 lg:max-w-full mx-auto">
              I shape imaginations into functional UIs on Web!
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Bento Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {bentoCardsData.map((cardData) => (
            <BentoCard
              key={cardData.id}
              data={cardData}
              experienceYears={experienceYears}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-[#e0fbfc]/80">© 2025 Built with ❤️ by Ankit Mangal.</p>
      </footer>
    </div>
  );
}
