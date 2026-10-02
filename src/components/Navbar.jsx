import { GitBranch, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ about }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          AT<span>.</span>
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <a href="/#about" onClick={() => setOpen(false)}>About</a>
          <a href="/#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="/#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="/#experience" onClick={() => setOpen(false)}>Experience</a>
          <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>

          {about?.github_url && (
            <a
              href={about.github_url}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="nav-icon"
            >
              <GitBranch size={17} />
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
    </nav>
  );
}

export default Navbar;