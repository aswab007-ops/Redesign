import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import DotField from './components/DotField';
import '../styles.css';

const services = [
  ['AI Solutions', 'Custom AI agents, machine learning models, and intelligent automation that transform how your business operates and makes decisions.'],
  ['Web Development', 'Modern, scalable web applications built with React, Next.js, and cutting-edge technologies that deliver exceptional user experiences.'],
  ['Mobile Development', 'Native and cross-platform mobile apps for iOS and Android that engage users with smooth, intuitive interactions.'],
  ['UI/UX Design', 'User-centered design that transforms complex workflows into intuitive, beautiful interfaces your customers will love.'],
  ['QA & Automation', 'Comprehensive testing strategies and automated quality assurance that catch bugs before your users do.'],
  ['Cloud & DevOps', 'Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices that keep your applications running smoothly.'],
];

const technologies = [
  ['AI Solutions', ['LangChain', 'LangGraph', 'LlamaIndex', 'CrewAI', 'AutoGen', 'Hugging Face', 'TensorFlow', 'PyTorch']],
  ['Front End', ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript']],
  ['Back End', ['Node.js', 'NestJS', 'Python', 'Django', 'FastAPI', 'Spring Boot', '.NET']],
  ['Mobile', ['Flutter', 'React Native', 'Swift', 'Kotlin']],
  ['QA & Automation', ['Playwright', 'Cypress', 'Selenium', 'Appium', 'JMeter']],
  ['DevOps & Cloud', ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions']],
];

const process = [
  ['STEP 01', 'Discovery & Strategy', 'We analyze your business goals, user needs, and technical requirements to create a roadmap that aligns technology with your vision.'],
  ['STEP 02', 'Architecture & Planning', 'Our architects design scalable, maintainable systems with clear technical specifications and milestone-based project plans.'],
  ['STEP 03', 'UI/UX Design', 'We craft intuitive, beautiful interfaces through user research, wireframing, prototyping, and iterative design sprints.'],
  ['STEP 04', 'Development', 'Agile development with clean, well-documented code. Regular demos and transparent communication keep you in the loop.'],
  ['STEP 05', 'Quality Assurance', 'Rigorous testing: unit, integration, performance, and security, ensures your product works flawlessly across all scenarios.'],
  ['STEP 06', 'Deployment & Launch', 'Zero-downtime deployments, infrastructure optimization, and comprehensive monitoring for a smooth, reliable launch.'],
  ['STEP 07', 'Support & Evolution', 'Post-launch support, performance monitoring, and continuous improvements keep your product ahead of the curve.'],
];

const testimonials = [
  ['SC', 'Sarah Chen', 'CTO, FinTech Startup', "Rohan's team built our AI platform in just 8 weeks. They explained everything clearly and kept us in the loop the whole time. The final product was production ready and exactly what we needed. Their engineering skills are top notch."],
  ['MR', 'Marcus Rodriguez', 'VP of Engineering, E-Commerce Platform', "Rohan's team migrated our entire system to a microservices architecture with zero downtime. They knew exactly what they were doing and handled everything smoothly. The whole process felt organized and stress free."],
  ['EW', 'Emily Watson', 'Product Director, Healthcare SaaS', "The mobile app they built reduced our patient onboarding time by 60 percent. Ahmad's team understood healthcare compliance well and made sure everything was built to the right standard. It made a real difference for us."],
  ['DK', 'David Kim', 'Founder & CEO, AI Startup', "From idea to deployed MVP in 6 weeks. Rohan's team didn't just write code. They helped us shape our product strategy and technical architecture from the ground up. Their input was invaluable and made our product much stronger."],
  ['PS', 'Priya Sharma', 'Head of Digital, Enterprise Corp', 'The Code Amigo team transformed our old system into something modern and scalable. We saw return on investment within the first quarter of deployment. They were professional, communicative, and delivered exactly what they promised.'],
  ['JM', 'James Mitchell', 'CTO, Logistics Company', "Ahmad's team improved our testing process significantly. They cut our regression testing from 3 days down to just 4 hours. Their systematic approach to quality saved us a lot of time and gave us more confidence in every release."],
];

const blogs = [
  ['Engineering', '8 min read', 'Building Scalable Microservices with Node.js and Kubernetes', 'A practical guide to designing, deploying, and managing microservices architecture for high-traffic applications.'],
  ['AI & Tech', '6 min read', 'The Future of AI-Powered Development Tools', 'How artificial intelligence is transforming the software development lifecycle and what it means for engineering teams.'],
  ['Cloud', '7 min read', 'Deploying Cloud-Native Applications at Scale', 'Best practices for building resilient, scalable applications in modern cloud environments.'],
];

const jobs = [
  ['Senior React Developer', 'Full-time', 'Remote', 'Engineering', '5+ years'],
  ['Full-Stack Engineer', 'Full-time', 'Remote', 'Engineering', '3+ years'],
  ['UI/UX Designer', 'Full-time', 'Remote', 'Design', '3+ years'],
];

function smoothScroll(id) {
  const target = document.querySelector(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const start = window.scrollY;
  const top = target.getBoundingClientRect().top + start - 96;
  if (reduce) {
    window.scrollTo(0, top);
    return;
  }
  const duration = Math.min(950, Math.max(420, Math.abs(top - start) * 0.38));
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
  const words = String(children).split(/\s+/);

  return (
    <Tag className={className} aria-label={String(children)}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="word" style={{ '--i': i }} aria-hidden="true">{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="section-head reveal">
      <p className="signal">{eyebrow}</p>
      <WordReveal as="h2">{title}</WordReveal>
      {children && <p>{children}</p>}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [note, setNote] = useState('');
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.add('js');
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element));

    const onMove = (event) => {
      document.body.style.setProperty('--mx', `${event.clientX}px`);
      document.body.style.setProperty('--my', `${event.clientY}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const last = Number(document.body.dataset.lastScroll || 0);
      document.body.style.setProperty('--scroll', max > 0 ? y / max : 0);
      if (y > 120 && y > last + 6) document.body.classList.add('nav-hidden');
      if (y < last - 4 || y < 48) document.body.classList.remove('nav-hidden');
      document.body.dataset.lastScroll = String(y);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      reveal.disconnect();
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
    waveAmplitude: 0.75,
    cursorRadius: 500,
    cursorForce: 0.1,
    bulgeOnly: true,
    gradientFrom: isDark ? '#A855F7' : '#A40000',
    gradientTo: isDark ? '#B497CF' : '#A3A3A3',
    glowColor: '#120F17',
  }), [isDark]);

  const nav = [
    ['home', 'Home'],
    ['services', 'Services'],
    ['work', 'Work'],
    ['blog', 'Blog'],
    ['careers', 'Careers'],
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
          {nav.map(([id, label]) => <button key={id} type="button" onClick={() => { setMenuOpen(false); smoothScroll(`#${id}`); }}>{label}</button>)}
        </nav>
        <button className="theme-toggle" type="button" aria-label={isDark ? 'Switch theme' : 'Switch theme'} aria-pressed={isDark} onClick={() => setTheme(isDark ? 'crimson' : 'dark')}>
          <span className="sun" /><span className="moon" />
        </button>
        <button className="nav-cta magnetic" type="button" onClick={() => smoothScroll('#contact')}>Get a Quote</button>
        <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <main id="home">
        <section className="hero section-panel">
          <div className="hero-copy reveal">
            <p className="signal">Premium Software Development Company</p>
            <WordReveal as="h1">We Build Digital Products That Scale</WordReveal>
            <WordReveal as="p">We craft software with clean code, thoughtful design, and long-term vision, engineered to grow with your business, not against it.</WordReveal>
            <div className="hero-actions">
              <button className="button primary magnetic" type="button" onClick={() => smoothScroll('#contact')}>Get Started</button>
              <button className="button ghost" type="button" onClick={() => smoothScroll('#work')}>View Our Work</button>
            </div>
          </div>
          <div className="hero-stage reveal" aria-label="Animated Code Amigo delivery system">
            <div className="flow-visual">
              <div className="flow-line line-one" />
              <div className="flow-line line-two" />
              <div className="flow-card primary-flow">
                <span>Code Amigo</span>
                <strong>Idea to Launch</strong>
                <p>Strategy, design, engineering, quality, cloud, and support moving as one delivery system.</p>
              </div>
              <div className="flow-node node-a"><span>01</span><strong>Discover</strong></div>
              <div className="flow-node node-b"><span>03</span><strong>Design</strong></div>
              <div className="flow-node node-c"><span>05</span><strong>QA</strong></div>
              <div className="flow-node node-d"><span>07</span><strong>Evolve</strong></div>
            </div>
          </div>
        </section>

        <section id="services" className="services section-panel">
          <SectionTitle eyebrow="Our Services" title="Solutions We Deliver">End-to-end software engineering services tailored to your business needs</SectionTitle>
          <div className="service-grid">
            {services.map(([title, desc], index) => (
              <article className="service-card reveal" style={{ '--d': index }} key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="tech section-panel">
          <SectionTitle eyebrow="Tech Stack" title="Technologies We Master">We stay at the forefront of technology to deliver the best solutions for your projects</SectionTitle>
          <div className="tech-board">
            {technologies.map(([category, list], index) => (
              <article className="tech-row reveal" style={{ '--d': index }} key={category}>
                <h3>{category}</h3>
                <div>
                  {list.map((item) => <span className="chip" key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="process section-panel">
          <SectionTitle eyebrow="Our Process" title="From Idea to Launch">A proven development process that ensures quality, transparency, and timely delivery</SectionTitle>
          <div className="timeline">
            {process.map(([step, title, desc]) => (
              <article className="step reveal" key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials section-panel">
          <SectionTitle eyebrow="Our Work" title="What Our Clients Say">Don't just take our word for it, hear from the teams we've partnered with</SectionTitle>
          <div className="quote-strip">
            {testimonials.map(([initials, name, role, quote]) => (
              <article className="quote-card reveal" key={name}>
                <p>"{quote}"</p>
                <div><span>{initials}</span><strong>{name}</strong><em>{role}</em></div>
              </article>
            ))}
          </div>
        </section>

        <section id="blog" className="blog section-panel">
          <SectionTitle eyebrow="Latest Insights" title="From Our Blog">Thoughts, tutorials, and insights from our engineering team</SectionTitle>
          <div className="blog-grid">
            {blogs.map(([category, read, title, desc]) => (
              <article className="blog-card reveal" key={title}>
                <div><span>{category}</span><span>{read}</span></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <a href="https://code-amigo.vercel.app/" target="_blank" rel="noreferrer">Read More</a>
              </article>
            ))}
          </div>
          <a className="text-link" href="https://code-amigo.vercel.app/" target="_blank" rel="noreferrer">View All Blogs</a>
        </section>

        <section id="careers" className="careers section-panel">
          <div className="career-copy reveal">
            <p className="signal">We're Hiring</p>
            <WordReveal as="h2">Join Our Team</WordReveal>
            <p>Be part of a team that's building the future of software</p>
            <p className="fine-print">* Sample job listings for demonstration purposes</p>
          </div>
          <div className="jobs">
            {jobs.map(([title, type, place, team, exp]) => (
              <article className="job reveal" key={title}>
                <strong>{title}</strong>
                <div><span>{type}</span><span>{place}</span><span>{team}</span><span>{exp}</span></div>
                <a href="https://code-amigo.vercel.app/" target="_blank" rel="noreferrer">View Details</a>
              </article>
            ))}
            <a className="text-link" href="https://code-amigo.vercel.app/" target="_blank" rel="noreferrer">View All Open Positions</a>
          </div>
        </section>

        <section id="contact" className="contact section-panel">
          <div className="contact-card reveal">
            <p className="signal">Ready to Build Something Great?</p>
            <WordReveal as="h2">Let's discuss your project.</WordReveal>
            <p>Let's discuss your project and discover how Code Amigo can bring your vision to life with cutting-edge technology and expert engineering.</p>
            <form onSubmit={(event) => { event.preventDefault(); setNote('Demo message captured locally. The original website has not been touched.'); event.currentTarget.reset(); }}>
              <label><span>Name</span><input name="name" autoComplete="name" required /></label>
              <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>Project details</span><textarea name="message" rows="4" required /></label>
              <button className="button primary magnetic" type="submit">Get a Free Consultation</button>
              <p className="form-note" role="status" aria-live="polite">{note}</p>
            </form>
          </div>
          <aside className="contact-meta reveal">
            <p>No commitment required</p>
            <p>Response within 24 hours</p>
            <p>Free project assessment</p>
            <hr />
            <p>+92 320 6877855</p>
            <p>hello@codeamigo.com</p>
          </aside>
        </section>
      </main>

      <footer className="footer">
        <span>Code Amigo</span>
        <span>Company</span>
        <span>Careers</span>
        <span>Blog</span>
        <span>Services</span>
        <span>Web Development</span>
        <span>Mobile Development</span>
        <span>UI/UX Design</span>
        <span>QA & Automation</span>
        <span>Cloud & DevOps</span>
        <span>AI Solutions</span>
        <span>Stay Updated</span>
        <span>Subscribe to our newsletter for the latest insights.</span>
        <span>(c) 2026 Code Amigo. All rights reserved.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
