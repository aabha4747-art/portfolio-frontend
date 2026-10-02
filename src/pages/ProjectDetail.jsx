import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";

import api from "../api/api";
import Navbar from "../components/Navbar";

function ProjectDetail() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadProject() {
      try {
        const [projectResponse, aboutResponse] = await Promise.all([
          api.get(`/projects/${slug}`),
          api.get("/about"),
        ]);

        setProject(projectResponse.data.data || null);
        setAbout(aboutResponse.data.data || null);
      } catch (error) {
        console.error("Project load error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader" />
        <p>Loading project...</p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <>
        <Navbar about={about} />

        <div className="not-found">
          <h1>Project not found.</h1>
          <Link to="/">Return home</Link>
        </div>
      </>
    );
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  const features = Array.isArray(project.features)
    ? project.features
    : [];

  const screenshots = Array.isArray(project.screenshots)
    ? project.screenshots
    : [];

  return (
    <>
      <Navbar about={about} />

      <main>
        <section className="project-detail-hero">
          <div className="container">
            <Link className="back-link" to="/#projects">
              <ArrowLeft size={15} />
              Back to projects
            </Link>

            <p className="section-kicker">
              {project.category || "PROJECT"}
            </p>

            <h1>{project.title}</h1>

            <p className="project-lead">
              {project.full_description ||
                project.short_description}
            </p>

            <div className="tag-list project-detail-tags">
              {technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="detail-actions">
              {project.live_frontend_url && (
                <a
                  className="button primary"
                  href={project.live_frontend_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live project
                  <ExternalLink size={15} />
                </a>
              )}

              {project.github_frontend_url && (
                <a
                  className="button secondary"
                  href={project.github_frontend_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={15} />
                  Frontend
                </a>
              )}

              {project.github_backend_url && (
                <a
                  className="button secondary"
                  href={project.github_backend_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={15} />
                  Backend
                </a>
              )}

              {!project.github_frontend_url &&
                !project.github_backend_url &&
                project.github_repo_url && (
                  <a
                    className="button secondary"
                    href={project.github_repo_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitBranch size={15} />
                    GitHub
                  </a>
                )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container case-study-grid">
            <div className="case-block">
              <span>01</span>
              <h2>The problem</h2>
              <p>
                {project.problem ||
                  "This project was created to solve a practical user problem through technology."}
              </p>
            </div>

            <div className="case-block">
              <span>02</span>
              <h2>The solution</h2>
              <p>
                {project.solution ||
                  project.full_description ||
                  project.short_description}
              </p>
            </div>

            <div className="case-block">
              <span>03</span>
              <h2>My role</h2>
              <p>
                {project.my_role ||
                  "Designed and developed the project."}
              </p>
            </div>

            <div className="case-block">
              <span>04</span>
              <h2>Challenges</h2>
              <p>
                {project.challenges ||
                  "Designing and implementing a reliable end-to-end solution."}
              </p>
            </div>
          </div>
        </section>

        {features.length > 0 && (
          <section className="section section-soft">
            <div className="container">
              <p className="section-kicker">FUNCTIONALITY</p>
              <h2 className="section-title">Key features</h2>

              <div className="features-grid">
                {features.map((feature, index) => (
                  <div
                    className="feature-card"
                    key={`${feature}-${index}`}
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{feature}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {screenshots.length > 0 && (
          <section className="section">
            <div className="container">
              <p className="section-kicker">PROOF OF WORK</p>
              <h2 className="section-title">Screenshots</h2>

              <div className="screenshots-grid">
                {screenshots.map((screenshot, index) => (
                  <img
                    key={`${screenshot}-${index}`}
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {project.learnings && (
          <section className="section">
            <div className="container learning-box">
              <p className="section-kicker">REFLECTION</p>
              <h2>What I learned</h2>
              <p>{project.learnings}</p>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()}{" "}
            {about?.name || "Aabha Tembhurne"}
          </span>

          <Link to="/">Back to portfolio</Link>
        </div>
      </footer>
    </>
  );
}

export default ProjectDetail;