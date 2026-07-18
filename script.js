document.documentElement.classList.add("js");

const services = {
  web: {
    title: "Web Development",
    body: "High-performance websites, SaaS platforms, portals, and internal tools with careful frontend architecture and deployment-ready implementation.",
    points: ["React and modern frontend systems", "API integration and backend coordination", "SEO, accessibility, analytics, and performance"],
  },
  mobile: {
    title: "Mobile Apps",
    body: "Mobile products designed around repeated use, fast interaction, clear navigation, and stable releases.",
    points: ["iOS and Android product flows", "Offline-friendly UX patterns", "App-store-ready delivery support"],
  },
  ai: {
    title: "AI Solutions",
    body: "Practical AI products: automation, generative features, proof-of-concepts, agentic workflows, ML layers, and internal copilots.",
    points: ["AI consulting and opportunity mapping", "MVPs and proof-of-concepts", "Agents, automation, ML, and data workflows"],
  },
  design: {
    title: "UI/UX Design",
    body: "Interface systems that make complex software legible, responsive, and pleasant to use without burying the user under decoration.",
    points: ["Product strategy and UX flows", "Design systems and component libraries", "Prototypes, motion states, and handoff specs"],
  },
  qa: {
    title: "QA Automation",
    body: "Testing systems that turn launch confidence into a repeatable workflow instead of a last-week panic.",
    points: ["Regression test planning", "Automation coverage for critical flows", "Release checklists and quality gates"],
  },
  cloud: {
    title: "Cloud & DevOps",
    body: "Cloud foundations, deployment pipelines, observability, and cost-aware scaling for serious products.",
    points: ["CI/CD and environment strategy", "Monitoring, logs, alerts, and uptime", "Cloud architecture and infrastructure reviews"],
  },
};

const articles = {
  ai: {
    title: "Where AI agents actually help a business.",
    body: "The best AI workflows are not magic demos. They are narrow, permissioned, observable systems that reduce a repeated bottleneck.",
    points: ["Start with one measurable workflow", "Keep humans in review for high-risk actions", "Log decisions so the system can improve"],
  },
  design: {
    title: "Why premium UX is mostly subtraction.",
    body: "A product feels expensive when it removes uncertainty. Fewer choices, clearer hierarchy, stronger defaults, better feedback.",
    points: ["Delete ambiguous controls", "Make state visible", "Let motion explain change, not decorate it"],
  },
  cloud: {
    title: "Launch architecture for small teams.",
    body: "A small team needs boring infrastructure with sharp observability. The goal is velocity without gambling on production.",
    points: ["Automate deploys early", "Track cost and failures from day one", "Delay complexity until traffic proves it"],
  },
};

const jobs = {
  frontend: {
    title: "Senior Frontend Engineer",
    body: "Build polished, accessible, fast product interfaces with React, design systems, and disciplined motion.",
    points: ["Strong CSS and browser fundamentals", "Taste for interaction detail", "Comfort owning frontend architecture"],
  },
  ai: {
    title: "AI Automation Engineer",
    body: "Design and implement practical AI workflows that connect models, APIs, business logic, and human review.",
    points: ["LLM product experience", "Workflow and API integration", "Good judgment around risk and evaluation"],
  },
  qa: {
    title: "QA Automation Specialist",
    body: "Create release confidence through lean automated coverage, careful manual exploration, and clear quality signals.",
    points: ["E2E and regression planning", "Critical-path thinking", "Strong bug reports and release discipline"],
  },
};

