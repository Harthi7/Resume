const resumeData = {
  profile: {
    name: "Your Name",
    title: "Software Engineer · Platform Builder · Systems Operator",
    summary:
      "A stage-first hologram resume. The device stays central, the information floats as modules around it, and the UI stays out of the way until you need it.",
    stats: [
      { value: "05+", label: "Years" },
      { value: "12", label: "Projects" },
      { value: "06", label: "Domains" },
      { value: "24h", label: "Reply SLA" }
    ]
  },
  sections: [
    {
      key: "profile",
      title: "Profile",
      subtitle: "What you do, what environments you operate in, and what kind of technical responsibility you can carry.",
      bullets: [
        "Backend and platform-oriented engineer who values technically real work over cosmetic output.",
        "Strong at debugging, systems thinking, delivery under constraints, and translating complexity into usable structure.",
        "Best fit: reliability, automation, infrastructure, performance, and product-facing engineering problems."
      ]
    },
    {
      key: "experience",
      title: "Experience",
      subtitle: "Roles should read like ownership and outcomes, not like a pasted backlog.",
      bullets: [
        "Owned difficult implementation work where stability mattered more than presentation.",
        "Worked across backend systems, tooling, delivery workflows, and cross-functional communication.",
        "Improved systems by fixing root causes instead of hiding them behind process or polish."
      ]
    },
    {
      key: "projects",
      title: "Projects",
      subtitle: "Projects are where judgment becomes visible: scope choices, trade-offs, and measurable decisions.",
      bullets: [
        "Built interactive browser experiences that balance visual ambition with practical performance.",
        "Created automation and tooling that removed repeated manual work for collaborators.",
        "Shipped product and engineering work that prioritizes clarity, responsiveness, and maintainability."
      ]
    },
    {
      key: "skills",
      title: "Skills",
      subtitle: "List what you can defend deeply, not every keyword you have touched once.",
      bullets: [
        "Core: JavaScript, TypeScript, Python, APIs, debugging, implementation discipline.",
        "Frontend: HTML, CSS, interaction design, browser performance, accessible UI structure.",
        "Platform: CI/CD, observability, operational clarity, cloud services, delivery under pressure."
      ]
    },
    {
      key: "impact",
      title: "Impact",
      subtitle: "This is where most resumes get weak: they substitute adjectives for evidence.",
      bullets: [
        "Reduced technical friction by simplifying implementation paths and clarifying ownership.",
        "Improved reliability by removing weak assumptions instead of decorating unstable systems.",
        "Made hard work easier for others through better structure, documentation, and prioritization."
      ]
    },
    {
      key: "contact",
      title: "Contact",
      subtitle: "A recruiter should know exactly how to act within seconds.",
      bullets: [
        "Email: you@example.com",
        "LinkedIn: linkedin.com/in/your-profile",
        "GitHub: github.com/your-profile"
      ]
    }
  ]
};

const heroName = document.getElementById("heroName");
const heroTitle = document.getElementById("heroTitle");
const heroSummary = document.getElementById("heroSummary");
const detailIndex = document.getElementById("detailIndex");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailBullets = document.getElementById("detailBullets");
const moduleOrbit = document.getElementById("moduleOrbit");
const moduleNav = document.getElementById("moduleNav");
const beamParticles = document.getElementById("beamParticles");
const statRail = document.getElementById("statRail");
const stage = document.getElementById("stage");
const world = document.getElementById("world");
const orbitButton = document.getElementById("orbitButton");
const centerButton = document.getElementById("centerButton");
const focusButton = document.getElementById("focusButton");

heroName.textContent = resumeData.profile.name;
heroTitle.textContent = resumeData.profile.title;
heroSummary.textContent = resumeData.profile.summary;
statRail.innerHTML = resumeData.profile.stats
  .map(
    (item) => `
      <div class="stat-chip">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `
  )
  .join("");

const accents = ["var(--cyan)", "var(--blue)", "var(--violet)", "var(--green)", "#a9fcff", "#ffd6ff"];
const cards = [];
const particles = [];
const baseAngles = resumeData.sections.map((_, index) => index * (360 / resumeData.sections.length));
const orbitRadius = 315;

