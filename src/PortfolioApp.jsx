import { useCallback, useEffect, useState } from "react";
import { LEVEL_TITLES, MAX_LEVEL, MISSIONS, XP_PER_LEVEL } from "./data/portfolioData";
import { getLevel } from "./utils/gameUtils";
import Confetti from "./components/common/Confetti";
import XPBar from "./components/common/XPBar";
import Nav from "./components/common/Nav";
import Toast from "./components/common/Toast";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import AchievementsSection from "./components/sections/AchievementsSection";
import ContactSection from "./components/sections/ContactSection";
import globalStyles from "./styles/globalStyles";

export default function PortfolioApp() {
  const [xp, setXp] = useState(() => {
    try {
      return parseInt(localStorage.getItem("portfolio_xp") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [level, setLevel] = useState(() => getLevel(parseInt(localStorage.getItem("portfolio_xp") || "0", 10)));
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedMissions, setUnlockedMissions] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_missions");
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });
  const [toast, setToast] = useState({ message: "", visible: false });
  const [activeSection, setActiveSection] = useState("hero");
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_xp", String(xp));
    } catch {}

    const newLevel = getLevel(xp);
    if (newLevel > level) {
      setLevel(newLevel);
      setShowConfetti(true);
      showToast(`🎉 LEVEL UP! You are now Level ${newLevel} — ${LEVEL_TITLES[newLevel - 1]}`);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [xp, level]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_missions", JSON.stringify([...unlockedMissions]));
    } catch {}
  }, [unlockedMissions]);

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const addXp = useCallback((amount) => {
    setXp((prev) => Math.min(prev + amount, XP_PER_LEVEL * MAX_LEVEL));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulated = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      accumulated += delta;
      if (accumulated >= 150) {
        addXp(1);
        accumulated = 0;
      }

      const sections = ["hero", ...MISSIONS.map((m) => m.id)];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [addXp]);

  useEffect(() => {
    const observers = MISSIONS.map((mission) => {
      const el = document.getElementById(mission.id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !unlockedMissions.has(mission.id)) {
            setUnlockedMissions((prev) => new Set([...prev, mission.id]));
            addXp(mission.xpReward);
            showToast(`✦ ${mission.name} unlocked! +${mission.xpReward} XP`);
          }
        },
        { threshold: 0.3 }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, [addXp, showToast, unlockedMissions]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBegin = () => scrollTo("about");

  return (
    <>
      <style>{globalStyles}</style>

      <Confetti active={showConfetti} />
      <XPBar xp={xp} />
      <Nav active={activeSection} onNav={scrollTo} unlockedMissions={unlockedMissions} />
      <Toast message={toast.message} visible={toast.visible} />

      <button
        onClick={() => setSoundOn((v) => !v)}
        title={soundOn ? "Sound On" : "Sound Off"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 900,
          background: "rgba(0,245,212,0.08)",
          border: "1px solid rgba(0,245,212,0.2)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          cursor: "pointer",
          color: "#00f5d4",
          transition: "all 0.2s",
        }}
      >
        {soundOn ? "🔊" : "🔇"}
      </button>

      <button
        onClick={() => {
          setXp(0);
          setLevel(1);
          setUnlockedMissions(new Set());
          try {
            localStorage.removeItem("portfolio_xp");
            localStorage.removeItem("portfolio_missions");
          } catch {}
          showToast("XP reset. Begin your journey again.");
        }}
        title="Reset XP"
        style={{
          position: "fixed",
          bottom: "76px",
          right: "24px",
          zIndex: 900,
          background: "rgba(247,37,133,0.08)",
          border: "1px solid rgba(247,37,133,0.2)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          cursor: "pointer",
          color: "#f72585",
          transition: "all 0.2s",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        ↺
      </button>

      <main>
        <HeroSection onBegin={handleBegin} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection unlockedMissions={unlockedMissions} />
        <ContactSection />

        <footer
          style={{
            textAlign: "center",
            padding: "40px 24px",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          MD SALMAN © 2026 — Built with React + Tailwind + ❤️
          <br />
          <span style={{ color: "#00f5d4", opacity: 0.5 }}>
            You have earned {xp} XP — Level {getLevel(xp)} {LEVEL_TITLES[getLevel(xp) - 1]}
          </span>
        </footer>
      </main>
    </>
  );
}
