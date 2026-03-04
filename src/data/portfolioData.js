export const XP_PER_LEVEL = 200;
export const MAX_LEVEL = 10;

export const RESUME = {
  name: "MD Salman",
  title: "Full-Stack Developer & CS Student",
  tagline: "Turning caffeine into clean code since 2021",
  phone: "+91 6304694529",
  email: "031mdsalman@gmail.com",
  github: "github.com/mdsalman031",
  linkedin: "linkedin.com/in/mdsalman315/",
  education: [
    {
      degree: "B.E. in Computer Science",
      institution: "CBIT, Gandipet, Hyderabad",
      period: "2024–2027",
      gpa: "9.5 / 10",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "GPT Hyderabad, Masabtank",
      period: "2021–2024",
      gpa: "9.97 / 10",
    },
  ],
  courses: [
    "Data Structures",
    "Algorithm Analysis",
    "OOP",
    "Software Engineering",
    "DBMS",
    "Computer Networks",
    "Operating Systems",
    "Computer Architecture",
  ],
  projects: [
    {
      name: "VidNote.AI",
      subtitle: "AI-Powered Video Learning Assistant",
      description:
        "Built an AI-driven platform that converts YouTube lectures into structured learning material including notes, quizzes, flashcards, and key frames. Integrated transcript extraction, GenAI-based content generation, and a contextual chatbot for Q&A.",
      tech: ["React.js", "Tailwind CSS", "FastAPI", "Python", "Whisper", "Together.ai", "Google Forms API"],
      github: "#",
      highlight: "Best Project Award",
      color: "#00f5d4",
    },
    {
      name: "College Website",
      subtitle: "Full-Stack Institutional Platform",
      description:
        "Developed a user-friendly college website from scratch using React.js and Bootstrap. Integrated event calendars, portals, and social media links with a Node.js + MongoDB backend.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      github: "#",
      color: "#f72585",
    },
    {
      name: "The Book Bazaar",
      subtitle: "Dynamic Book Catalog System",
      description:
        "Built a dynamic book catalog with search, inventory management, ratings, and secure login using React.js and FastAPI with SQLite.",
      tech: ["React.js", "FastAPI", "SQLite"],
      github: "#",
      highlight: "Best Project – CBIT Bootcamp 2024",
      color: "#7209b7",
    },
  ],
  skills: [
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 88, category: "Languages" },
    { name: "Python", level: 82, category: "Languages" },
    { name: "Node.js", level: 78, category: "Backend" },
    { name: "Java", level: 80, category: "Languages" },
    { name: "C++", level: 75, category: "Languages" },
    { name: "FastAPI", level: 76, category: "Backend" },
    { name: "MongoDB", level: 74, category: "Databases" },
    { name: "MySQL", level: 72, category: "Databases" },
    { name: "Git/GitHub", level: 85, category: "Tools" },
    { name: "Tailwind CSS", level: 88, category: "Frontend" },
    { name: "Express.js", level: 75, category: "Backend" },
  ],
  achievements: [
    {
      id: "mongo",
      icon: "🍃",
      title: "MongoDB Associate Developer",
      year: "2025",
      rarity: "Rare",
      color: "#00ed64",
    },
    {
      id: "oracle",
      icon: "☁️",
      title: "Oracle Cloud AI Foundations",
      year: "2025",
      rarity: "Rare",
      color: "#f80000",
    },
    {
      id: "nptel",
      icon: "☕",
      title: "NPTEL Java – Elite+Silver (Top 2%)",
      year: "2024",
      rarity: "Epic",
      color: "#f5a623",
    },
    {
      id: "bestproject",
      icon: "🏆",
      title: "Best Project – CBIT Bootcamp",
      year: "2024",
      rarity: "Legendary",
      color: "#ffd700",
    },
    {
      id: "leetcode",
      icon: "⚡",
      title: "270+ LeetCode Problems Solved",
      year: "2024",
      rarity: "Epic",
      color: "#f5a623",
    },
  ],
};

export const MISSIONS = [
  { id: "about", label: "MISSION 01", name: "About", icon: "👤", xpReward: 30 },
  { id: "skills", label: "MISSION 02", name: "Skills", icon: "🛠", xpReward: 40 },
  { id: "projects", label: "MISSION 03", name: "Projects", icon: "🚀", xpReward: 50 },
  { id: "achievements", label: "MISSION 04", name: "Achievements", icon: "🏆", xpReward: 35 },
  { id: "contact", label: "MISSION 05", name: "Contact", icon: "📡", xpReward: 25 },
];

export const LEVEL_TITLES = [
  "Rookie Dev",
  "Code Apprentice",
  "Bug Hunter",
  "Stack Overflow Addict",
  "Function Wizard",
  "Algorithm Knight",
  "Framework Sage",
  "Architecture Lord",
  "10x Engineer",
  "Full-Stack Legend",
];

export const RARITY_COLORS = {
  Rare: "#4cc9f0",
  Epic: "#f5a623",
  Legendary: "#ffd700",
};
