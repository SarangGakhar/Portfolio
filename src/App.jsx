import { useEffect, useMemo, useRef, useState } from 'react';
import { Cloud, Code2, Cpu, Database, ExternalLink, GitBranch, Layers3, Mail, Menu, Server, ShieldCheck, X } from 'lucide-react';
import profile from '../portfolio-data.json';

const iconMap = {
  embedded: Cpu,
  backend: Server,
  cloud: Cloud,
  frontend: Code2
};

function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const nodes = [];
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let animationId = 0;

    const seedNodes = () => {
      nodes.length = 0;
      const count = Math.max(40, Math.floor((width * height) / 25500));
      for (let index = 0; index < count; index += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.34,
          vy: (Math.random() - 0.5) * 0.34,
          r: 1.2 + Math.random() * 2.2,
          tone: Math.random() > 0.55 ? '85, 215, 198' : '246, 200, 95'
        });
      }
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedNodes();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 124) {
            node.x -= dx * 0.0025;
            node.y -= dy * 0.0025;
          }
        }
      });

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            context.strokeStyle = `rgba(126, 224, 215, ${opacity * 0.18})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        context.beginPath();
        context.fillStyle = `rgba(${node.tone}, 0.72)`;
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const movePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const leavePointer = () => {
      pointer.active = false;
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', movePointer);
    window.addEventListener('pointerleave', leavePointer);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerleave', leavePointer);
    };
  }, []);

  return <canvas id="system-canvas" ref={canvasRef} aria-hidden="true" />;
}

function Header({ navOpen, setNavOpen }) {
  const links = [
    ['#experience', 'Experience'],
    ['#systems', 'Systems'],
    ['#projects', 'Projects'],
    ['#contact', 'Contact']
  ];

  return (
    <header className="site-header" data-reveal>
      <a className="brand" href="#top" aria-label="Sarang home">
        <span className="brand-mark">SG</span>
        <span className="brand-text">Sarang</span>
      </a>

      <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={navOpen} onClick={() => setNavOpen((current) => !current)}>
        {navOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={`nav-links ${navOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setNavOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

function Hero({ profile }) {
  return (
    <section className="hero section-shell">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">Research Engineer - Software Engineering - LG Projects</p>
        <h1>{profile.headline}</h1>
        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-actions" aria-label="Primary actions">
          <a className="button primary" href={`mailto:${profile.email}`}><Mail size={18} />Contact me</a>
          <a className="button ghost" href="#experience"><Layers3 size={18} />View LG work</a>
        </div>
      </div>

      <aside className="mission-panel" data-reveal>
        <div className="panel-topline">
          <span>current focus</span>
          <span className="status-dot">available</span>
        </div>
        <div className="terminal-card">
          <p><span>$</span> role.title</p>
          <strong>{profile.role} @ {profile.company}</strong>
          <p><span>$</span> work.mode</p>
          <strong>{profile.workingRole} across embedded + backend</strong>
          <p><span>$</span> lg.projects</p>
          <strong>Embedded Systems Project + Cybellum</strong>
        </div>
      </aside>
    </section>
  );
}

function MetricStrip({ metrics }) {
  return (
    <section className="metric-strip section-shell" aria-label="Career highlights" data-reveal>
      {metrics.map((metric) => (
        <article key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </article>
      ))}
    </section>
  );
}

function Experience({ profile }) {
  return (
    <section className="section-shell split-section" id="experience">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Professional Experience</p>
        <h2>Two LG projects, one software engineering throughline.</h2>
      </div>

      <div className="timeline" data-reveal>
        <article className="role-card">
          <div>
            <p className="eyebrow">Current role</p>
            <h3>{profile.role}</h3>
          </div>
          <p>{profile.company} - {profile.location}</p>
          <strong>{profile.workingRole} responsibilities across embedded systems and backend platforms</strong>
        </article>

        {profile.lgProjects.map((project, index) => (
          <article className={`timeline-item ${index === 0 ? 'active' : ''}`} key={project.name}>
            <div className="timeline-meta">
              <span>{project.label}</span>
              <strong>{project.name}</strong>
              <small>{project.period}</small>
            </div>
            <div className="timeline-body">
              <h3>{project.type}</h3>
              <ul>
                {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
              <div className="tag-list" aria-label={`${project.name} stack`}>
                {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Systems({ systems, skills }) {
  const marqueeSkills = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <section className="systems section-shell" id="systems">
      <div className="section-heading compact" data-reveal>
        <p className="eyebrow">Technical Systems</p>
        <h2>A stack map shaped by embedded work and backend delivery.</h2>
      </div>

      <div className="systems-grid" data-reveal>
        {systems.map((system, index) => {
          const Icon = iconMap[system.key] || Database;
          return (
            <article className="system-node" key={system.key}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon size={25} aria-hidden="true" />
              <h3>{system.title}</h3>
              <p>{system.text}</p>
            </article>
          );
        })}
      </div>

      <div className="skill-marquee" aria-label="Technical skills" data-reveal>
        <div className="marquee-track">
          {marqueeSkills.map((skill, index) => <span key={`${skill}-${index}`}>{skill}</span>)}
        </div>
      </div>
    </section>
  );
}

function Projects({ projects, links }) {
  return (
    <section className="section-shell project-section" id="projects">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Independent Projects</p>
        <h2>Full-stack builds with authentication, events, and containers.</h2>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" data-reveal key={project.name}>
            <div className={`project-visual ${project.name.toLowerCase()}`} aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div className="project-content">
              <p className="project-kicker">{project.type}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-list" aria-label={`${project.name} stack`}>
                {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a className="text-link" href={links[project.linkKey]} target="_blank" rel="noreferrer">View repository <ExternalLink size={16} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Proof({ achievements, education }) {
  return (
    <section className="proof section-shell" aria-label="Achievements and education">
      <div className="proof-column" data-reveal>
        <p className="eyebrow">Achievements</p>
        <h2>Competitive signal with engineering depth.</h2>
        <ul className="proof-list">
          {achievements.map((achievement) => (
            <li key={achievement.title}><strong>{achievement.title}</strong><span>{achievement.detail}</span></li>
          ))}
        </ul>
      </div>

      <div className="education-card" data-reveal>
        <p className="eyebrow">Education</p>
        <h2>{education.school}</h2>
        <p>{education.degree}</p>
        <div className="education-meter" aria-label={`CGPA ${education.cgpa}`}>
          <span style={{ width: '98.9%' }}></span>
        </div>
        <strong>CGPA: {education.cgpa}</strong>
        <small>{education.period}</small>
      </div>
    </section>
  );
}

function Contact({ profile }) {
  return (
    <section className="contact section-shell" id="contact" data-reveal>
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let us build software that holds up under pressure.</h2>
        <p>{profile.availability}</p>
      </div>
      <div className="contact-actions">
        <a className="button primary" href={`mailto:${profile.email}`}><Mail size={18} />Email</a>
        <a className="button ghost" href={profile.links.github} target="_blank" rel="noreferrer"><GitBranch size={18} />GitHub</a>
        <a className="button ghost" href={profile.links.leetcode} target="_blank" rel="noreferrer"><Code2 size={18} />LeetCode</a>
      </div>
    </section>
  );
}

function QuickJump({ open, setOpen }) {
  const links = [
    ['#experience', 'Experience'],
    ['#systems', 'Technical systems'],
    ['#projects', 'Projects'],
    ['#contact', 'Contact']
  ];

  return (
    <>
      <button className="command-button" type="button" aria-label="Open quick jump menu" onClick={() => setOpen(true)}><ShieldCheck size={22} /></button>
      <div className="command-menu" role="dialog" aria-modal="true" aria-label="Quick jump menu" hidden={!open}>
        <div className="command-box">
          <div className="command-header">
            <span>jump to</span>
            <button type="button" aria-label="Close quick jump menu" onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          {links.map(([href, label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen || commandOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen, commandOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [profile]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const quickJump = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
      if (quickJump) {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <>
      <NetworkCanvas />
      <div className="scanline" aria-hidden="true"></div>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />

      <main id="top">
        <Hero profile={profile} />
        <MetricStrip metrics={profile.metrics} />
        <Experience profile={profile} />
        <Systems systems={profile.systems} skills={profile.skills} />
        <Projects projects={profile.personalProjects} links={profile.links} />
        <Proof achievements={profile.achievements} education={profile.education} />
        <Contact profile={profile} />
      </main>

      <footer className="site-footer section-shell">
        <span>{profile.name} - {profile.role}</span>
        <span>React frontend for GitHub Pages</span>
      </footer>

      <QuickJump open={commandOpen} setOpen={setCommandOpen} />
    </>
  );
}