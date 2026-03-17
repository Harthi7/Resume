import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.179.1/examples/jsm/controls/OrbitControls.js";

const resumeData = {
  profile: {
    name: "Your Name",
    title: "Software Engineer · Systems Builder · Product-Minded Operator",
    summary:
      "This version is a true browser-based 3D experience. Replace the content here with your actual resume data, but keep the structure. It is designed to feel memorable without turning your work history into nonsense.",
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
      subtitle: "What you do, what environment you operate in, and what kind of work you want.",
      bullets: [
        "Backend and platform-focused engineer with strong execution discipline.",
        "Comfortable moving between debugging, delivery, systems thinking, and stakeholder communication.",
        "Works best on technically real problems where reliability and clarity both matter."
      ]
    },
    {
      key: "experience",
      title: "Experience",
      subtitle: "Use this to summarize roles by impact, not by task list.",
      bullets: [
        "Current role: own the difficult work instead of passing instability downstream.",
        "Previous role: shipped features across frontend, backend, and internal tooling.",
        "Earlier role: built the operational foundation that later enabled higher-leverage execution."
      ]
    },
    {
      key: "projects",
      title: "Projects",
      subtitle: "Pick projects that prove judgment, ownership, and measurable outcomes.",
      bullets: [
        "Interactive resume system with 3D rendering and modular content panels.",
        "Automation and reliability work that removed repeated manual friction.",
        "Performance-focused initiatives that improved responsiveness and clarity."
      ]
    },
    {
      key: "skills",
      title: "Skills",
      subtitle: "Do not list everything. Show the stack you can actually defend in an interview.",
      bullets: [
        "Core: JavaScript, TypeScript, Python, APIs, system debugging.",
        "Frontend: HTML, CSS, interaction design, browser performance.",
        "Platform: CI/CD, observability, cloud services, delivery under constraints."
      ]
    },
    {
      key: "impact",
      title: "Impact",
      subtitle: "This section is where most resumes are weak. Add results, not adjectives.",
      bullets: [
        "Reduced friction by simplifying technical paths and clarifying ownership.",
        "Improved reliability by fixing root causes instead of cosmetic issues.",
        "Communicated complex work cleanly enough for non-specialists to act on it."
      ]
    },
    {
      key: "contact",
      title: "Contact",
      subtitle: "This should be painfully easy to review and act on.",
      bullets: [
        "Email: you@example.com",
        "LinkedIn: linkedin.com/in/your-profile",
        "GitHub: github.com/your-profile"
      ]
    }
  ]
};

const canvas = document.getElementById("scene");
const autoRotateButton = document.getElementById("autoRotateButton");
const focusDeviceButton = document.getElementById("focusDeviceButton");
const focusCardButton = document.getElementById("focusCardButton");
const hudName = document.getElementById("hudName");
const hudTitle = document.getElementById("hudTitle");
const hudSummary = document.getElementById("hudSummary");
const metricGrid = document.getElementById("metricGrid");
const detailIndex = document.getElementById("detailIndex");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailBullets = document.getElementById("detailBullets");

