export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  metrics: string;
  github: string;
  demo: string;
  image: string;
  color: string;
}

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'devops' | 'aiml';
  proficiency: number;
  years: number;
  color: string;
  details: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
  color: string;
}

export interface CodingProfile {
  name: string;
  username: string;
  rating: string;
  stat: string;
  color: string;
  url: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Deep Fake Voice Detection",
    category: "AI / Machine Learning",
    description: "ML model to detect AI-generated fake voices using audio features like pitch and frequency patterns.",
    longDescription: "Developed a machine learning model to detect AI-generated fake voices using audio features like pitch and frequency patterns. Trained on the ASVspoof dataset to improve accuracy and prevent voice-based fraud. Applied preprocessing, feature engineering, and robust evaluation metrics for high classification accuracy, helping secure voice authentication systems.",
    tech: ["Python", "Machine Learning", "ASVspoof Dataset", "Audio Processing", "Scikit-learn"],
    metrics: "ASVspoof dataset trained",
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    color: "#d6d6d6"
  },
  {
    id: 2,
    title: "Let's Socialize",
    category: "Frontend / React",
    description: "Social media platform that can be used to interaction between the all peoples.",
    longDescription: "A social media platform designed for seamless interaction and communication between people globally. Built using React.js with features like posts, stories, and user suggestions. Implemented state management and client-side routing for a smooth user experience, with a responsive mobile-first design.",
    tech: ["React.js", "JavaScript", "React Router DOM", "JSON Server", "CSS", "Bootstrap"],
    metrics: "Full social media feature set",
    github: "https://github.com/Raja-r-art/FSD-practical.git",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    color: "#8f8f8f"
  },
  {
    id: 3,
    title: "Vitamin D Deficiency Prediction",
    category: "Data Science / ML",
    description: "ML model predicting Vitamin D deficiency using patient health data and feature engineering.",
    longDescription: "Created a machine learning model to predict Vitamin D deficiency using patient health data. Applied preprocessing, feature engineering, and evaluation for accurate predictions. The system helps healthcare providers identify at-risk patients early, enabling preventative care through data-driven decision making using Pandas, NumPy, and Scikit-learn.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Seaborn", "Matplotlib"],
    metrics: "Accurate deficiency prediction",
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
    color: "#ffffff"
  },
  {
    id: 4,
    title: "Movie Streaming Platform",
    category: "Full Stack / MERN",
    description: "Full-stack movie streaming app with auth, browsing, search, and responsive UI using MERN stack.",
    longDescription: "Developed a full-stack movie streaming application using MongoDB, Express.js, React, and Node.js. Implemented user authentication with JWT, movie browsing, search functionality, and a fully responsive UI. Features include movie catalog browsing, user authentication, search and filter capabilities, and RESTful API architecture.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth", "REST API"],
    metrics: "Full MERN stack deployed",
    github: "https://github.com",
    demo: "https://demo.com",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    color: "#9c9c9c"
  }
];

