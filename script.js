const resumeData = {
  profile: {
    name: "Your Name",
    title: "Software Engineer · Systems Builder · Product-Minded Developer",
    summary:
      "I build reliable systems and ship polished user experiences. My strength is turning complex requirements into clean execution, then presenting the result in a way that feels sharp instead of generic.",
    about:
      "Use this section to explain the type of engineer or operator you are, what environment you perform best in, and the kind of problems you consistently solve better than average. Keep it factual. Avoid empty adjectives.",
    highlights: [
      "Built and maintained production-grade features with measurable user or business impact.",
      "Comfortable across engineering execution, debugging, system design, and delivery under constraints.",
      "Able to communicate technical work clearly to recruiters, hiring managers, and cross-functional teams."
    ],
    focusAreas: [
      "Backend Engineering",
      "Frontend Systems",
      "Cloud Platforms",
      "APIs & Integration",
      "Performance Optimization",
      "Product Delivery"
    ],
    tags: ["Interactive Resume", "Recruiter Friendly", "High Signal", "Fast Review"],
    contactLine:
      "Add your preferred contact path here. Keep it simple: what roles you want, where you are based, and how to reach you.",
    contactLinks: [
      { label: "Email", href: "mailto:you@example.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "GitHub", href: "https://github.com" }
    ],
    roleInterests: ["Senior Engineer", "Platform Engineer", "Founding Engineer", "Solutions Architect"],
    resumeLink: "#",
    reviewLines: [
      "> identity.check --passed",
      "> profile.signal --stable",
      "> recruiter.summary --ready",
      "> strongest assets: execution / systems / ownership",
      "> open mission files below"
    ]
  },
  stats: [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Shipped", value: "12" },
    { label: "Domains", value: "06" },
    { label: "Response Time", value: "FAST" }
  ],
  experience: [
    {
      period: "2024 — Present",
      company: "Your Current Company",
      role: "Senior Software Engineer",
      location: "Remote / City, Country",
      description:
        "Lead delivery of platform and product work across internal stakeholders, focusing on reliability, performance, and maintainability.",
      bullets: [
        "Reduced delivery friction by improving architecture and simplifying implementation paths.",
        "Worked across product, design, and engineering to ship features with stronger quality control.",
        "Owned difficult debugging and stabilization work instead of pushing it downstream."
      ]
    },
    {
      period: "2022 — 2024",
      company: "Previous Company",
      role: "Software Engineer",
      location: "City, Country",
      description:
        "Built customer-facing and internal systems with emphasis on clean APIs, solid frontend behavior, and predictable release quality.",
      bullets: [
        "Delivered full-stack features from technical planning to production release.",
        "Improved team velocity by documenting systems and removing repeated manual work.",
        "Contributed to performance improvements and operational visibility."
      ]
    },
    {
      period: "2020 — 2022",
      company: "Earlier Role or Internship",
      role: "Engineer / Analyst",
      location: "City, Country",
      description:
        "Built foundational skills in implementation, testing, and cross-functional execution.",
      bullets: [
        "Supported delivery of production work with strong attention to detail.",
        "Learned to work with real constraints rather than academic assumptions.",
        "Built the base layer for later higher-leverage roles."
      ]
    }
  ],
  skills: [
    { category: "Backend", name: "Node.js / TypeScript", level: 90 },
    { category: "Backend", name: "Python", level: 86 },
    { category: "Backend", name: "API Design", level: 88 },
    { category: "Frontend", name: "HTML / CSS / JavaScript", level: 92 },
    { category: "Frontend", name: "React", level: 84 },
    { category: "Frontend", name: "UX for Engineers", level: 80 },
    { category: "Cloud", name: "Docker", level: 79 },
    { category: "Cloud", name: "CI/CD", level: 82 },
    { category: "Cloud", name: "Observability", level: 75 },
    { category: "Data", name: "SQL", level: 84 },
    { category: "Data", name: "Data Modeling", level: 73 },
    { category: "Data", name: "Performance Tuning", level: 78 }
  ],
  projects: [
    {
      title: "Holographic Resume Interface",
      meta: "Portfolio Experience",
      description:
        "An interactive personal site built to present qualifications in a more memorable interface without sacrificing recruiter readability.",
      impact: [
        "Combines animated visual identity with structured career information.",
        "Supports quick section jumps, project inspection, and lightweight command search.",
        "Optimized as a static deploy with no build step required."
      ],
      stack: ["HTML", "CSS", "JavaScript", "Canvas"],
      links: [
        { label: "Live Demo", href: "#" },
        { label: "Source", href: "#" }
      ]
    },
    {
      title: "Platform Reliability Dashboard",
      meta: "Internal Tooling",
      description:
        "A systems dashboard for surfacing service health, recent incidents, and priority actions in one operational view.",
      impact: [
        "Improved operational awareness for cross-functional users.",
        "Reduced time wasted switching between fragmented tooling.",
        "Made the state of the system easier to understand under pressure."
      ],
      stack: ["React", "Node.js", "REST APIs", "Charts"],
      links: [
        { label: "Case Study", href: "#" },
        { label: "GitHub", href: "#" }
      ]
    },
    {
      title: "Automation Pipeline",
      meta: "Engineering Productivity",
      description:
        "A workflow that automated repetitive validation and release tasks so the team spent less time on low-leverage manual work.",
      impact: [
        "Reduced manual effort and inconsistency.",
        "Made release handling more predictable.",
        "Improved confidence during repeated execution."
      ],
      stack: ["Python", "CLI", "GitHub Actions"],
      links: [
        { label: "Overview", href: "#" },
        { label: "Source", href: "#" }
      ]
    },
    {
      title: "Performance Tuning Initiative",
      meta: "Optimization",
      description:
        "A focused effort to identify bottlenecks, instrument weak spots, and improve responsiveness in a real product flow.",
      impact: [
        "Cut waste in critical execution paths.",
        "Improved end-user responsiveness.",
        "Created clearer baselines for future work."
      ],
      stack: ["Profiling", "Metrics", "System Design"],
      links: [
        { label: "Summary", href: "#" },
        { label: "Results", href: "#" }
      ]
    }
  ]
};

const state = {
  skillFilter: "All",
  commandIndex: 0,
  commandItems: []
};

const selectors = {
  brandName: document.getElementById("brandName"),
  heroName: document.getElementById("heroName"),
  heroSummary: document.getElementById("heroSummary"),
  heroTags: document.getElementById("heroTags"),
  statsGrid: document.getElementById("statsGrid"),
  typewriter: document.getElementById("typewriter"),
  aboutText: document.getElementById("aboutText"),
  focusAreas: document.getElementById("focusAreas"),
  highlightsList: document.getElementById("highlightsList"),
  experienceTimeline: document.getElementById("experienceTimeline"),
  skillFilters: document.getElementById("skillFilters"),
  skillGrid: document.getElementById("skillGrid"),
  projectGrid: document.getElementById("projectGrid"),
  contactLine: document.getElementById("contactLine"),
  contactActions: document.getElementById("contactActions"),
  roleInterests: document.getElementById("roleInterests"),
  resumeLink: document.getElementById("resumeLink"),
  commandPalette: document.getElementById("commandPalette"),
  commandInput: document.getElementById("commandInput"),
  commandResults: document.getElementById("commandResults"),
  commandButton: document.getElementById("commandButton"),
  projectModal: document.getElementById("projectModal"),
  modalBody: document.getElementById("modalBody"),
  closeModal: document.getElementById("closeModal"),
  signalBoost: document.getElementById("signalBoost"),
  cursorGlow: document.getElementById("cursorGlow")
};

function renderProfile() {
  const { profile, stats } = resumeData;
  selectors.brandName.textContent = profile.name;
  selectors.heroName.textContent = profile.name;
  selectors.heroSummary.textContent = profile.summary;
  selectors.aboutText.textContent = profile.about;
  selectors.contactLine.textContent = profile.contactLine;
  selectors.resumeLink.href = profile.resumeLink;

  selectors.heroTags.innerHTML = profile.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  selectors.statsGrid.innerHTML = stats
    .map(
      (stat) => `
      <div class="stat">
        <span class="stat-value">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>`
    )
    .join("");

  selectors.focusAreas.innerHTML = profile.focusAreas
    .map((item) => `<span class="chip">${item}</span>`)
    .join("");

  selectors.roleInterests.innerHTML = profile.roleInterests
    .map((item) => `<span class="chip">${item}</span>`)
    .join("");

  selectors.highlightsList.innerHTML = profile.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");

  selectors.contactActions.innerHTML = profile.contactLinks
    .map(
      (link) => `<a class="primary-btn contact-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
    )
    .join("");
}

function renderExperience() {
  selectors.experienceTimeline.innerHTML = resumeData.experience
    .map(
      (item) => `
      <article class="timeline-item reveal">
        <div class="timeline-card hologram-card tilt-card">
          <div class="timeline-head">
            <div>
              <div class="timeline-period">${item.period}</div>
              <h3 class="timeline-role">${item.role}</h3>
              <div class="timeline-company">${item.company}</div>
            </div>
            <div class="timeline-label">${item.location}</div>
          </div>
          <p class="timeline-description">${item.description}</p>
          <ul class="timeline-bullets">
            ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </div>
      </article>`
    )
    .join("");
}

function renderSkillFilters() {
  const categories = ["All", ...new Set(resumeData.skills.map((skill) => skill.category))];

  selectors.skillFilters.innerHTML = categories
    .map(
      (category) => `
      <button
        class="filter-btn ${category === state.skillFilter ? "active" : ""}"
        type="button"
        data-skill-filter="${category}"
      >
        ${category}
      </button>`
    )
    .join("");
}

function renderSkills() {
  const filtered =
    state.skillFilter === "All"
      ? resumeData.skills
      : resumeData.skills.filter((skill) => skill.category === state.skillFilter);

  selectors.skillGrid.innerHTML = filtered
    .map(
      (skill) => `
      <article class="hologram-card skill-card reveal tilt-card">
        <div class="skill-head">
          <div>
            <div class="project-meta">${skill.category}</div>
            <h3>${skill.name}</h3>
          </div>
          <div class="skill-level">${skill.level}%</div>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" style="width:${skill.level}%"></div>
        </div>
      </article>`
    )
    .join("");

  bindTilt();
  bindReveal();
}

function renderProjects() {
  selectors.projectGrid.innerHTML = resumeData.projects
    .map(
      (project, index) => `
      <article class="hologram-card project-card reveal tilt-card">
        <div class="project-head">
          <div>
            <div class="project-meta">${project.meta}</div>
            <h3 class="project-title">${project.title}</h3>
          </div>
          <span class="chip">${project.stack.length} tools</span>
        </div>
        <p class="project-description">${project.description}</p>
        <div class="chip-wrap">
          ${project.stack.map((tool) => `<span class="chip">${tool}</span>`).join("")}
        </div>
        <div class="project-actions">
          <button class="ghost-btn" type="button" data-project-open="${index}">Inspect</button>
          ${project.links
            .map(
              (link) => `<a class="project-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
            )
            .join("")}
        </div>
      </article>`
    )
    .join("");
}

function bindSkillFilterEvents() {
  selectors.skillFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-skill-filter]");
    if (!button) return;
    state.skillFilter = button.dataset.skillFilter;
    renderSkillFilters();
    renderSkills();
  });
}

