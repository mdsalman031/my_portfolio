import { useState } from "react";
import Section from "../common/Section";
import { RESUME } from "../../data/portfolioData";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const links = [
    { label: "Email", value: RESUME.email, href: `mailto:${RESUME.email}`, icon: "📧", color: "#00f5d4" },
    { label: "GitHub", value: RESUME.github, href: `https://${RESUME.github}`, icon: "🐙", color: "#f72585" },
    { label: "LinkedIn", value: RESUME.linkedin, href: `https://${RESUME.linkedin}`, icon: "💼", color: "#7209b7" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectRaw = `Portfolio Inquiry from ${form.name}`;
    const bodyRaw =
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    ;

    const subject = encodeURIComponent(subjectRaw);
    const body = encodeURIComponent(bodyRaw);
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      RESUME.email
    )}&su=${subject}&body=${body}`;

    try {
      window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.location.href = `mailto:${RESUME.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Section id="contact" label="MISSION 05" name="Contact" icon="📡">
      <div style={{ maxWidth: "700px" }}>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "17px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.8,
            marginBottom: "48px",
          }}
        >
          Open to internships, collaborations, and cool projects. Whether you have a mission briefing or just want to say hey — I'm online.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${link.color}25`,
                borderRadius: "12px",
                padding: "18px 20px",
                textDecoration: "none",
                transition: "all 0.3s",
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${link.color}08`;
                e.currentTarget.style.borderColor = `${link.color}60`;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = `${link.color}25`;
                e.currentTarget.style.transform = "none";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{link.icon}</span>
              <div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "10px", color: link.color, letterSpacing: "2px", marginBottom: "2px" }}>
                  {link.label}
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
                  {link.value}
                </div>
              </div>
            </a>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "28px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,245,212,0.18)",
            borderRadius: "14px",
            padding: "22px",
            display: "grid",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "#00f5d4",
              marginBottom: "4px",
            }}
          >
            QUICK MESSAGE
          </div>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={{
              background: "rgba(5,5,15,0.85)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "12px 14px",
              color: "#fff",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "12px",
              outline: "none",
            }}
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            style={{
              background: "rgba(5,5,15,0.85)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "12px 14px",
              color: "#fff",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "12px",
              outline: "none",
            }}
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={5}
            required
            style={{
              resize: "vertical",
              minHeight: "120px",
              background: "rgba(5,5,15,0.85)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              padding: "12px 14px",
              color: "#fff",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "12px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              justifySelf: "start",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "12px",
              letterSpacing: "2px",
              padding: "12px 18px",
              background: "linear-gradient(135deg, #00f5d4, #7209b7)",
              border: "none",
              borderRadius: "8px",
              color: "#000",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </Section>
  );
}