export const skillsData: Skill[] = [
  // Languages
  { name: "C", category: "languages", proficiency: 82, years: 3, color: "#f0f0f0", details: "Pointers, memory management, structured programming" },
  { name: "C++", category: "languages", proficiency: 80, years: 3, color: "#d6d6d6", details: "OOP, STL, DSA implementations, competitive coding" },
  { name: "Python", category: "languages", proficiency: 84, years: 2, color: "#bdbdbd", details: "Data science, ML models, automation, scripting" },
  { name: "Java", category: "languages", proficiency: 72, years: 2, color: "#a8a8a8", details: "OOP fundamentals, data structures, algorithms" },
  { name: "JavaScript", category: "languages", proficiency: 86, years: 2, color: "#9a9a9a", details: "ES6+, async/await, DOM manipulation, APIs" },

  // Frontend
  { name: "React.js", category: "frontend", proficiency: 84, years: 1, color: "#d0d0d0", details: "Hooks, state management, routing, component design" },
  { name: "HTML & CSS", category: "frontend", proficiency: 90, years: 3, color: "#b8b8b8", details: "Semantic HTML5, Flexbox, Grid, responsive design" },
  { name: "Bootstrap", category: "frontend", proficiency: 80, years: 1, color: "#a0a0a0", details: "Responsive components, utility classes, grid system" },
  { name: "React Router DOM", category: "frontend", proficiency: 78, years: 1, color: "#888888", details: "Client-side routing, nested routes, navigation" },

  // Backend
  { name: "Node.js / Express.js", category: "backend", proficiency: 78, years: 1, color: "#b5b5b5", details: "REST APIs, middleware, authentication, CRUD" },
  { name: "MongoDB", category: "backend", proficiency: 75, years: 1, color: "#a3a3a3", details: "NoSQL, CRUD operations, schema design, Mongoose" },
  { name: "JSON Server", category: "backend", proficiency: 80, years: 1, color: "#909090", details: "Mock REST APIs, rapid prototyping, client development" },

  // DevOps / Tools
  { name: "Git & GitHub", category: "devops", proficiency: 86, years: 2, color: "#c7c7c7", details: "Version control, branching, collaboration workflows" },
  { name: "AWS (EC2 / Amplify)", category: "devops", proficiency: 65, years: 0, color: "#aaaaaa", details: "Cloud deployment, hosting, basic infrastructure" },
  { name: "VS Code / Figma", category: "devops", proficiency: 90, years: 2, color: "#9c9c9c", details: "IDE proficiency, UI design, prototyping tools" },

  // AI / ML
  { name: "Machine Learning", category: "aiml", proficiency: 78, years: 1, color: "#ffffff", details: "Supervised learning, classification, regression models" },
  { name: "Pandas & NumPy", category: "aiml", proficiency: 80, years: 1, color: "#e0e0e0", details: "Data manipulation, numerical computation, EDA" },
  { name: "Seaborn & Matplotlib", category: "aiml", proficiency: 75, years: 1, color: "#c0c0c0", details: "Data visualization, statistical plots, charts" },
  { name: "DSA & OOPS", category: "aiml", proficiency: 82, years: 2, color: "#a0a0a0", details: "Algorithms, data structures, OOP design patterns" },
];

export const experienceData: Experience[] = [
  {
    id: 1,
    role: "MERN Stack Developer Intern",
    company: "Better Tomorrow",
    period: "Dec 2025 – Jan 2026",
    description: [
      "Built and deployed full-stack web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Implemented authentication, CRUD operations, and RESTful APIs for production-level features.",
      "Deployed applications on AWS (EC2 / Amplify) for cloud hosting.",
      "Used Git and GitHub for version control and team collaboration."
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "AWS", "Git"],
    color: "#d6d6d6"
  }
];

export const codingProfilesData: CodingProfile[] = [
  {
    name: "LeetCode",
    username: "RbFmJlWxSR",
    rating: "130+ Problems Solved",
    stat: "Global Rank: 1,221,715",
    color: "#f0f0f0",
    url: "https://leetcode.com/u/RbFmJlWxSR/",
    icon: "code"
  },
  {
    name: "SkillRack",
    username: "raja_r",
    rating: "560+ Problems Solved",
    stat: "3 Certificates | 80+ Bronze Badges",
    color: "#b0b0b0",
    url: "https://skillrack.com",
    icon: "award"
  }
];

export const socialLinksData: SocialLink[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/raja-r-806b0a331", icon: "linkedin", color: "#cfcfcf" },
  { name: "GitHub", url: "https://github.com/Raja-r-art", icon: "github", color: "#ffffff" },
  { name: "Instagram", url: "https://www.instagram.com/_r_a_j_a_2710?igsh=cnV1YzIzaWt6ejVn", icon: "instagram", color: "#a8a8a8" },
  { name: "YouTube", url: "https://youtube.com", icon: "youtube", color: "#8a8a8a" },
  { name: "Twitter/X", url: "https://x.com", icon: "twitter", color: "#bdbdbd" }
];