function openProjectModal(index) {
  const project = resumeData.projects[index];
  if (!project) return;

  selectors.modalBody.innerHTML = `
    <div class="modal-head">
      <div>
        <div class="project-meta">${project.meta}</div>
        <h2>${project.title}</h2>
      </div>
      <div class="chip-wrap">
        ${project.stack.map((item) => `<span class="modal-chip">${item}</span>`).join("")}
      </div>
    </div>
    <p class="modal-copy">${project.description}</p>
    <h3>Impact</h3>
    <ul class="bullet-list">
      ${project.impact.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <h3>Links</h3>
    <div class="contact-actions">
      ${project.links
        .map(
          (link) => `<a class="primary-btn" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
        )
        .join("")}
    </div>`;

  selectors.projectModal.classList.remove("hidden");
  selectors.projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  selectors.projectModal.classList.add("hidden");
  selectors.projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function bindProjectEvents() {
  selectors.projectGrid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-open]");
    if (!trigger) return;
    openProjectModal(Number(trigger.dataset.projectOpen));
  });

  selectors.closeModal.addEventListener("click", closeProjectModal);
  selectors.projectModal.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-modal='true']")) closeProjectModal();
  });
}

function bindDockJump() {
  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.jump)?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function bindReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function bindTilt() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function runTypewriter(lines) {
  let lineIndex = 0;
  let charIndex = 0;
  let rendered = "";

  function tick() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    rendered = `${rendered}${currentLine[charIndex] || ""}`;
    selectors.typewriter.textContent = rendered;
    charIndex += 1;

    if (charIndex > currentLine.length) {
      rendered += "\n";
      selectors.typewriter.textContent = rendered;
      lineIndex += 1;
      charIndex = 0;
      setTimeout(tick, 220);
      return;
    }

    setTimeout(tick, 24);
  }

  tick();
}

function renderCommands(query = "") {
  const commands = [
    {
      label: "Go to About",
      keywords: ["about", "bio", "profile"],
      action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      label: "Go to Experience",
      keywords: ["experience", "timeline", "career"],
      action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      label: "Go to Projects",
      keywords: ["projects", "work", "portfolio"],
      action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      label: "Go to Contact",
      keywords: ["contact", "email", "reach"],
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      label: "Open Resume Link",
      keywords: ["resume", "cv", "download"],
      action: () => window.open(resumeData.profile.resumeLink, "_blank")
    }
  ];

  const normalized = query.trim().toLowerCase();
  state.commandItems = commands.filter((command) => {
    if (!normalized) return true;
    return [command.label.toLowerCase(), ...command.keywords].some((value) => value.includes(normalized));
  });

  state.commandIndex = 0;
  selectors.commandResults.innerHTML = state.commandItems
    .map(
      (item, index) => `
      <button class="command-item ${index === 0 ? "active" : ""}" type="button" data-command-index="${index}">
        ${item.label}
      </button>`
    )
    .join("");
}

function openPalette() {
  selectors.commandPalette.classList.remove("hidden");
  selectors.commandPalette.setAttribute("aria-hidden", "false");
  renderCommands();
  selectors.commandInput.value = "";
  setTimeout(() => selectors.commandInput.focus(), 10);
}

function closePalette() {
  selectors.commandPalette.classList.add("hidden");
  selectors.commandPalette.setAttribute("aria-hidden", "true");
}

function executeCommand(index) {
  const item = state.commandItems[index];
  if (!item) return;
  closePalette();
  item.action();
}

function updateCommandActiveState() {
  document.querySelectorAll("[data-command-index]").forEach((button, index) => {
    button.classList.toggle("active", index === state.commandIndex);
  });
}

function bindPaletteEvents() {
  selectors.commandButton.addEventListener("click", openPalette);
  selectors.commandInput.addEventListener("input", (event) => renderCommands(event.target.value));
  selectors.commandPalette.addEventListener("click", (event) => {
    if (event.target.matches("[data-close-palette='true']")) closePalette();
    const item = event.target.closest("[data-command-index]");
    if (item) executeCommand(Number(item.dataset.commandIndex));
  });

  document.addEventListener("keydown", (event) => {
    const paletteOpen = !selectors.commandPalette.classList.contains("hidden");

    if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
      event.preventDefault();
      paletteOpen ? closePalette() : openPalette();
      return;
    }

    if (!paletteOpen) return;

    if (event.key === "Escape") {
      closePalette();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      state.commandIndex = Math.min(state.commandIndex + 1, state.commandItems.length - 1);
      updateCommandActiveState();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      state.commandIndex = Math.max(state.commandIndex - 1, 0);
      updateCommandActiveState();
    } else if (event.key === "Enter") {
      event.preventDefault();
      executeCommand(state.commandIndex);
    }
  });
}

function bindScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll("[data-section-link]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("active", link.dataset.sectionLink === entry.target.id));
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
}

function bindSignalBoost() {
  selectors.signalBoost.addEventListener("click", () => {
    document.body.animate(
      [
        { filter: "brightness(1) saturate(1)" },
        { filter: "brightness(1.08) saturate(1.15)" },
        { filter: "brightness(1) saturate(1)" }
      ],
      { duration: 850, easing: "ease-out" }
    );
  });
}

function bindCursorGlow() {
  window.addEventListener("pointermove", (event) => {
    selectors.cursorGlow.style.left = `${event.clientX}px`;
    selectors.cursorGlow.style.top = `${event.clientY}px`;
  });
}

function initHoloCanvas() {
  const canvas = document.getElementById("holo-bg");
  const ctx = canvas.getContext("2d");
  const particles = [];
  const particleCount = 85;
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.4
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      const dxm = particle.x - mouse.x;
      const dym = particle.y - mouse.y;
      const mouseDist = Math.hypot(dxm, dym);

      if (mouseDist < 140) {
        particle.x += dxm > 0 ? 0.22 : -0.22;
        particle.y += dym > 0 ? 0.22 : -0.22;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(121, 244, 255, 0.8)";
      ctx.fill();

      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(121, 244, 255, ${(1 - dist / 110) * 0.16})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  window.addEventListener("pointermove", (event) => {
    mouse = { x: event.clientX, y: event.clientY };
  });
}

function init() {
  renderProfile();
  renderExperience();
  renderSkillFilters();
  renderSkills();
  renderProjects();
  bindSkillFilterEvents();
  bindProjectEvents();
  bindDockJump();
  bindReveal();
  bindTilt();
  bindPaletteEvents();
  bindScrollSpy();
  bindSignalBoost();
  bindCursorGlow();
  initHoloCanvas();
  runTypewriter(resumeData.profile.reviewLines);
}

init();