let selectedIndex = 0;
let rotationX = -19;
let rotationY = 18;
let scale = 1;
let targetRotationX = rotationX;
let targetRotationY = rotationY;
let targetScale = scale;
let dragging = false;
let autoOrbit = true;
let focusMode = false;
let orbitPhase = 0;

function updateDetail(index) {
  const section = resumeData.sections[index];
  selectedIndex = index;

  detailIndex.textContent = String(index + 1).padStart(2, "0");
  detailTitle.textContent = section.title;
  detailSubtitle.textContent = section.subtitle;
  detailBullets.innerHTML = section.bullets.map((bullet) => `<li>${bullet}</li>`).join("");

  cards.forEach((card, cardIndex) => {
    card.anchor.classList.toggle("is-selected", cardIndex === index);
  });

  Array.from(moduleNav.children).forEach((pill, pillIndex) => {
    pill.classList.toggle("active", pillIndex === index);
  });
}

function buildNav() {
  resumeData.sections.forEach((section, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "module-pill";
    pill.innerHTML = `
      <div class="pill-left">
        <span class="pill-key">${section.key}</span>
        <span class="pill-title">${section.title}</span>
      </div>
      <span class="pill-index">${String(index + 1).padStart(2, "0")}</span>
    `;

    pill.addEventListener("click", () => {
      updateDetail(index);
      focusCard(index);
    });

    moduleNav.appendChild(pill);
  });
}

function buildCards() {
  resumeData.sections.forEach((section, index) => {
    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "module-anchor";
    anchor.style.setProperty("--accent", accents[index % accents.length]);
    anchor.setAttribute("aria-label", `Open ${section.title}`);

    const stub = document.createElement("div");
    stub.className = "module-stub";

    const card = document.createElement("div");
    card.className = "module-card";

    const glow = document.createElement("div");
    glow.className = "module-glow";

    const face = document.createElement("div");
    face.className = "module-face";
    face.innerHTML = `
      <span class="module-chip">Module · ${section.key}</span>
      <span class="module-number">${String(index + 1).padStart(2, "0")}</span>
      <h3 class="module-title">${section.title}</h3>
      <p class="module-subtitle">${section.subtitle}</p>
    `;

    card.append(glow, face);
    anchor.append(stub, card);
    moduleOrbit.appendChild(anchor);

    anchor.addEventListener("click", () => {
      updateDetail(index);
      focusCard(index);
    });

    cards.push({
      anchor,
      stub,
      card,
      baseAngle: baseAngles[index],
      lift: index % 2 === 0 ? -186 : -232,
      seed: index * 0.93,
      depth: index % 2 === 0 ? 0 : 22
    });
  });
}

function buildParticles() {
  for (let i = 0; i < 42; i += 1) {
    const particle = document.createElement("div");
    particle.className = "particle";
    beamParticles.appendChild(particle);

    particles.push({
      el: particle,
      angle: Math.random() * Math.PI * 2,
      radius: 16 + Math.random() * 54,
      height: Math.random() * 360,
      speed: 0.55 + Math.random() * 1.1,
      drift: 0.2 + Math.random() * 0.85,
      size: 0.7 + Math.random() * 1.25
    });
  }
}

function layoutCards(timeMs) {
  const t = timeMs / 1000;

  cards.forEach((entry, index) => {
    const angle = entry.baseAngle + orbitPhase;
    const y = entry.lift + Math.sin(t * 1.15 + entry.seed) * 10;
    const z = orbitRadius + entry.depth + (index === selectedIndex ? 20 : 0);
    const wobbleX = Math.sin(t * 0.9 + entry.seed) * 2.4;
    const wobbleY = Math.cos(t * 0.8 + entry.seed) * 2.8;
    const scaleBoost = index === selectedIndex ? 1.08 : 1;

    entry.anchor.style.transform = `rotateY(${angle}deg) translate3d(0, ${y}px, ${z}px)`;
    entry.stub.style.height = `${z - 44}px`;
    entry.stub.style.transform = `translate3d(0, 0, -${z - 44}px) rotateX(90deg)`;

    // Critical fix: front faces outward, not inward.
    entry.card.style.transform = `
      translate3d(-50%, -50%, 0)
      rotateX(${wobbleX}deg)
      rotateY(${wobbleY}deg)
      scale(${scaleBoost})
    `;
  });
}