hudName.textContent = resumeData.profile.name;
hudTitle.textContent = resumeData.profile.title;
hudSummary.textContent = resumeData.profile.summary;
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

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050816, 0.055);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const camera = new THREE.PerspectiveCamera(
  42,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 3.35, 10.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5.2;
controls.maxDistance = 16;
controls.maxPolarAngle = Math.PI * 0.48;
controls.target.set(0, 2.05, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.45;

const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const panels = [];
let selectedIndex = 0;
let isFocusAnimating = false;
const focusAnimation = {
  active: false,
  fromPosition: new THREE.Vector3(),
  toPosition: new THREE.Vector3(),
  fromTarget: new THREE.Vector3(),
  toTarget: new THREE.Vector3(),
  progress: 0,
  duration: 0.95
};

const root = new THREE.Group();
scene.add(root);

const hemiLight = new THREE.HemisphereLight(0x9fdbff, 0x050812, 1.25);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xcff7ff, 1.5);
dirLight.position.set(6, 10, 8);
scene.add(dirLight);

const fillLight = new THREE.PointLight(0x6b9fff, 2.3, 26, 2);
fillLight.position.set(-5, 3.4, 2);
scene.add(fillLight);

const accentLight = new THREE.PointLight(0xa585ff, 1.5, 24, 2);
accentLight.position.set(5, 5, -3);
scene.add(accentLight);

function makeGlowMaterial(color, opacity) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

function createBaseEnvironment() {
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(12, 96),
    new THREE.MeshPhongMaterial({
      color: 0x071020,
      transparent: true,
      opacity: 0.85,
      shininess: 40
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  root.add(floor);

  const grid = new THREE.GridHelper(20, 48, 0x4ae9ff, 0x173759);
  grid.material.transparent = true;
  grid.material.opacity = 0.18;
  root.add(grid);

  const ringGroup = new THREE.Group();
  root.add(ringGroup);

  [2.2, 3.6, 5.4].forEach((radius, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.02, 16, 120),
      makeGlowMaterial(i === 1 ? 0xa983ff : 0x7ffcff, i === 1 ? 0.35 : 0.24)
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.04 + i * 0.03;
    ring.userData.speed = 0.08 + i * 0.03;
    ringGroup.add(ring);
  });

  return ringGroup;
}

const ringGroup = createBaseEnvironment();

function createProjectorDevice() {
  const group = new THREE.Group();

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.75, 2.15, 0.42, 48),
    new THREE.MeshStandardMaterial({
      color: 0x0e1628,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x08131d,
      emissiveIntensity: 0.7
    })
  );
  pedestal.position.y = 0.22;
  group.add(pedestal);

  const topRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.45, 0.07, 20, 100),
    makeGlowMaterial(0x7ffcff, 0.65)
  );
  topRing.rotation.x = Math.PI / 2;
  topRing.position.y = 0.48;
  group.add(topRing);

  const deviceBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 0.12, 2.55),
    new THREE.MeshStandardMaterial({
      color: 0x101b31,
      metalness: 0.92,
      roughness: 0.25
    })
  );
  deviceBody.position.set(0, 0.58, 0);
  deviceBody.rotation.x = -0.28;
  group.add(deviceBody);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 2.1),
    new THREE.MeshBasicMaterial({
      color: 0x55f7ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    })
  );
  screen.position.set(0, 0.66, 0.03);
  screen.rotation.x = -0.28;
  group.add(screen);

  const lensCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.22, 0.5, 24),
    new THREE.MeshStandardMaterial({
      color: 0x132337,
      metalness: 0.7,
      roughness: 0.24,
      emissive: 0x4defff,
      emissiveIntensity: 1.25
    })
  );
  lensCore.position.set(0, 0.86, 0);
  group.add(lensCore);

  const coreGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 24, 24),
    makeGlowMaterial(0x7ffcff, 0.9)
  );
  coreGlow.position.set(0, 1.15, 0);
  group.add(coreGlow);

  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(1.3, 3.85, 64, 1, true),
    makeGlowMaterial(0x66ecff, 0.17)
  );
  beam.position.y = 2.75;
  group.add(beam);

  const beamShell = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.55, 3.6, 48, 1, true),
    makeGlowMaterial(0xa983ff, 0.08)
  );
  beamShell.position.y = 2.55;
  group.add(beamShell);

  group.userData.topRing = topRing;
  group.userData.screen = screen;
  group.userData.coreGlow = coreGlow;
  group.userData.beam = beam;
  group.userData.beamShell = beamShell;

  return group;
}

const device = createProjectorDevice();
root.add(device);

function createPanelTexture(section, accent) {
  const canvas = document.createElement("canvas");
  const width = 1024;
  const height = 640;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(8, 18, 39, 0.86)");
  gradient.addColorStop(1, "rgba(4, 10, 24, 0.30)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(127, 252, 255, 0.45)";
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  ctx.strokeStyle = "rgba(127, 252, 255, 0.18)";
  ctx.lineWidth = 1;
  ctx.strokeRect(34, 34, width - 68, height - 68);

  ctx.fillStyle = "rgba(127, 252, 255, 0.85)";
  ctx.font = "700 22px Inter, sans-serif";
  ctx.fillText(`MODULE :: ${section.key.toUpperCase()}`, 64, 72);

  ctx.fillStyle = accent;
  ctx.font = "800 68px Inter, sans-serif";
  ctx.fillText(section.title, 64, 154);

  ctx.fillStyle = "rgba(222, 238, 255, 0.92)";
  ctx.font = "500 28px Inter, sans-serif";
  wrapText(ctx, section.subtitle, 64, 210, 900, 40);

  ctx.fillStyle = "rgba(154, 185, 220, 0.95)";
  ctx.font = "500 26px Inter, sans-serif";
  let y = 330;
  section.bullets.slice(0, 3).forEach((bullet) => {
    ctx.fillStyle = accent;
    ctx.fillText("◆", 64, y);
    ctx.fillStyle = "rgba(229, 241, 255, 0.92)";
    wrapText(ctx, bullet, 100, y, 840, 34);
    y += 88;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word, index) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && index > 0) {
      ctx.fillText(line, x, currentY);
      line = `${word} `;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });

  ctx.fillText(line, x, currentY);
}

