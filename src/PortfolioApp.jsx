import { useCallback, useEffect, useRef, useState } from "react";
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
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem("portfolio_sound") === "on";
    } catch {
      return false;
    }
  });
  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    async (frequency, duration = 0.1, type = "sine", volume = 0.07) => {
      if (!soundOn) return;
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch {
          return;
        }
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    },
    [getAudioContext, soundOn]
  );

  const playPattern = useCallback(
    async (notes) => {
      for (const note of notes) {
        // eslint-disable-next-line no-await-in-loop
        await playTone(note.f, note.d, note.t, note.v);
        // tiny separation between notes
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, (note.d || 0.1) * 1000 * 0.7));
      }
    },
    [playTone]
  );

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const addXp = useCallback((amount) => {
    setXp((prev) => Math.min(prev + amount, XP_PER_LEVEL * MAX_LEVEL));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_xp", String(xp));
    } catch {}

    const newLevel = getLevel(xp);
    if (newLevel > level) {
      setLevel(newLevel);
      setShowConfetti(true);
      showToast(`🎉 LEVEL UP! You are now Level ${newLevel} — ${LEVEL_TITLES[newLevel - 1]}`);
      playPattern([
        { f: 523, d: 0.08, t: "triangle", v: 0.04 },
        { f: 659, d: 0.08, t: "triangle", v: 0.04 },
        { f: 784, d: 0.12, t: "triangle", v: 0.05 },
      ]);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [level, playPattern, showToast, xp]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_missions", JSON.stringify([...unlockedMissions]));
    } catch {}
  }, [unlockedMissions]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio_sound", soundOn ? "on" : "off");
    } catch {}
  }, [soundOn]);

  useEffect(() => {
    if (!soundOn) return undefined;

    const onPointerDown = async () => {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch {}
      }
    };

    const onDocumentClick = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const clickable = target.closest("button, a, [role='button']");
      if (!clickable) return;
      playTone(520, 0.045, "triangle", 0.04);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("click", onDocumentClick);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onDocumentClick);
    };
  }, [getAudioContext, playTone, soundOn]);

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
            playTone(660, 0.09, "square", 0.06);
          }
        },
        { threshold: 0.3 }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, [addXp, playTone, showToast, unlockedMissions]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBegin = () => {
    playTone(440, 0.06, "triangle", 0.06);
    scrollTo("about");
  };

  return (
    <>
      <style>{globalStyles}</style>

      <Confetti active={showConfetti} />
      <XPBar xp={xp} />
      <Nav active={activeSection} onNav={scrollTo} unlockedMissions={unlockedMissions} />
      <Toast message={toast.message} visible={toast.visible} />

      <button
        onClick={async () => {
          const next = !soundOn;
          setSoundOn(next);
          if (next) {
            const ctx = getAudioContext();
            if (ctx && ctx.state === "suspended") {
              try {
                await ctx.resume();
              } catch {}
            }
            const nowCtx = getAudioContext();
            if (nowCtx) {
              const now = nowCtx.currentTime;
              const osc = nowCtx.createOscillator();
              const gain = nowCtx.createGain();
              osc.type = "triangle";
              osc.frequency.setValueAtTime(740, now);
              gain.gain.setValueAtTime(0.0001, now);
              gain.gain.exponentialRampToValueAtTime(0.045, now + 0.01);
              gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
              osc.connect(gain);
              gain.connect(nowCtx.destination);
              osc.start(now);
              osc.stop(now + 0.11);
            }
          }
        }}
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
          playTone(180, 0.09, "sawtooth", 0.05);
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
