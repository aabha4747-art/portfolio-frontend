import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

import api from "../api/api";
import Navbar from "../components/Navbar";

function Home() {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const [aboutRes, skillsRes, projectsRes, experienceRes] =
          await Promise.all([
            api.get("/about"),
            api.get("/skills"),
            api.get("/projects"),
            api.get("/experience"),
          ]);

        setAbout(aboutRes.data.data || null);

        setSkills(
          Array.isArray(skillsRes.data.data)
            ? skillsRes.data.data
            : []
        );

        setProjects(
          Array.isArray(projectsRes.data.data)
            ? projectsRes.data.data
            : []
        );

        setExperience(
          Array.isArray(experienceRes.data.data)
            ? experienceRes.data.data
            : []
        );
      } catch (error) {
        console.error("Portfolio load error:", error);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="loading-screen">
        <h2>Unable to load portfolio</h2>
        <p>Make sure the backend is running.</p>
      </div>
    );
  }

  const firstName = about?.name?.split(" ")[0] || "Aabha";

  return (
    <>
      <Navbar about={about} />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">
                <span className="status-dot" />
                {about?.availability_status || "Open to opportunities"}
              </div>

              <h1>
                Hi, I'm <span>{firstName}.</span>
              </h1>

              <h2>
                I build products at the intersection of{" "}
                <strong>technology, AI and healthcare.</strong>
              </h2>

              <p className="hero-text">
                {about?.short_bio ||
                  "Biotechnology engineer exploring product management, artificial intelligence and full-stack development."}
              </p>

              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  View my work <ArrowRight size={16} />
                </a>

                {about?.resume_url && (
                  <a
                    className="button secondary"
                    href={about.resume_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Resume <ExternalLink size={15} />
                  </a>
                )}
              </div>

              <div className="hero-meta">
                {about?.location && (
                  <span>
                    <MapPin size={14} />
                    {about.location}
                  </span>
                )}

                {about?.email && (
                  <a href={`mailto:${about.email}`}>
                    <Mail size={14} />
                    {about.email}
                  </a>
                )}
              </div>
            </div>

            <div className="hero-card">
              <span className="hero-card-label">CURRENT FOCUS</span>

              <div className="focus-item">
                <span>01</span>
                <div>
                  <strong>Product Management</strong>
                  <p>Building useful products around real user problems.</p>
                </div>
              </div>

              <div className="focus-item">
                <span>02</span>
                <div>
                  <strong>AI & Healthcare</strong>
                  <p>
                    Exploring intelligent solutions for healthcare and life
                    sciences.
                  </p>
                </div>
              </div>

              <div className="focus-item">
                <span>03</span>
                <div>
                  <strong>Full-Stack Development</strong>
                  <p>Turning ideas into functional web applications.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container two-column">
            <div>
              <p className="section-kicker">ABOUT ME</p>
              <h2 className="section-title">
                Biotechnology meets technology.
              </h2>
            </div>

            <div className="about-copy">
              <p>
                {about?.full_bio ||
                  about?.short_bio ||
                  "I enjoy solving problems using technology and product thinking."}
              </p>

              <p>
                My work spans full-stack applications, AI-driven projects and
                biotechnology research, giving me a multidisciplinary
                perspective on building products.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-soft">
          <div className="container">
            <p className="section-kicker">CAPABILITIES</p>
            <h2 className="section-title">Skills & technologies</h2>

            <div className="skills-grid">
              {skills.map((skill) => {
                const proficiency = Math.min(
                  Number(skill.proficiency) || 0,
                  100
                );

                return (
                  <div className="skill-card" key={skill.id}>
                    <div className="skill-top">
                      <strong>{skill.name}</strong>
                      <span>{proficiency}%</span>
                    </div>

                    <p>{skill.category || "Technology"}</p>

                    <div className="skill-bar">
                      <div style={{ width: `${proficiency}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">SELECTED WORK</p>
                <h2 className="section-title">Projects</h2>
              </div>

              <p className="section-description">
                Full-stack, AI and technology projects focused on solving
                practical problems.
              </p>
            </div>

            <div className="projects-grid">
              {projects.length === 0 ? (
                <p>No published projects yet.</p>
              ) : (
                projects.map((project, index) => {
                  const technologies = Array.isArray(project.technologies)
                    ? project.technologies
                    : [];

                  const githubUrl =
                    project.github_repo_url ||
                    project.github_frontend_url ||
                    project.github_backend_url;

                  return (
                    <article className="project-card" key={project.id}>
                      <div className="project-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="project-content">
                        <span className="project-category">
                          {project.category || "Project"}
                        </span>

                        <h3>{project.title}</h3>

                        <p>
                          {project.short_description ||
                            project.full_description ||
                            "Portfolio project"}
                        </p>

                        <div className="tag-list">
                          {technologies.slice(0, 6).map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>

                        <div className="project-links">
                          <Link to={`/projects/${project.slug}`}>
                            View case study <ArrowRight size={15} />
                          </Link>

                          {githubUrl && (
                            <a
                              href={githubUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <GitBranch size={15} />
                              Code
                            </a>
                          )}

                          {project.live_frontend_url && (
                            <a
                              href={project.live_frontend_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink size={15} />
                              Live
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section id="experience" className="section section-dark">
          <div className="container">
            <p className="section-kicker light">EXPERIENCE</p>
            <h2 className="section-title light">Where I've worked</h2>

            <div className="timeline">
              {experience.map((item) => {
                const technologies = Array.isArray(item.technologies)
                  ? item.technologies
                  : [];

                const startYear = item.start_date
                  ? new Date(item.start_date).getFullYear()
                  : "";

                const endYear = item.currently_working
                  ? "Present"
                  : item.end_date
                  ? new Date(item.end_date).getFullYear()
                  : "";

                return (
                  <div className="timeline-item" key={item.id}>
                    <div className="timeline-icon">
                      <BriefcaseBusiness size={17} />
                    </div>

                    <div className="timeline-content">
                      <div className="timeline-heading">
                        <div>
                          <h3>{item.role}</h3>
                          <strong>{item.company}</strong>
                        </div>

                        <span>
                          {startYear}
                          {startYear && endYear ? " — " : ""}
                          {endYear}
                        </span>
                      </div>

                      {item.location && <p>{item.location}</p>}

                      <p>{item.description}</p>

                      <div className="tag-list dark-tags">
                        {technologies.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-inner">
            <p className="section-kicker">LET'S CONNECT</p>

            <h2>
              Interested in working
              <br />
              together?
            </h2>

            <p>
              I'm open to opportunities across product, technology, AI and
              healthcare.
            </p>

            {about?.email && (
              <a
                className="button primary contact-button"
                href={`mailto:${about.email}`}
              >
                <Mail size={16} />
                {about.email}
              </a>
            )}

            <div className="social-links">
              {about?.github_url && (
                <a
                  href={about.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={18} />
                  GitHub
                </a>
              )}

              {about?.linkedin_url && (
                <a
                  href={about.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()}{" "}
            {about?.name || "Aabha Tembhurne"}
          </span>

          <span>Built with React + Custom CMS</span>
        </div>
      </footer>
    </>
  );
}

export default Home;