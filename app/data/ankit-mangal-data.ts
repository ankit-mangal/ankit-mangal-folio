import { BentoCardData } from "@/types";

export const bentoCardsData: BentoCardData[] = [
    {
      id: "profile",
      type: "profile",
      colSpan: 1,
      content: {
        imageSrc: "/ankit dp.jpeg",
        alt: "Ankit - Frontend Developer",
        objectPosition: "center 39%",
      },
    },
    {
      id: "about",
      type: "about",
      colSpan: 1,
      title: "About Me",
      content: {
        description:
          "A passionate frontend developer with {experienceYears}+ years of expertise crafting high-performance web applications. I specialize in React, Next.js, and TypeScript, delivering scalable solutions that drive business growth.",
        resumeUrl:
          "https://drive.google.com/file/d/1KL-bY37JYHDp0YIa7WxepeYgtTn3NBjX/view?usp=drive_link",
        resumeText: "View Resume",
      },
    },
    {
      id: "education",
      type: "education",
      colSpan: 1,
      title: "Education",
      content: {
        degree: {
          title: "Bachelor of Technology",
          field: "Computer Engineering",
          institution:
            "Bharati Vidyapeeth Deemed University College of Engineering",
          details: "Pune | CGPA: 7.9 | 2017–2021",
        },
        certifications: ["AWS Cloud Practitioner (85%)"],
      },
    },
    {
      id: "experience",
      type: "experience",
      colSpan: 2,
      title: "Work Experience",
      content: {
        experiences: [
          {
            company: "QUOPPO VENTURES PVT. LTD.",
            position: "Frontend Developer",
            duration: "Nov 2024 – Present",
            location: "Pune, India",
            companyUrl: "https://www.linkedin.com/company/quoppo/",
            projects: [
              {
                name: "Menyala AI Copilot",
                description:
                  "At Menyala AI Copilot, I led a team of three developers in migrating the codebase from React to Next.js, improving page load times by 30%, performance by 25%, and reducing bug reports by 40%. I introduced Agile methodologies across the team, increasing delivery speed by 30% and minimizing post-release bugs. Additionally, I overhauled the UI with Tailwind CSS and Next.js to improve user research efficiency by 10%, and conducted performance-focused code reviews that elevated team-wide code quality by 20%.",
              },
              {
                name: "HeartFocus by Deski",
                description:
                  "As the sole frontend contributor for HeartFocus, I rebuilt the complete portal UI using React and Tailwind CSS, reducing onboarding time by 50% and modernizing the UX. I integrated Stripe for secure license transactions, enhanced form validation to cut security risks by 30%, and collaborated closely with backend developers to speed up delivery by 40% while maintaining clean, maintainable code.",
              },
            ],
          },
          {
            company: "EPAM SYSTEMS",
            position: "Software Engineer L1 – Frontend",
            duration: "Feb 2022 – Dec 2024",
            location: "Pune, India",
            companyUrl: "https://www.linkedin.com/company/epam-systems/",
            projects: [
              {
                name: "",
                description:
                  "At EPAM, I contributed to 6+ enterprise applications in diverse domains like fashion, education, and insurance. My work included optimizing brand sites like Victoria's Secret, H&M, and Alo Yoga, resulting in performance gains of up to 30%. I ensured 100% bug-free, test-covered code and helped ship two product releases. Additionally, I implemented Arabic font support using Base64 encoding and worked with modern frontend stacks including React, TypeScript, GraphQL, Redux, and MongoDB.",
              },
            ],
          },
          {
            company: "CAPGEMINI",
            position: "Analyst",
            duration: "July 2021 – Jan 2022",
            location: "Bangalore, India",
            companyUrl: "https://www.linkedin.com/company/capgemini/",
            projects: [
              {
                name: "",
                description:
                  "At Capgemini, I underwent intensive training in JavaScript, React, and cloud architecture fundamentals. I earned my AWS Cloud Practitioner certification with an 85% score, establishing a solid foundation in cloud services and frontend engineering best practices.",
              },
            ],
          },
        ],
      },
    },
    {
      id: "skills",
      type: "skills",
      colSpan: 1,
      title: "Skills",
      content: {
        categories: [
          {
            category: "Languages",
            skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
          },
          {
            category: "Frameworks & Libraries",
            skills: [
              "React.js",
              "Redux",
              "Next.js",
              "Material UI",
              "Tailwind CSS",
              "Radix UI",
              "Zustand",
              "Jest",
              "React Testing Library",
              "Formik",
            ],
          },
          {
            category: "Tools & Platforms",
            skills: [
              "Git",
              "GitHub",
              "Vite",
              "Vercel",
              "Netlify",
              "JIRA",
              "Docker",
              "Jenkins",
              "AWS",
              "Firebase",
              "Clerk",
            ],
          },
        ],
      },
    },
    {
      id: "projects",
      type: "projects",
      colSpan: 1,
      title: "Projects",
      content: {
        githubUrl: "https://www.github.com/ankit-mangal",
        projects: [
          {
            name: "Wisepenny",
            description:
              "Expenses and Income Manager built with React, Redux, Chart.js, and Tailwind CSS.",
            technologies: ["React", "Redux", "JavaScript", "Tailwind"],
            url: "https://wisepenny.netlify.app/",
          },
          {
            name: "Weather App",
            description:
              "A weather app built with React, TypeScript, and Tailwind CSS that allows users to search for weather information by city name.",
            technologies: ["React", "Tailwind", "OpenWeatherMap API"],
            url: "https://weather-app-sigmadev.vercel.app/",
          },
        ],
      },
    },
    {
      id: "machine-coding",
      type: "machine-coding",
      colSpan: 1,
      title: "Machine Coding Questions",
      content: {
        description:
          "A collection of real-world machine coding problems I've solved. Each question includes my approach, solution, and key insights—designed to help developers understand both the 'what' and the 'why' behind the code.",
        buttonText: "See All Questions",
        routeUrl: "/machine-coding",
      },
    },
    {
      id: "contact",
      type: "contact",
      colSpan: 1,
      title: "Get In Touch",
      content: {
        email: "mangalankit843@gmail.com",
        github: "https://github.com/ankit-mangal",
        linkedin: "https://www.linkedin.com/in/ankit-0725/",
        location: "Gwalior, India",
        mapEmbedUrl:
          "https://www.google.com/maps?q=Gwalior,India&z=12&output=embed",
      },
    },
    {
      id: "contact-form",
      type: "contact-form",
      colSpan: 1,
      title: "Contact Form",
    },
  ];