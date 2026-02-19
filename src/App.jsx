import React, { useEffect, useState } from "react";
import { profile } from "./config";
import "./App.css";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiDocker,
  SiMysql,
  SiSpringboot,
  SiCodeigniter,
  SiPhp,
  SiBootstrap,
  SiFigma,
  SiPostman,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJava, FaGitAlt, FaGithub } from "react-icons/fa";
import PixelTitle from "./components/PixelTitle";
import CertificateModal from "./components/CertificateModal";
import { LiaLinkedin } from "react-icons/lia";

const iconMap = {
  React: <SiReact />,
  JavaScript: <SiJavascript />,
  "HTML/CSS": <FaHtml5 />,
  Tailwind: <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  "Node.js": <SiNodedotjs />,
  Java: <FaJava />,
  "Spring Boot": <SiSpringboot />,
  PHP: <SiPhp />,
  Codeigniter: <SiCodeigniter />,
  MySQL: <SiMysql />,
  PostgreSQL: <SiPostgresql />,
  Git: <FaGitAlt />,
  Docker: <SiDocker />,
  Postman: <SiPostman />,
  Figma: <SiFigma />,
};

const isMobile = window.innerWidth <= 768;
const backgroundPixels = Array.from({ length: isMobile ? 15 : 40 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  size: `${Math.random() * 4 + 2}px`,
}));
function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }, []);
  const [selectedCert, setSelectedCert] = useState(null);
  return (
    <div className="portfolio">
      {/* CAPA DE PÍXELES FANTASMA */}
      {isMobile &&
      <div className="pixel-glitch-bg">
        {backgroundPixels.map((p) => (
          <div
            key={p.id}
            className="pixel-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
      }

      

      <div className="parallax-bg"></div>

      <div className="container">
        {/* HERO */}
        <section className="hero">
          <div className="about-container reveal">
            <PixelTitle text={profile.name} />

            <div className="glass-card">
              <p className="about-text">{profile.about}</p>
            </div>
            {/* <div className="call-to-action">
              <a
                href="/Quiroga_Mauricio_DEV_cv.pdf"
                download="CV_Mauricio_Quiroga.pdf"
                className="btn-perfil"
              >
                <LiaLinkedin size={30}></LiaLinkedin>
              </a>
              <a
                href="/Quiroga_Mauricio_DEV_cv.pdf"
                download="CV_Mauricio_Quiroga.pdf"
                className="btn-download"
              >
                DESCARGAR CV
              </a>
              <a
                href="/Quiroga_Mauricio_DEV_cv.pdf"
                download="CV_Mauricio_Quiroga.pdf"
                className="btn-perfil"
              >
                <FaGithub size={30} />
              </a>
            </div> */}
            <div className="call-to-action">
              <a
                href="https://linkedin.com/in/mauricio-quiroga333"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-perfil"
              >
                <LiaLinkedin size={30} />
              </a>
              <a
                href="/Quiroga_Mauricio_DEV_cv.pdf"
                download="CV_Mauricio_Quiroga.pdf"
                className="btn-download"
              >
                DESCARGAR CV
              </a>
              <a
                href="https://github.com/Mauricio333bit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-perfil"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </section>
        {/* EXPERIENCE */}
        <section id="experience ">
          <h2 className="reveal slider-title ">Experiencia Profesional</h2>
          <div className="grid-cards">
            {profile.experience.map((exp, i) => (
              <div key={i} className="glass-card reveal">
                <span className="date">{exp.date}</span>
                <h3>{exp.role}</h3>
                <h4>
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-link"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h4>
                <p style={{ color: "var(--slate)", fontSize: "0.9rem" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <h2 className="reveal slider-title">Stack Tecnológico</h2>
          <div className="skills-grid reveal">
            {Object.entries(profile.skills).map(([category, techs]) => (
              <div key={category} className="skill-group">
                <h3>{category}</h3>
                <div className="icons-flex">
                  {techs.map((tech) => (
                    <div key={tech} className="icon-item" title={tech}>
                      {iconMap[tech]}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & HONORS */}
        <section id="education">
          <h2 className="reveal slider-title">Formación & Méritos</h2>
          <div className="grid-cards">
            {profile.education.map((edu, i) => (
              <div
                key={i}
                className="glass-card reveal"
                style={{ borderLeft: "4px solid var(--accent)" }}
              >
                <h3>{edu.title}</h3>
                <p>
                  {edu.place} | {edu.period}
                </p>
                {edu.honors && (
                  <p style={{ color: "gold", fontSize: "0.8rem" }}>
                    ★ {edu.honors}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* SLIDER DE CERTIFICADOS */}
          <div className="certifications-container reveal">
            <h3 className="slider-title">Certificaciones</h3>
            <div className="cert-slider">
              {profile.certifications.map((cert, i) => (
                <div key={i} className="cert-card">
                  <div className="cert-icon">📜</div>
                  <h4>{cert.title}</h4>
                  <button
                    className="btn-view-cert"
                    onClick={() => setSelectedCert(cert)} // Setea el cert para abrir modal
                  >
                    VER CREDENCIAL
                  </button>
                </div>
              ))}
            </div>
            <CertificateModal
              isOpen={!!selectedCert}
              onClose={() => setSelectedCert(null)}
              certPath={selectedCert?.path}
              certTitle={selectedCert?.title}
            />
            <p className="slider-hint">Desliza para ver más →</p>
          </div>
        </section>

        <footer className="footer reveal">
          <h2>¿Trabajemos juntos?</h2>
          <p>Actualmente estoy abierto a nuevos desafíos!</p>
          <a href={`mailto:${profile.contact.email}`} className="btn-contact">
            Enviar Mensaje
          </a>
          <div
            style={{
              marginTop: "40px",
              fontSize: "0.8rem",
              color: "var(--glass-border)",
            }}
          >
            © 2026 Mauricio Quiroga
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
