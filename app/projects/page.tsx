import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Globe, Code, Database, Zap, Shield } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, and admin dashboard.",
      longDescription: "This comprehensive e-commerce platform was built from the ground up to provide a seamless shopping experience. The project includes advanced features like real-time inventory management, order tracking, and analytics dashboard. The frontend is built with React and Next.js for optimal performance, while the backend uses Node.js with Express and MongoDB for data persistence.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Redux"],
      image: "/ecommerce-preview.jpg",
      githubUrl: "https://github.com/ankit/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Order management and tracking",
        "Admin dashboard for inventory",
        "Responsive design for all devices"
      ],
      challenges: "Implementing real-time inventory updates and ensuring secure payment processing while maintaining fast page load times.",
      solutions: "Used WebSocket connections for real-time updates and implemented proper error handling and validation for payment processing."
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Real-time analytics dashboard with interactive charts and data visualization. Provides insights into user behavior, sales metrics, and performance indicators.",
      longDescription: "This analytics dashboard was designed to provide comprehensive insights into business metrics and user behavior. The application processes large datasets in real-time and presents them through interactive charts and graphs. The dashboard includes customizable widgets, export functionality, and role-based access control.",
      technologies: ["React", "D3.js", "TypeScript", "Chart.js", "Node.js", "PostgreSQL", "Socket.io"],
      image: "/analytics-preview.jpg",
      githubUrl: "https://github.com/ankit/analytics-dashboard",
      liveUrl: "https://analytics-demo.vercel.app",
      features: [
        "Real-time data visualization",
        "Interactive charts and graphs",
        "Customizable dashboard widgets",
        "Data export functionality",
        "Role-based access control",
        "Mobile responsive design",
        "Performance optimization"
      ],
      challenges: "Handling large datasets efficiently and creating smooth animations for real-time updates.",
      solutions: "Implemented data virtualization for large datasets and used Web Workers for background processing to maintain UI responsiveness."
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
      longDescription: "This task management application enables teams to collaborate effectively on projects. Features include real-time updates, file sharing, time tracking, and progress monitoring. The app supports multiple project views including Kanban boards, Gantt charts, and list views.",
      technologies: ["React", "TypeScript", "Socket.io", "Express", "MongoDB", "JWT", "Tailwind CSS"],
      image: "/task-app-preview.jpg",
      githubUrl: "https://github.com/ankit/task-management",
      liveUrl: "https://task-app-demo.vercel.app",
      features: [
        "Real-time collaboration",
        "Multiple project views",
        "File sharing and attachments",
        "Time tracking and reporting",
        "Team member management",
        "Notification system",
        "Mobile app support"
      ],
      challenges: "Implementing real-time collaboration features while maintaining data consistency across multiple users.",
      solutions: "Used WebSocket connections with conflict resolution strategies and implemented optimistic UI updates for better user experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Portfolio
        </Link>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            My Projects
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in frontend development, 
            problem-solving, and creating exceptional user experiences.
          </p>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:bg-white/10 transition-all duration-300 overflow-hidden">
              {/* Project Header */}
              <div className="p-6 border-b border-cyan-500/20">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{project.title}</h2>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 rounded-lg transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-cyan-600/30 text-cyan-200 rounded-full text-sm border border-cyan-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Long Description */}
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2">Overview</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.longDescription}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-300 text-sm">
                          <Zap className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-2">Challenges</h3>
                      <p className="text-gray-300 text-sm">{project.challenges}</p>
                    </div>
                    <div>
                      <h3 className="text-cyan-400 font-semibold mb-2">Solutions</h3>
                      <p className="text-gray-300 text-sm">{project.solutions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-400">
          © 2024 Ankit. Built with Next.js, TypeScript, and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
} 