function layoutParticles(timeMs) {
  const t = timeMs / 1000;

  particles.forEach((particle) => {
    particle.height += particle.speed * 1.6;

    if (particle.height > 360) {
      particle.height = 0;
      particle.angle = Math.random() * Math.PI * 2;
      particle.radius = 16 + Math.random() * 56;
    }

    const x = Math.cos(particle.angle + t * particle.drift) * particle.radius;
    const z = Math.sin(particle.angle + t * particle.drift) * particle.radius;
    const y = -28 - particle.height;
    const scaleValue = particle.size + Math.sin(t * 2.6 + particle.angle) * 0.12;

    particle.el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scaleValue})`;
  });
}

function applyWorldTransform() {
  rotationX += (targetRotationX - rotationX) * 0.11;
  rotationY += (targetRotationY - rotationY) * 0.11;
  scale += (targetScale - scale) * 0.11;

  world.style.transform = `translate3d(0, 54px, 0) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`;
}

function focusCard(index) {
  autoOrbit = false;
  focusMode = true;
  orbitButton.textContent = "Resume Orbit";

  const angle = (baseAngles[index] + orbitPhase) % 360;
  targetRotationY = 360 - angle;
  targetRotationX = -16;
  targetScale = 1.08;
}

function centerStage() {
  focusMode = false;
  targetRotationX = -19;
  targetRotationY = 18;
  targetScale = 1;
}

function animate(timeMs) {
  if (autoOrbit && !dragging && !focusMode) {
    targetRotationY += 0.03;
    orbitPhase += 0.045;
  }

  applyWorldTransform();
  layoutCards(timeMs);
  layoutParticles(timeMs);

  requestAnimationFrame(animate);
}

let dragStartX = 0;
let dragStartY = 0;
let dragRotationX = rotationX;
let dragRotationY = rotationY;

stage.addEventListener("pointerdown", (event) => {
  dragging = true;
  focusMode = false;
  stage.classList.add("dragging");
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragRotationX = targetRotationX;
  dragRotationY = targetRotationY;
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", (event) => {
  if (!dragging) return;

  const dx = event.clientX - dragStartX;
  const dy = event.clientY - dragStartY;
  targetRotationY = dragRotationY + dx * 0.24;
  targetRotationX = Math.max(-62, Math.min(6, dragRotationX - dy * 0.16));
});

function endDrag(event) {
  dragging = false;
  stage.classList.remove("dragging");
  if (event?.pointerId !== undefined) {
    try {
      stage.releasePointerCapture(event.pointerId);
    } catch {
      // no-op
    }
  }
}

stage.addEventListener("pointerup", endDrag);
stage.addEventListener("pointercancel", endDrag);
stage.addEventListener("pointerleave", () => {
  if (!dragging) return;
  dragging = false;
  stage.classList.remove("dragging");
});

stage.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    targetScale = Math.max(0.74, Math.min(1.42, targetScale - delta * 0.06));
  },
  { passive: false }
);

orbitButton.addEventListener("click", () => {
  autoOrbit = !autoOrbit;
  focusMode = false;
  orbitButton.textContent = autoOrbit ? "Pause Orbit" : "Resume Orbit";
});

centerButton.addEventListener("click", centerStage);
focusButton.addEventListener("click", () => focusCard(selectedIndex));

window.addEventListener("keydown", (event) => {
  if (event.key >= "1" && event.key <= String(resumeData.sections.length)) {
    const index = Number(event.key) - 1;
    updateDetail(index);
    focusCard(index);
  }

  if (event.code === "Space") {
    event.preventDefault();
    autoOrbit = !autoOrbit;
    focusMode = false;
    orbitButton.textContent = autoOrbit ? "Pause Orbit" : "Resume Orbit";
  }
});

buildNav();
buildCards();
buildParticles();
updateDetail(0);
requestAnimationFrame(animate);
