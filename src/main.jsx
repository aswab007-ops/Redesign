import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import DotField from './components/DotField';
import '../styles.css';

const services = {
  web: ['Web Development', 'High-performance websites, SaaS platforms, portals, and internal tools with careful frontend architecture and deployment-ready implementation.', ['React and modern frontend systems', 'API integration and backend coordination', 'SEO, accessibility, analytics, and performance']],
  mobile: ['Mobile Apps', 'Mobile products designed around repeated use, fast interaction, clear navigation, and stable releases.', ['iOS and Android product flows', 'Offline-friendly UX patterns', 'App-store-ready delivery support']],
  ai: ['AI Solutions', 'Practical AI products: automation, generative features, proof-of-concepts, agentic workflows, ML layers, and internal copilots.', ['AI consulting and opportunity mapping', 'MVPs and proof-of-concepts', 'Agents, automation, ML, and data workflows']],
  design: ['UI/UX Design', 'Interface systems that make complex software legible, responsive, and pleasant to use without burying the user under decoration.', ['Product strategy and UX flows', 'Design systems and component libraries', 'Prototypes, motion states, and handoff specs']],
  qa: ['QA Automation', 'Testing systems that turn launch confidence into a repeatable workflow instead of a last-week panic.', ['Regression test planning', 'Automation coverage for critical flows', 'Release checklists and quality gates']],
  cloud: ['Cloud & DevOps', 'Cloud foundations, deployment pipelines, observability, and cost-aware scaling for serious products.', ['CI/CD and environment strategy', 'Monitoring, logs, alerts, and uptime', 'Cloud architecture and infrastructure reviews']],
};

const articles = {
  ai: ['Where AI agents actually help a business.', 'The best AI workflows are not magic demos. They are narrow, permissioned, observable systems that reduce a repeated bottleneck.', ['Start with one measurable workflow', 'Keep humans in review for high-risk actions', 'Log decisions so the system can improve']],
  design: ['Why premium UX is mostly subtraction.', 'A product feels expensive when it removes uncertainty. Fewer choices, clearer hierarchy, stronger defaults, better feedback.', ['Delete ambiguous controls', 'Make state visible', 'Let motion explain change, not decorate it']],
  cloud: ['Launch architecture for small teams.', 'A small team needs boring infrastructure with sharp observability. The goal is velocity without gambling on production.', ['Automate deploys early', 'Track cost and failures from day one', 'Delay complexity until traffic proves it']],
};

const jobs = {
  frontend: ['Senior Frontend Engineer', 'Build polished, accessible, fast product interfaces with React, design systems, and disciplined motion.', ['Strong CSS and browser fundamentals', 'Taste for interaction detail', 'Comfort owning frontend architecture']],
  ai: ['AI Automation Engineer', 'Design and implement practical AI workflows that connect models, APIs, business logic, and human review.', ['LLM product experience', 'Workflow and API integration', 'Good judgment around risk and evaluation']],
  qa: ['QA Automation Specialist', 'Create release confidence through lean automated coverage, careful manual exploration, and clear quality signals.', ['E2E and regression planning', 'Critical-path thinking', 'Strong bug reports and release discipline']],
};

