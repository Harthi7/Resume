const resumeData = {
  profile: {
    name: "Your Name",
    title: "Software Engineer · Systems Builder · Product-Minded Operator",
    summary:
      "This version is intentionally obvious: a projector device sits at the center and emits floating resume modules you can inspect from different angles. Replace the content, not the structure.",
    metrics: [
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
      subtitle: "What you do, where you operate, and what kind of technical problems you solve.",
      bullets: [
        "Backend and platform-oriented engineer who prefers technically real work over cosmetic output.",
        "Strong across debugging, delivery, systems thinking, and communication with non-specialists.",
        "Best fit: reliability, performance, platform engineering, automation, and product-facing infrastructure."
      ]
    },
    {
      key: "experience",
      title: "Experience",
      subtitle: "Describe roles by outcomes, scope, and ownership instead of dumping task lists.",
      bullets: [
        "Owned hard implementation work where stability mattered more than appearances.",
        "Shipped across backend, tooling, and internal workflows under practical constraints.",
        "Improved systems by fixing root causes instead of treating symptoms."
      ]
    },
    {
      key: "projects",
      title: "Projects",
      subtitle: "Choose proof of judgment, autonomy, and measurable results.",
      bullets: [
        "Built an interactive holographic resume experience with central projection and orbiting modules.",
        "Created automation that reduced repeated manual work and lowered friction for collaborators.",
        "Delivered performance-focused features where clarity and responsiveness both mattered."
      ]
    },
    {
      key: "skills",
      title: "Skills",
      subtitle: "List what you can defend in an interview, not every keyword you have touched.",
      bullets: [
        "Core: JavaScript, TypeScript, Python, APIs, debugging, delivery discipline.",
        "Frontend: HTML, CSS, interaction design, browser performance, accessible layouts.",
        "Platform: CI/CD, observability, cloud services, operational clarity under pressure."
      ]
    },
    {
      key: "impact",
      title: "Impact",
      subtitle: "This is where resumes usually collapse. Add evidence, not adjectives.",
      bullets: [
        "Reduced technical friction by simplifying implementation paths and clarifying ownership.",
        "Improved reliability by removing weak assumptions instead of hiding them behind polish.",
        "Made complex work usable for others through better structure, documentation, and prioritization."
      ]
    },
    {
      key: "contact",
      title: "Contact",
      subtitle: "Make it easy for a recruiter or hiring manager to act immediately.",
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
const profileSummary = document.getElementById("profileSummary");
const metricGrid = document.getElementById("metricGrid");
const detailIndex = document.getElementById("detailIndex");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailBullets = document.getElementById("detailBullets");
const cardOrbit = document.getElementById("cardOrbit");
const beamParticles = document.getElementById("beamParticles");
const stage = document.getElementById("stage");
const world = document.getElementById("world");
const orbitButton = document.getElementById("orbitButton");
const centerButton = document.getElementById("centerButton");
const focusCardButton = document.getElementById("focusCardButton");

heroName.textContent = resumeData.profile.name;
heroTitle.textContent = resumeData.profile.title;
profileSummary.textContent = resumeData.profile.summary;
metricGrid.innerHTML = resumeData.profile.metrics
  .map(
    (item) => `
      <div class="metric">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
      </div>
    `
  )
  .join("");

let selectedIndex = 0;
let rotationX = -22;
let rotationY = 26;
let scale = 1;
let autoOrbit = true;
let dragging = false;
let targetRotationX = rotationX;
let targetRotationY = rotationY;
let targetScale = scale;
let focusMode = false;

const cards = [];
const particleState = [];
const orbitRadius = 330;
const baseY = -110;
const anchorAngles = resumeData.sections.map((_, index) => index * (360 / resumeData.sections.length));

function updateDetailPanel(index) {
  const section = resumeData.sections[index];
  selectedIndex = index;

  detailIndex.textContent = String(index + 1).padStart(2, "0");
  detailTitle.textContent = section.title;
  detailSubtitle.textContent = section.subtitle;
  detailBullets.innerHTML = section.bullets.map((bullet) => `<li>${bullet}</li>`).join("");

  cards.forEach((card, cardIndex) => {
    card.anchor.classList.toggle("is-selected", cardIndex === index);
  });
}

function buildCards() {
  const accents = ["var(--cyan)", "var(--blue)", "var(--violet)", "#93ffd8", "#80f4ff", "#ffd1ff"];

  resumeData.sections.forEach((section, index) => {
    const angle = anchorAngles[index];
    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "card-anchor";
    anchor.style.setProperty("--accent", accents[index % accents.length]);
    anchor.setAttribute("aria-label", `Open ${section.title}`);

    const connector = document.createElement("div");
    connector.className = "connector";

    const card3d = document.createElement("div");
    card3d.className = "card-3d";

    const glow = document.createElement("div");
    glow.className = "card-glow";

    const face = document.createElement("div");
    face.className = "card-face";
    face.innerHTML = `
      <span class="card-chip">Module · ${section.key}</span>
      <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
      <h3 class="card-title">${section.title}</h3>
      <p class="card-subtitle">${section.subtitle}</p>
    `;

    card3d.append(glow, face);
    anchor.append(connector, card3d);
    cardOrbit.append(anchor);

    anchor.addEventListener("click", () => {
      updateDetailPanel(index);
      focusCard(index);
    });

    const card = {
      anchor,
      card3d,
      connector,
      angle,
      lift: index % 2 === 0 ? -120 : -170,
      swaySeed: index * 0.9,
      depthNudge: index % 2 === 0 ? 0 : 30
    };

    cards.push(card);
  });
}

function buildParticles() {
  for (let i = 0; i < 36; i += 1) {
    const particle = document.createElement("div");
    particle.className = "particle";
    beamParticles.appendChild(particle);

    particleState.push({
      el: particle,
      angle: Math.random() * Math.PI * 2,
      radius: 18 + Math.random() * 48,
      height: Math.random() * 300,
      speed: 24 + Math.random() * 50,
      drift: 0.4 + Math.random() * 1.1,
      size: 0.8 + Math.random() * 1.2
    });
  }
}

function layoutCards(timeMs) {
  const t = timeMs / 1000;

  cards.forEach((card, index) => {
    const floatY = Math.sin(t * 1.2 + card.swaySeed) * 10;
    const wobble = Math.sin(t * 0.8 + card.swaySeed * 1.7) * 8;
    const cardIsSelected = index === selectedIndex;
    const radius = orbitRadius + (cardIsSelected ? 24 : 0);
    const y = card.lift + floatY;
    const z = radius + card.depthNudge;
    const localTiltX = cardIsSelected ? -5 : -2;
    const scaleBoost = cardIsSelected ? 1.08 : 1;

    card.anchor.style.transform = `
      rotateY(${card.angle}deg)
      translate3d(0, ${y}px, ${z}px)
    `;

    card.connector.style.transform = `translateZ(-${z - 36}px) rotateX(90deg)`;
    card.connector.style.height = `${z - 52}px`;

    card.card3d.style.transform = `
      translate3d(-50%, -50%, 0)
      rotateY(180deg)
      rotateX(${localTiltX + wobble * 0.08}deg)
      scale(${scaleBoost})
    `;
  });
}

function layoutParticles(timeMs) {
  const t = timeMs / 1000;

  particleState.forEach((particle) => {
    particle.height += particle.speed * 0.18;
    if (particle.height > 360) {
      particle.height = 0;
      particle.angle = Math.random() * Math.PI * 2;
      particle.radius = 16 + Math.random() * 46;
    }

    const x = Math.cos(particle.angle + t * particle.drift) * particle.radius;
    const z = Math.sin(particle.angle + t * particle.drift) * particle.radius;
    const y = -30 - particle.height;
    const scaleValue = particle.size + Math.sin(t * 3 + particle.angle) * 0.15;

    particle.el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scaleValue})`;
  });
}

function applyWorldTransform() {
  rotationX += (targetRotationX - rotationX) * 0.14;
  rotationY += (targetRotationY - rotationY) * 0.14;
  scale += (targetScale - scale) * 0.14;

  world.style.transform = `translate3d(0, 36px, 0) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`;
}

function focusCard(index) {
  focusMode = true;
  autoOrbit = false;
  orbitButton.textContent = "Resume Orbit";
  targetRotationY = 360 - anchorAngles[index];
  targetRotationX = -18;
  targetScale = 1.08;
}

function centerDevice() {
  focusMode = false;
  targetRotationX = -22;
  targetRotationY = 26;
  targetScale = 1;
}

function animate(timeMs) {
  if (autoOrbit && !dragging && !focusMode) {
    targetRotationY += 0.05;
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
  stage.classList.add("dragging");
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragRotationX = targetRotationX;
  dragRotationY = targetRotationY;
  focusMode = false;
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const dx = event.clientX - dragStartX;
  const dy = event.clientY - dragStartY;
  targetRotationY = dragRotationY + dx * 0.28;
  targetRotationX = Math.max(-65, Math.min(8, dragRotationX - dy * 0.18));
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
    targetScale = Math.max(0.72, Math.min(1.45, targetScale - delta * 0.06));
  },
  { passive: false }
);

orbitButton.addEventListener("click", () => {
  autoOrbit = !autoOrbit;
  focusMode = false;
  orbitButton.textContent = autoOrbit ? "Pause Orbit" : "Resume Orbit";
});

centerButton.addEventListener("click", centerDevice);
focusCardButton.addEventListener("click", () => focusCard(selectedIndex));

window.addEventListener("keydown", (event) => {
  if (event.key >= "1" && event.key <= String(resumeData.sections.length)) {
    const index = Number(event.key) - 1;
    updateDetailPanel(index);
    focusCard(index);
  }

  if (event.code === "Space") {
    event.preventDefault();
    autoOrbit = !autoOrbit;
    focusMode = false;
    orbitButton.textContent = autoOrbit ? "Pause Orbit" : "Resume Orbit";
  }
});

buildCards();
buildParticles();
updateDetailPanel(0);
requestAnimationFrame(animate);
