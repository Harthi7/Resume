const resumeData = {
  name: "Abdullah Alharthi",
  title: "Backend & Platform Engineer",
  tagline:
    "Systems-minded builder focused on platform reliability, automation, debugging, and technically real work.",
  meta: [
    { label: "Focus", value: "Backend · Platform · Automation" },
    { label: "Current lane", value: "Reliability, data platforms, implementation" },
    { label: "Style", value: "Product-aware, systems-first, execution-heavy" },
    { label: "Based in", value: "Saudi Arabia" }
  ],
  leftSections: [
    {
      title: "Profile",
      items: [
        "Backend and platform-oriented engineer with strong interest in reliability, debugging, system structure, and delivery under constraints.",
        "Best in roles where technical judgment, implementation discipline, and cross-functional communication all matter at the same time."
      ]
    },
    {
      title: "Technical Strengths",
      items: [
        "APIs, platform workflows, automation, debugging, CI/CD, data platform operations",
        "JavaScript, TypeScript, Python, browser UI, implementation quality, practical system design"
      ]
    }
  ],
  rightSections: [
    {
      title: "Current Work",
      items: [
        "IBM Watsonx.data related engineering work across ingestion APIs, platform behavior, and test or automation flows where reliability matters.",
        "Hands-on with issue triage, cluster behavior, root cause analysis, and implementation work that is closer to the system than to presentation."
      ]
    },
    {
      title: "Strategic Interests",
      items: [
        "Quantum computing and optimization workflows with emphasis on practical benchmarking against classical systems.",
        "Product, infrastructure, and business-side thinking where technical work needs to connect to real outcomes, not just internal activity."
      ]
    },
    {
      title: "Selected Direction",
      items: [
        "Build toward platform, backend, systems, and advanced technical roles where depth compounds instead of getting diluted into generic coordination.",
        "Use engineering credibility as the base layer for larger product, research, and venture opportunities over time."
      ]
    }
  ],
  contacts: [
    { label: "GitHub", value: "github.com/Harthi7" },
    { label: "LinkedIn", value: "linkedin.com/in/abdullah-alharthi" },
    { label: "Email", value: "your.email@example.com" }
  ],
  footerLeft: "Projected single-sheet resume · minimal hologram layout",
  footerRight: "Edit resumeData in app.js to replace placeholders and tighten claims"
};

const hud = document.getElementById("hud");
const dock = document.getElementById("dock");
const uiToggleButton = document.getElementById("uiToggleButton");
const orbitButton = document.getElementById("orbitButton");
const resetButton = document.getElementById("resetButton");
const stage = document.getElementById("stage");
const world = document.getElementById("world");
const sheetRig = document.getElementById("sheetRig");
const resumeSheet = document.getElementById("resumeSheet");
const sheetFront = document.getElementById("sheetFront");
const sheetBack = document.getElementById("sheetBack");
const sparkLayer = document.getElementById("sparkLayer");
const hudName = document.getElementById("hudName");
const hudTitle = document.getElementById("hudTitle");

const state = {
  rotationX: -2,
  rotationY: 0,
  targetRotationX: -2,
  targetRotationY: 0,
  scale: 0.96,
  targetScale: 0.96,
  dragging: false,
  autoDrift: true,
  hudHidden: false,
  driftPhase: 0,
  lastX: 0,
  lastY: 0
};

const sparks = [];

function renderSectionBlock(section) {
  return `
    <section class="section-block">
      <h3 class="section-title">${section.title}</h3>
      <ul class="resume-list">
        ${section.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderResumeFace() {
  const allSections = [...resumeData.leftSections, ...resumeData.rightSections];

  return `
    <div class="sheet-scroll">
      <div class="sheet-content">
        <header class="resume-head">
          <h2 class="resume-name">${resumeData.name}</h2>
          <p class="resume-role">${resumeData.title}</p>
          <p class="resume-summary">${resumeData.tagline}</p>
        </header>

        <div class="mini-grid">
          ${resumeData.meta
            .map(
              (item) => `
                <div class="mini-chip">
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </div>
              `
            )
            .join("")}
        </div>

        <div class="section-grid">
          ${allSections.map(renderSectionBlock).join("")}
        </div>

        <section class="section-block">
          <h3 class="section-title">Contact</h3>
          <div class="contact-grid">
            ${resumeData.contacts
              .map(
                (item) => `
                  <div class="contact-line">
                    <strong>${item.label}</strong>
                    <span>${item.value}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>

        <div class="resume-footer">
          <span>${resumeData.footerLeft}</span>
          <span>${resumeData.footerRight}</span>
        </div>
      </div>
    </div>
  `;
}

function populateContent() {
  hudName.textContent = resumeData.name;
  hudTitle.textContent = resumeData.title;

  const faceMarkup = renderResumeFace();
  sheetFront.innerHTML = faceMarkup;
  sheetBack.innerHTML = faceMarkup;

  document.querySelectorAll(".sheet-scroll").forEach((node) => {
    node.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });

    node.addEventListener(
      "wheel",
      (event) => {
        event.stopPropagation();
      },
      { passive: true }
    );
  });
}

