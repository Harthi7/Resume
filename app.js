const resumeData = {
  name: "Abdullah Alharthi",
  title: "Software Engineer",
  tagline:
    "Software engineer at IBM working on watsonx.data, a distributed data and AI platform running on Kubernetes. Experience building backend services in Java and Spring, designing REST APIs, supporting production workloads, and improving CI/CD pipelines for containerized services.",
  meta: [
    { label: "Location", value: "Riyadh, Saudi Arabia" },
    { label: "Company", value: "IBM" },
    { label: "Platform", value: "watsonx.data" },
    { label: "Focus", value: "Backend services · CI/CD" }
  ],
  leftSections: [
    {
      title: "Experience",
      items: [
        "IBM | Software Engineer | Riyadh, Saudi Arabia | June 2024 - Present",
        "Build and maintain backend services for IBM watsonx.data, a distributed data and AI platform running on Kubernetes, with focus on secure and reliable service-to-service communication.",
        "Design and implement REST APIs in Java using Spring and JAX-RS, including input validation, standardized error handling, pagination, and authorization aligned with internal security policies.",
        "Refactored and maintained JavaScript backend services for the watsonx.data VS Code Plugin, managing the lifecycle of Spark compute sessions including creation, reuse, cleanup, and isolation.",
        "Migrated a production microservice from Go to Java Spring and updated Nginx routing to preserve external API behavior and minimize disruption to client integrations.",
        "Containerized backend services with Docker and prepared them for production deployment with health endpoints, environment-based configuration, and centralized logging compatibility.",
        "Deployed and operated services on Kubernetes using manifests, Deployments, Services, ConfigMaps, and Secrets; supported rollout, rollback, and performance-tuning activities.",
        "Improved CI/CD pipelines in GitHub Actions and Jenkins by removing redundant steps and enforcing automated testing and SonarQube checks to shorten feedback cycles for developers."
      ]
    },
    {
      title: "Education",
      items: [
        "Bachelor's in Computer Engineering | California State University, San Bernardino",
        "Relevant Coursework: Data Structures and Algorithms, Operating Systems, Databases, Computer Networks, Machine Learning"
      ]
    }
  ],
  rightSections: [
    {
      title: "Technical Skills",
      items: [
        "Languages: Java, Python, SQL, Bash, JavaScript",
        "Backend: Spring, Spring Boot, JAX-RS, REST APIs, JSON, HTTP, Microservices",
        "Platform & Infrastructure: Docker, Kubernetes, Linux, Nginx",
        "CI/CD & Tooling: Git, GitHub, GitHub Actions, Jenkins, SonarQube",
        "Databases: PostgreSQL, MySQL, Schema Migrations, Basic Query Optimization",
        "Engineering Practices: Unit Testing, Integration Testing, Logging, Metrics, Observability, Code Reviews, Agile/Scrum"
      ]
    },
    {
      title: "Certifications",
      items: [
        "AWS Fundamentals - Coursera",
        "Machine Learning Specialization - Coursera"
      ]
    }
  ],
  contacts: [
    {
      label: "Email",
      value: "Abdullah-harthi7@live.com",
      href: "mailto:Abdullah-harthi7@live.com"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/abdullah-alharthi-20244b1a6",
      href: "https://linkedin.com/in/abdullah-alharthi-20244b1a6"
    }
  ],
  footerLeft: "IBM watsonx.data · Software Engineer",
  footerRight: "Java · Spring · Kubernetes · CI/CD"
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

const layout = {
  sheetBaseY: -92,
  sheetFloatAmplitude: 3.5,
  sparkAnchorY: 364,
  sparkAnchorZ: 24,
  sparkMaxHeight: 46,
  sparkMinRadius: 4,
  sparkRadiusRange: 20
};

const hudCompactThreshold = 1.02;

function renderSectionBlock(section, className = "") {
  const blockClass = ["section-block", className].filter(Boolean).join(" ");
  const lead = section.lead ? `<p class="section-lead">${section.lead}</p>` : "";

  return `
    <section class="${blockClass}">
      <h3 class="section-title">${section.title}</h3>
      ${lead}
      <ul class="resume-list">
        ${section.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderContactLine(item) {
  const valueMarkup = item.href
    ? `<a href="${item.href}" target="_blank" rel="noreferrer">${item.value}</a>`
    : `<span>${item.value}</span>`;

  return `
    <div class="contact-line">
      <strong>${item.label}</strong>
      ${valueMarkup}
    </div>
  `;
}

function renderResumeFace() {
  const experienceSection = resumeData.leftSections.find((section) => section.title === "Experience");
  const educationSection = resumeData.leftSections.find((section) => section.title === "Education");
  const technicalSkillsSection = resumeData.rightSections.find((section) => section.title === "Technical Skills");
  const certificationsSection = resumeData.rightSections.find((section) => section.title === "Certifications");

  const normalizedExperienceSection = experienceSection
    ? {
        ...experienceSection,
        lead: experienceSection.items[0],
        items: experienceSection.items.slice(1)
      }
    : null;

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

        ${normalizedExperienceSection ? renderSectionBlock(normalizedExperienceSection, "section-experience") : ""}

        <div class="section-grid section-grid-supporting">
          <div class="section-column section-column-stack">
            ${educationSection ? renderSectionBlock(educationSection, "section-supporting") : ""}
            ${certificationsSection ? renderSectionBlock(certificationsSection, "section-supporting") : ""}
          </div>
          <div class="section-column">
            ${technicalSkillsSection ? renderSectionBlock(technicalSkillsSection, "section-supporting") : ""}
          </div>
        </div>

        <section class="section-block section-contact">
          <h3 class="section-title">Contact</h3>
          <div class="contact-grid">
            ${resumeData.contacts.map(renderContactLine).join("")}
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
  for (let i = 0; i < 20; i += 1) {
    const spark = document.createElement("div");
    spark.className = "spark";
    sparkLayer.appendChild(spark);

    sparks.push({
      el: spark,
      angle: Math.random() * Math.PI * 2,
      radius: layout.sparkMinRadius + Math.random() * layout.sparkRadiusRange,
      height: Math.random() * (layout.sparkMaxHeight * 0.8),
      speed: 0.18 + Math.random() * 0.18,
      drift: 0.08 + Math.random() * 0.18,
      scale: 0.62 + Math.random() * 0.45
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
  const floatY = Math.sin(t * 0.9) * layout.sheetFloatAmplitude;

  sheetRig.style.transform = `translate3d(0, ${layout.sheetBaseY + floatY}px, 0)`;
  resumeSheet.style.transform = "translate3d(0, 0, 30px)";
}

function animateSparks(timeMs) {
  const t = timeMs / 1000;

  sparkLayer.style.transform = `translate3d(0, ${layout.sparkAnchorY}px, ${layout.sparkAnchorZ}px)`;

  sparks.forEach((spark) => {
    spark.height += spark.speed;

    if (spark.height > layout.sparkMaxHeight) {
      spark.height = 0;
      spark.angle = Math.random() * Math.PI * 2;
      spark.radius = layout.sparkMinRadius + Math.random() * layout.sparkRadiusRange;
    }

    const orbit = spark.angle + t * spark.drift;
    const x = Math.cos(orbit) * spark.radius;
    const z = Math.sin(orbit) * (spark.radius * 0.52);
    const y = -spark.height;
    const scale = spark.scale + Math.sin(t * 2.1 + spark.angle) * 0.05;

    spark.el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
  });
}

function syncHudMode() {
  const shouldCompact = !state.hudHidden && (state.scale > hudCompactThreshold || window.innerWidth < 900);
  hud.classList.toggle("compact", shouldCompact);
}

function loop(timeMs) {
  if (state.autoDrift && !state.dragging) {
    state.targetRotationY += 0.008;
    state.driftPhase += 0.02;
  }

  applyWorldTransform();
  syncHudMode();
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
  syncHudMode();
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

  window.addEventListener("resize", syncHudMode);
}

populateContent();
buildSparks();
bindEvents();
syncHudMode();
requestAnimationFrame(loop);