const accentPalette = ["#8dffff", "#9fd7ff", "#c6a7ff", "#9effd8", "#7ffcff", "#f5c7ff"];

function createPanel(section, index) {
  const accent = accentPalette[index % accentPalette.length];
  const group = new THREE.Group();

  const planeGeometry = new THREE.PlaneGeometry(2.85, 1.78);
  const panelMaterial = new THREE.MeshBasicMaterial({
    map: createPanelTexture(section, accent),
    transparent: true,
    opacity: 0.93,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const front = new THREE.Mesh(planeGeometry, panelMaterial);
  const back = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshBasicMaterial({
      map: panelMaterial.map,
      transparent: true,
      opacity: 0.82,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  back.rotation.y = Math.PI;
  group.add(front, back);

  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.96, 1.9)),
    new THREE.LineBasicMaterial({
      color: index === 2 ? 0xa983ff : 0x7ffcff,
      transparent: true,
      opacity: 0.95
    })
  );
  group.add(frame);

  const glowPlate = new THREE.Mesh(
    new THREE.PlaneGeometry(3.15, 2.1),
    makeGlowMaterial(index === 2 ? 0xa983ff : 0x7ffcff, 0.12)
  );
  group.add(glowPlate);

  const pin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.62, 12),
    makeGlowMaterial(0x7ffcff, 0.28)
  );
  pin.position.y = -1.18;
  group.add(pin);

  group.userData = {
    section,
    index,
    orbitAngle: (index / resumeData.sections.length) * Math.PI * 2,
    heightOffset: 1.95 + (index % 2) * 0.35,
    baseRadius: 3.15,
    floatSeed: index * 1.41,
    accent,
    frame,
    front,
    back,
    glowPlate,
    pin
  };

  panels.push(group);
  root.add(group);
  return group;
}

resumeData.sections.forEach((section, index) => createPanel(section, index));

function createParticleField() {
  const count = 340;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const drift = new Float32Array(count);
  const radius = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.2 + Math.random() * 1.15;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = 1 + Math.random() * 4.5;
    positions[i * 3 + 2] = Math.sin(angle) * r;
    speeds[i] = 0.2 + Math.random() * 0.5;
    drift[i] = Math.random() * Math.PI * 2;
    radius[i] = r;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x8dfcff,
    size: 0.045,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { speeds, drift, radius, positions };
  root.add(points);
  return points;
}

const particleField = createParticleField();

function updateParticleField(elapsed, delta) {
  const { positions, speeds, drift, radius } = particleField.userData;
  for (let i = 0; i < speeds.length; i += 1) {
    positions[i * 3 + 1] += speeds[i] * delta;
    if (positions[i * 3 + 1] > 5.8) {
      positions[i * 3 + 1] = 1 + Math.random() * 0.8;
    }
    const angle = drift[i] + elapsed * (0.35 + i * 0.0004);
    positions[i * 3] = Math.cos(angle) * radius[i];
    positions[i * 3 + 2] = Math.sin(angle) * radius[i];
  }
  particleField.geometry.attributes.position.needsUpdate = true;
}

function updatePanelLayout(elapsed) {
  const orbitShift = elapsed * 0.18;
  panels.forEach((panel, index) => {
    const isSelected = index === selectedIndex;
    const radius = panel.userData.baseRadius + (isSelected ? 0.55 : 0);
    const angle = panel.userData.orbitAngle + orbitShift;
    const height =
      panel.userData.heightOffset +
      Math.sin(elapsed * 1.2 + panel.userData.floatSeed) * 0.14 +
      (isSelected ? 0.08 : 0);

    panel.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    panel.lookAt(0, height - 0.05, 0);
    panel.rotateY(Math.PI);

    const targetScale = isSelected ? 1.12 : 1;
    panel.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

    panel.userData.glowPlate.material.opacity +=
      ((isSelected ? 0.22 : 0.12) - panel.userData.glowPlate.material.opacity) * 0.08;
    panel.userData.frame.material.opacity +=
      ((isSelected ? 1 : 0.82) - panel.userData.frame.material.opacity) * 0.08;
    panel.userData.front.material.opacity +=
      ((isSelected ? 1 : 0.93) - panel.userData.front.material.opacity) * 0.08;
    panel.userData.back.material.opacity +=
      ((isSelected ? 0.9 : 0.82) - panel.userData.back.material.opacity) * 0.08;
  });
}