function buildSparks() {
  for (let i = 0; i < 18; i += 1) {
    const spark = document.createElement("div");
    spark.className = "spark";
    sparkLayer.appendChild(spark);

    sparks.push({
      el: spark,
      angle: Math.random() * Math.PI * 2,
      radius: 8 + Math.random() * 34,
      height: Math.random() * 60,
      speed: 0.22 + Math.random() * 0.34,
      drift: 0.12 + Math.random() * 0.4,
      scale: 0.68 + Math.random() * 0.8
    });
  }
}

function applyWorldTransform() {
  state.rotationX += (state.targetRotationX - state.rotationX) * 0.12;
  state.rotationY += (state.targetRotationY - state.rotationY) * 0.12;
  state.scale += (state.targetScale - state.scale) * 0.12;

  world.style.transform = `translate3d(0, 0, 0) rotateX(${state.rotationX}deg) rotateY(${state.rotationY}deg) scale(${state.scale})`;
}

function animateSheet(timeMs) {
  const t = timeMs / 1000;
  const floatY = Math.sin(t * 0.9) * 4;
  const baseY = -28;

  sheetRig.style.transform = `translate3d(0, ${baseY + floatY}px, 0)`;
  resumeSheet.style.transform = `translate3d(0, 0, 30px)`;
}

function animateSparks(timeMs) {
  const t = timeMs / 1000;

  sparkLayer.style.transform = "translate3d(0, 412px, -140px)";

  sparks.forEach((spark) => {
    spark.height += spark.speed;

    if (spark.height > 72) {
      spark.height = 0;
      spark.angle = Math.random() * Math.PI * 2;
      spark.radius = 8 + Math.random() * 40;
    }

    const x = Math.cos(spark.angle + t * spark.drift) * spark.radius;
    const z = Math.sin(spark.angle + t * spark.drift) * (spark.radius * 0.32);
    const y = -spark.height;
    const scale = spark.scale + Math.sin(t * 2.1 + spark.angle) * 0.06;

    spark.el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
  });
}

function loop(timeMs) {
  if (state.autoDrift && !state.dragging) {
    state.targetRotationY += 0.008;
    state.driftPhase += 0.02;
  }

  applyWorldTransform();
  animateSheet(timeMs);
  animateSparks(timeMs);
  requestAnimationFrame(loop);
}

function resetView() {
  state.targetRotationX = -2;
  state.targetRotationY = 0;
  state.targetScale = 0.96;
}

function onPointerDown(event) {
  state.dragging = true;
  stage.classList.add("dragging");
  state.lastX = event.clientX;
  state.lastY = event.clientY;
}

function onPointerMove(event) {
  if (!state.dragging) {
    return;
  }

  const deltaX = event.clientX - state.lastX;
  const deltaY = event.clientY - state.lastY;

  state.targetRotationY += deltaX * 0.18;
  state.targetRotationX -= deltaY * 0.06;
  state.targetRotationX = Math.max(-10, Math.min(4, state.targetRotationX));

  state.lastX = event.clientX;
  state.lastY = event.clientY;
}

function onPointerUp() {
  state.dragging = false;
  stage.classList.remove("dragging");
}

function onWheel(event) {
  event.preventDefault();
  state.targetScale += event.deltaY * -0.0006;
  state.targetScale = Math.max(0.84, Math.min(1.22, state.targetScale));
}

function toggleHud() {
  state.hudHidden = !state.hudHidden;
  hud.classList.toggle("hidden", state.hudHidden);
  dock.classList.toggle("hidden", state.hudHidden);
  uiToggleButton.textContent = state.hudHidden ? "Show UI" : "Hide UI";
  uiToggleButton.setAttribute("aria-pressed", String(state.hudHidden));
}

function toggleDrift() {
  state.autoDrift = !state.autoDrift;
  orbitButton.textContent = state.autoDrift ? "Pause" : "Resume";
}

function bindEvents() {
  stage.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("wheel", onWheel, { passive: false });

  orbitButton.addEventListener("click", toggleDrift);
  resetButton.addEventListener("click", resetView);
  uiToggleButton.addEventListener("click", toggleHud);

  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "r") {
      resetView();
    }

    if (event.key.toLowerCase() === "h") {
      toggleHud();
    }

    if (event.code === "Space") {
      event.preventDefault();
      toggleDrift();
    }
  });
}

populateContent();
buildSparks();
bindEvents();
requestAnimationFrame(loop);
