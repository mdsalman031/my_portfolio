import { useEffect, useRef, useState } from "react";

export default function Section({ id, children, label, name, icon }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        minHeight: "100vh",
        padding: "120px 24px 80px",
        maxWidth: "1100px",
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div style={{ marginBottom: "60px" }}>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            color: "#f72585",
            letterSpacing: "4px",
            marginBottom: "8px",
          }}
        >
          {label} — {icon}
        </div>
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "12px",
            letterSpacing: "-1px",
          }}
        >
          {name}
        </h2>
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "linear-gradient(90deg, #00f5d4, #7209b7)",
            borderRadius: "2px",
          }}
        />
      </div>
      {children}
    </section>
  );
}