const dialog = document.querySelector("#detailDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector(".dialog-close");
const cursorLens = document.querySelector(".cursor-lens");

function openDetail(item) {
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="signal">Code Amigo</p>
      <h2>${item.title}</h2>
      <p>${item.body}</p>
      <ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>
      <a class="button primary magnetic" href="#contact">Start this conversation</a>
    </div>
  `;
  dialog.showModal();
  dialogContent.querySelector("a").addEventListener("click", () => dialog.close());
}

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => openDetail(services[button.dataset.service]));
});

document.querySelectorAll("[data-article]").forEach((button) => {
  button.addEventListener("click", () => openDetail(articles[button.dataset.article]));
});

document.querySelectorAll("[data-job]").forEach((button) => {
  button.addEventListener("click", () => openDetail(jobs[button.dataset.job]));
});

closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const nav = document.querySelector(".nav-shell");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function smoothScrollToElement(target) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, "", link.getAttribute("href"));
    smoothScrollToElement(target);
  });
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);
reveals.forEach((node) => revealObserver.observe(node));

const navLinks = [...document.querySelectorAll(".nav-links a")];
const railLinks = [...document.querySelectorAll(".chapter-rail a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      railLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  },
  { threshold: 0.42 }
);
sections.forEach((section) => sectionObserver.observe(section));

if (location.hash) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const target = document.querySelector(location.hash);
    if (target) window.scrollBy({ top: target.getBoundingClientRect().top - 104, behavior: "auto" });
  }));
}

document.addEventListener("pointermove", (event) => {
  document.body.style.setProperty("--mx", `${event.clientX}px`);
  document.body.style.setProperty("--my", `${event.clientY}px`);
  document.body.style.setProperty("--cx", `${event.clientX}px`);
  document.body.style.setProperty("--cy", `${event.clientY}px`);
  cursorLens.style.opacity = "1";
});

document.addEventListener("pointerover", (event) => {
  cursorLens.classList.toggle("on-link", Boolean(event.target.closest("a, button, input, textarea")));
});

document.querySelectorAll(".service-node, .journal-card, .job").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  });
});

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.body.style.setProperty("--scroll", max > 0 ? window.scrollY / max : 0);
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".form-note").textContent =
    "Demo message captured locally. The original site has not been touched.";
  event.currentTarget.reset();
});

const canvas = document.querySelector("#field");
const ctx = canvas.getContext("2d", { alpha: true });
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 };
let dots = [];
let width = 0;
let height = 0;
let raf = 0;
let frame = 0;

function buildDotField() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const radius = 1.5;
  const spacing = width < 640 ? 18 : 14;
  const step = radius + spacing;
  const cols = Math.floor(width / step);
  const rows = Math.floor(height / step);
  const padX = (width % step) / 2;
  const padY = (height % step) / 2;
  dots = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const ax = padX + col * step + step / 2;
      const ay = padY + row * step + step / 2;
      dots.push({ ax, ay, sx: ax, sy: ay });
    }
  }
}

function trackPointer(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

function updateMouseSpeed() {
  const dx = mouse.px - mouse.x;
  const dy = mouse.py - mouse.y;
  const distance = Math.hypot(dx, dy);
  mouse.speed += (distance - mouse.speed) * 0.45;
  if (mouse.speed < 0.001) mouse.speed = 0;
  mouse.px = mouse.x;
  mouse.py = mouse.y;
}

setInterval(updateMouseSpeed, 20);

function drawDotField() {
  frame += 1;
  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(8, 120, 189, 0.34)");
  gradient.addColorStop(0.52, "rgba(54, 167, 216, 0.26)");
  gradient.addColorStop(1, "rgba(255, 204, 115, 0.34)");
  ctx.fillStyle = gradient;

  const engagement = Math.min(mouse.speed / 7, 1);
  const cursorRadius = 440;
  const cursorRadiusSq = cursorRadius * cursorRadius;
  const dotRadius = 0.95;
  const t = frame * 0.018;

  ctx.beginPath();
  for (const dot of dots) {
    const dx = mouse.x - dot.ax;
    const dy = mouse.y - dot.ay;
    const distSq = dx * dx + dy * dy;

    if (distSq < cursorRadiusSq && engagement > 0.01) {
      const distance = Math.sqrt(distSq);
      const force = Math.pow(1 - distance / cursorRadius, 2) * 58 * engagement;
      const angle = Math.atan2(dy, dx);
      dot.sx += (dot.ax - Math.cos(angle) * force - dot.sx) * 0.15;
      dot.sy += (dot.ay - Math.sin(angle) * force - dot.sy) * 0.15;
    } else {
      dot.sx += (dot.ax - dot.sx) * 0.1;
      dot.sy += (dot.ay - dot.sy) * 0.1;
    }

    const drawX = dot.sx + Math.cos(dot.ay * 0.025 + t) * 0.45;
    const drawY = dot.sy + Math.sin(dot.ax * 0.022 + t) * 0.65;
    ctx.moveTo(drawX + dotRadius, drawY);
    ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
  }
  ctx.fill();
  raf = requestAnimationFrame(drawDotField);
}

buildDotField();
window.addEventListener("resize", buildDotField);
window.addEventListener("pointermove", trackPointer, { passive: true });
if (!reduceMotion) drawDotField();
else {
  mouse.x = width / 2;
  mouse.y = height / 2;
  drawDotField();
  cancelAnimationFrame(raf);
}
window.addEventListener("pagehide", () => cancelAnimationFrame(raf));