function updateDeviceEffects(elapsed) {
  const pulse = 1 + Math.sin(elapsed * 3.2) * 0.06;
  device.userData.topRing.scale.setScalar(pulse);
  device.userData.coreGlow.scale.setScalar(1 + Math.sin(elapsed * 4.6) * 0.08);
  device.userData.beam.material.opacity = 0.14 + (Math.sin(elapsed * 2.6) + 1) * 0.04;
  device.userData.beamShell.material.opacity = 0.06 + (Math.sin(elapsed * 1.8 + 0.6) + 1) * 0.02;
  device.userData.screen.material.opacity = 0.14 + (Math.sin(elapsed * 2.2 + 0.9) + 1) * 0.04;

  ringGroup.children.forEach((ring, index) => {
    ring.rotation.z += ring.userData.speed * 0.003 + index * 0.0002;
  });
}

function updateDetailPanel(index) {
  const section = resumeData.sections[index];
  selectedIndex = index;
  detailIndex.textContent = String(index + 1).padStart(2, "0");
  detailTitle.textContent = section.title;
  detailSubtitle.textContent = section.subtitle;
  detailBullets.innerHTML = section.bullets.map((bullet) => `<li>${bullet}</li>`).join("");
}

function startFocusAnimation(panelIndex) {
  const panel = panels[panelIndex];
  if (!panel) return;

  controls.autoRotate = false;
  autoRotateButton.textContent = "Resume Orbit";

  const offset = panel.position.clone().normalize().multiplyScalar(4.25);
  const targetPos = panel.position.clone().add(offset).setY(panel.position.y + 0.85);

  focusAnimation.active = true;
  focusAnimation.progress = 0;
  focusAnimation.fromPosition.copy(camera.position);
  focusAnimation.toPosition.copy(targetPos);
  focusAnimation.fromTarget.copy(controls.target);
  focusAnimation.toTarget.copy(panel.position);
  isFocusAnimating = true;
}

function updateFocusAnimation(delta) {
  if (!focusAnimation.active) return;

  focusAnimation.progress += delta / focusAnimation.duration;
  const t = Math.min(focusAnimation.progress, 1);
  const eased = 1 - Math.pow(1 - t, 3);

  camera.position.lerpVectors(focusAnimation.fromPosition, focusAnimation.toPosition, eased);
  controls.target.lerpVectors(focusAnimation.fromTarget, focusAnimation.toTarget, eased);

  if (t >= 1) {
    focusAnimation.active = false;
    isFocusAnimating = false;
  }
}

function centerOnDevice() {
  focusAnimation.active = true;
  focusAnimation.progress = 0;
  focusAnimation.fromPosition.copy(camera.position);
  focusAnimation.toPosition.set(0, 3.35, 10.8);
  focusAnimation.fromTarget.copy(controls.target);
  focusAnimation.toTarget.set(0, 2.05, 0);
  isFocusAnimating = true;
}

function setPointerPosition(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function intersectPanels(event) {
  setPointerPosition(event);
  raycaster.setFromCamera(pointer, camera);
  const interactiveMeshes = panels.flatMap((panel) => [panel.userData.front, panel.userData.back, panel.userData.glowPlate]);
  const hits = raycaster.intersectObjects(interactiveMeshes, false);
  if (!hits.length) return null;
  const mesh = hits[0].object;
  return panels.find((panel) =>
    panel.userData.front === mesh || panel.userData.back === mesh || panel.userData.glowPlate === mesh
  );
}

renderer.domElement.addEventListener("pointerdown", (event) => {
  const panel = intersectPanels(event);
  if (!panel) return;
  updateDetailPanel(panel.userData.index);
  startFocusAnimation(panel.userData.index);
});

window.addEventListener("keydown", (event) => {
  if (event.key >= "1" && event.key <= String(resumeData.sections.length)) {
    const index = Number(event.key) - 1;
    updateDetailPanel(index);
    startFocusAnimation(index);
  }

  if (event.code === "Space") {
    event.preventDefault();
    controls.autoRotate = !controls.autoRotate;
    autoRotateButton.textContent = controls.autoRotate ? "Pause Orbit" : "Resume Orbit";
  }
});

autoRotateButton.addEventListener("click", () => {
  controls.autoRotate = !controls.autoRotate;
  autoRotateButton.textContent = controls.autoRotate ? "Pause Orbit" : "Resume Orbit";
});

focusDeviceButton.addEventListener("click", centerOnDevice);
focusCardButton.addEventListener("click", () => startFocusAnimation(selectedIndex));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

updateDetailPanel(0);

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;

  updateParticleField(elapsed, delta);
  updatePanelLayout(elapsed);
  updateDeviceEffects(elapsed);
  updateFocusAnimation(delta);

  controls.update();
  renderer.render(scene, camera);
}

animate();
