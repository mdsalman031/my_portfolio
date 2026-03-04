import { useState } from "react";
import { MISSIONS } from "../../data/portfolioData";

export default function Nav({ active, onNav, unlockedMissions }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 900,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        className="nav-desktop"
      >
        {MISSIONS.map((m) => (
          <button
            key={m.id}
            onClick={() => onNav(m.id)}
            title={m.name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: active === m.id ? "2px solid #00f5d4" : "2px solid rgba(255,255,255,0.1)",
              background: active === m.id ? "rgba(0,245,212,0.15)" : "rgba(255,255,255,0.03)",
              color: active === m.id ? "#00f5d4" : "rgba(255,255,255,0.4)",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: active === m.id ? "0 0 16px rgba(0,245,212,0.5)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unlockedMissions.has(m.id) ? m.icon : "🔒"}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          top: "52px",
          right: "16px",
          zIndex: 950,
          background: "rgba(0,245,212,0.1)",
          border: "1px solid rgba(0,245,212,0.3)",
          color: "#00f5d4",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "18px",
          display: "none",
        }}
        className="nav-mobile-btn"
      >
        ☰
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "16px",
            background: "rgba(5,5,15,0.97)",
            border: "1px solid rgba(0,245,212,0.2)",
            borderRadius: "12px",
            padding: "12px",
            zIndex: 949,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                onNav(m.id);
                setOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: "#00f5d4",
                cursor: "pointer",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "13px",
                padding: "6px 12px",
                textAlign: "left",
              }}
            >
              {m.icon} {m.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