function smoothScroll(id) {
  const target = document.querySelector(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = window.scrollY;
  const top = target.getBoundingClientRect().top + start - 104;
  if (reduce) {
    window.scrollTo(0, top);
    return;
  }
  const duration = Math.min(1100, Math.max(520, Math.abs(top - start) * 0.46));
  const started = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 4);
  function step(now) {
    const t = Math.min(1, (now - started) / duration);
    window.scrollTo(0, start + (top - start) * ease(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function WordReveal({ as: Tag = 'span', children, className = '' }) {
  return (
    <Tag className={className}>
      {String(children).split(/\s+/).map((word, i) => (
        <span className="word" style={{ '--i': i }} key={`${word}-${i}`}>{word} </span>
      ))}
    </Tag>
  );
}

function DetailDialog({ detail, onClose }) {
  if (!detail) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="dialog-close" type="button" aria-label="Close dialog" onClick={onClose}>&times;</button>
        <div className="dialog-body">
          <p className="signal">Code Amigo</p>
          <h2 id="detail-title">{detail[0]}</h2>
          <p>{detail[1]}</p>
          <ul>{detail[2].map((point) => <li key={point}>{point}</li>)}</ul>
          <button className="button primary magnetic" type="button" onClick={() => { onClose(); smoothScroll('#contact'); }}>Start this conversation</button>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [note, setNote] = useState('');
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onMove = (event) => {
      document.body.style.setProperty('--mx', `${event.clientX}px`);
      document.body.style.setProperty('--my', `${event.clientY}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.body.style.setProperty('--scroll', max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dotProps = useMemo(() => ({
    dotRadius: 1.5,
    dotSpacing: 14,
    bulgeStrength: 67,
    glowRadius: 160,
    sparkle: false,
    waveAmplitude: 0,
    cursorRadius: 500,
    cursorForce: 0.1,
    bulgeOnly: true,
    gradientFrom: isDark ? '#A855F7' : 'rgba(8, 120, 189, 0.48)',
    gradientTo: isDark ? '#B497CF' : 'rgba(255, 204, 115, 0.46)',
    glowColor: isDark ? '#120F17' : 'rgba(255, 204, 115, 0.34)',
  }), [isDark]);

  const nav = ['services', 'work', 'process', 'journal', 'careers'];
  const serviceItems = [
    ['web', 'WEB', 'Web Development', 'Fast, resilient customer-facing platforms.'],
    ['mobile', 'APP', 'Mobile Apps', 'Native-feeling products for daily use.'],
    ['ai', 'AI', 'AI Solutions', 'Agents, automation, ML, and AI product layers.'],
    ['design', 'UX', 'UI/UX Design', 'Systems that make complex flows feel calm.'],
    ['qa', 'QA', 'QA Automation', 'Confidence loops before launch day.'],
    ['cloud', 'OPS', 'Cloud & DevOps', 'Infrastructure that scales without drama.'],
  ];

  return (
    <>
      <a className="skip-link" href="#services">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <span className="dot-glow" />
        <DotField {...dotProps} />
      </div>

      <header className={`nav-shell ${menuOpen ? 'open' : ''}`}>
        <button className="brand-mark plain-button" type="button" onClick={() => smoothScroll('#home')} aria-label="Code Amigo home">
          <span className="brand-glyph">CA</span>
          <span>Code Amigo</span>
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          {nav.map((id) => <button key={id} type="button" onClick={() => { setMenuOpen(false); smoothScroll(`#${id}`); }}>{id[0].toUpperCase() + id.slice(1)}</button>)}
        </nav>
        <button className="theme-toggle" type="button" aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={isDark} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
          <span className="sun" /><span className="moon" />
        </button>
        <button className="nav-cta magnetic" type="button" onClick={() => smoothScroll('#contact')}>Start a Project</button>
        <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <main id="home">
        <section className="hero section-panel">
          <div className="hero-copy reveal visible">
            <p className="signal">Custom software, AI systems, product engineering</p>
            <WordReveal as="h1">Software that feels less built, more composed.</WordReveal>
            <WordReveal as="p">Code Amigo turns ambitious product ideas into precise digital systems: web platforms, mobile apps, AI workflows, cloud infrastructure, and the product design needed to make them feel inevitable.</WordReveal>
            <div className="hero-actions">
              <button className="button primary magnetic" type="button" onClick={() => smoothScroll('#contact')}>Discuss the build</button>
              <button className="button ghost" type="button" onClick={() => smoothScroll('#work')}>Explore the studio</button>
            </div>
          </div>
          <div className="hero-stage reveal visible" aria-label="Animated product composition">
            <div className="signal-feed"><span>Live Build Feed</span><p>Design system synced</p><p>QA gate armed</p><p>Cloud preview online</p></div>
            <div className="orbital"><div className="core-card"><div className="scanline" /><p>Launch Readiness</p><strong>92%</strong><span>Architecture, design, QA, deployment</span></div><div className="float-chip chip-a">AI Agents</div><div className="float-chip chip-b">React</div><div className="float-chip chip-c">Cloud</div><div className="route route-a" /><div className="route route-b" /><div className="route route-c" /></div>
          </div>
        </section>

        <section className="marquee" aria-label="Capabilities"><div>{['Generative AI', 'Cloud & DevOps', 'Mobile Apps', 'UI/UX Systems', 'QA Automation', 'Web Platforms'].map((item) => <span key={item}>{item}</span>)}</div></section>

        <section id="services" className="services section-panel">
          <div className="section-head reveal visible"><p className="signal">What gets shipped</p><WordReveal as="h2">Six disciplines, one delivery system.</WordReveal><p>Each capability is designed as part of one product pipeline, so strategy, interface, engineering, testing, and deployment do not drift apart.</p></div>
          <div className="service-orbit">{serviceItems.map(([key, code, title, desc]) => <button className="service-node reveal visible" type="button" key={key} onClick={() => setDetail(services[key])}><span>{code}</span><strong>{title}</strong><em>{desc}</em></button>)}</div>
        </section>

        <section id="work" className="work section-panel">
          <div className="work-lockup reveal visible"><p className="signal">Experience architecture</p><WordReveal as="h2">Every project becomes a small operating system.</WordReveal><p>Instead of isolated pages and tickets, the studio maps every build as a connected stack: user journey, interface states, API contracts, release gates, analytics, and cloud posture.</p></div>
          <div className="product-map reveal visible">{[['Research', 'Signals', 'User intent, market pressure, technical risk.'], ['Design', 'System', 'UX flows, visual language, components.'], ['Build', 'Runtime', 'Frontend, backend, AI, data, cloud.'], ['Operate', 'Release', 'QA, monitoring, deployment, iteration.']].map(([a, b, c]) => <div className="map-column" key={a}><span>{a}</span><strong>{b}</strong><p>{c}</p></div>)}</div>
        </section>

        <section id="process" className="process section-panel">
          <div className="section-head reveal visible"><p className="signal">The method</p><WordReveal as="h2">A quiet process for loud ambitions.</WordReveal></div>
          <div className="timeline">{[['Discover', 'Pressure-test the idea.', 'Clarify the business outcome, the user promise, and the risky assumptions before design starts.'], ['Prototype', 'Make the product visible.', 'Turn abstract requirements into clickable flows, interface states, and buildable architecture.'], ['Engineer', 'Ship the durable version.', 'Build the smallest serious system: fast, tested, accessible, responsive, and deployment-ready.'], ['Launch', 'Release with a feedback loop.', 'QA, deploy, monitor, and keep improving from real signals instead of guessing.']].map(([a, b, c]) => <article className="step reveal visible" key={a}><span>{a}</span><h3>{b}</h3><p>{c}</p></article>)}</div>
        </section>

        <section id="journal" className="journal section-panel">
          <div className="section-head reveal visible"><p className="signal">Journal</p><WordReveal as="h2">Notes from the build floor.</WordReveal></div>
          <div className="journal-grid">{Object.entries(articles).map(([key, item]) => <button className="journal-card reveal visible" type="button" key={key} onClick={() => setDetail(item)}><span>{key === 'ai' ? 'AI Product Strategy' : key === 'design' ? 'Interface Craft' : 'Cloud Systems'}</span><h3>{item[0]}</h3><p>{item[1]}</p></button>)}</div>
        </section>

        <section id="careers" className="careers section-panel">
          <div className="career-copy reveal visible"><p className="signal">Careers</p><WordReveal as="h2">Join the builders who care about the finish.</WordReveal><p>Code Amigo hires people who can move from ambiguity to shipped work: designers, engineers, QA specialists, AI builders, and operators.</p></div>
          <div className="jobs">{Object.entries(jobs).map(([key, item]) => <button className="job reveal visible" type="button" key={key} onClick={() => setDetail(item)}><strong>{item[0]}</strong><span>{key === 'frontend' ? 'React, motion, accessibility' : key === 'ai' ? 'Agents, APIs, workflow design' : 'Release confidence, testing systems'}</span></button>)}</div>
        </section>

        <section id="contact" className="contact section-panel">
          <div className="contact-card reveal visible"><p className="signal">Start</p><WordReveal as="h2">Bring the rough idea. Leave with a sharper path.</WordReveal><form onSubmit={(event) => { event.preventDefault(); setNote('Demo message captured locally. The original site has not been touched.'); event.currentTarget.reset(); }}><label><span>Name</span><input name="name" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label><span>What are you building?</span><textarea name="message" rows="4" required /></label><button className="button primary magnetic" type="submit">Send inquiry</button><p className="form-note" role="status" aria-live="polite">{note}</p></form></div>
          <div className="contact-meta reveal visible"><p>hello@codeamigo.com</p><p>+92 320 6877855</p><p>Lahore / Remote-first delivery</p></div>
        </section>
      </main>

      <footer className="footer"><span>Code Amigo</span><span>Standalone redesign demo. Original website untouched.</span></footer>
      <DetailDialog detail={detail} onClose={() => setDetail(null)} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
