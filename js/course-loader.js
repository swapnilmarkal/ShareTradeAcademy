/* =========================
   COURSE LOADER
========================= */

const params = new URLSearchParams(window.location.search);
const courseKey = params.get("course");
const course = COURSES[courseKey];

if (!course) {
  renderNotFound();
  throw new Error("Course not found");
}

function renderNotFound() {
  document.body.innerHTML = `
    <div class="not-found">
      <div class="not-found-box">
        <h1>Course Not Found</h1>
        <p>The course you're looking for doesn't exist or may have been removed.</p>

        <div class="not-found-actions">
          <button class="btn" onclick="goBack()">← Go Back</button>
          <a href="index.html#courses" class="btn secondary">View All Courses</a>
        </div>
      </div>
    </div>
  `;
}

function goBack() {
  window.history.back();
}

/* =========================
   DOM HELPERS
========================= */

const $ = (id) => document.getElementById(id);

/* =========================
   INIT PAGE DATA
========================= */

function initCourseBasics() {
  $("courseTitle").innerText = course.title;
  $("courseSubtitle").innerText = course.subtitle;
  $("sidebarTitle").innerText = course.title;
  $("price").innerText = course.price;

  document.getElementById("hero").style.backgroundImage =
    `url(${course.heroImage})`;
}

/* =========================
   HERO META + SIDEBAR
========================= */

function renderQuickFeatures() {
  const heroMeta = $("heroMeta");
  const quickFeatures = $("quickFeatures");

  course.quick.forEach(item => {
    const span = document.createElement("span");
    span.innerText = item;
    heroMeta.appendChild(span);

    const li = document.createElement("li");
    li.innerHTML = `
      <i class="ph ph-check"></i>
      <span>${item}</span>
    `;
    quickFeatures.appendChild(li);
  });
}

/* =========================
   ACCORDION
========================= */

function renderAccordion() {
  const container = $("courseAccordion");

  course.details.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "accordion-item";

    div.innerHTML = `
      <button class="accordion-header">
        <span>${index + 1}. ${item.title}</span>
        <span class="icon">+</span>
      </button>

      <div class="accordion-body">
        <p>${item.desc}</p>
      </div>
    `;

    container.appendChild(div);
  });
}

function initAccordion() {
  document.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion-header");
    if (!header) return;

    const item = header.parentElement;

    document.querySelectorAll(".accordion-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");

    updateAccordionIcons();
  });
}

function updateAccordionIcons() {
  document.querySelectorAll(".accordion-item").forEach(i => {
    const icon = i.querySelector(".icon");
    if (icon) icon.textContent = i.classList.contains("active") ? "−" : "+";
  });
}

/* =========================
   BENEFITS & FEATURES
========================= */

function renderListData() {
  const benefits = $("benefits");
  const features = $("features");

  course.benefits.forEach(text => {
    const div = document.createElement("div");
    div.className = "benefit-card";
    div.innerText = text;
    benefits.appendChild(div);
  });

  course.features.forEach(text => {
    const div = document.createElement("div");
    div.className = "feature-card";
    div.innerText = text;
    features.appendChild(div);
  });
}

/* =========================
   AUDIENCE
========================= */

function renderAudience() {
  const who = $("who");
  const outcomes = $("outcomes");

  course.who.forEach(text => {
    const li = document.createElement("li");
    li.innerText = text;
    who.appendChild(li);
  });

  course.outcomes.forEach(text => {
    const li = document.createElement("li");
    li.innerText = text;
    outcomes.appendChild(li);
  });
}

/* =========================
   CTA PRICE
========================= */

function setCTA() {
  $("ctaPrice").innerText = course.price;
}

/* =========================
   MODAL TEMPLATE
========================= */

const demoFormTemplate = `
<form id="demoForm" class="js-demo-form">

  <input type="hidden" name="access_key" value="370af2a5-93ab-440b-8050-3f10f1fc76a7">
  <input type="checkbox" name="botcheck" style="display:none;">

  <div class="input-group">
    <input type="text" name="name" placeholder="Full Name" required>
  </div>

  <div class="input-group">
    <input type="email" name="email" placeholder="Email" required>
  </div>

  <div class="input-group">
    <input type="tel" name="phone" placeholder="Phone Number" required>
  </div>

  <div class="input-group">
    <input type="text" name="location" placeholder="Location" required>
  </div>

  <div class="input-group">
    <textarea name="message" placeholder="Tell us about your interest" required></textarea>
  </div>

  <button class="btn primary submit-btn" type="submit">
    Get Free Demo
  </button>

</form>
`;

/* =========================
   MODAL INIT
========================= */

function initModal() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal='demo']");
    if (!trigger) return;

    e.preventDefault();

    openModal({
      title: "Free Demo Session",
      body: demoFormTemplate,
      footer: ""
    });

    bindDemoForm();
  });
}

/* =========================
   FORM HANDLER (FIXED)
========================= */

function initFormHandler() {
  document.addEventListener("submit", (e) => {
    if (!e.target.matches(".js-demo-form")) return;

    e.preventDefault();

    const form = e.target;

    submitWeb3Form(form, null, "Demo request submitted!");

    // ✅ FIX: close modal AFTER success (same pattern as your script.js)
    setTimeout(() => {
      closeModal();
    }, 800);
  });
}

/* =========================
   MOBILE NAV
========================= */

function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("mobileCloseBtn");

  const closeMenu = () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  overlay?.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);

  document.querySelectorAll(".mobile-nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* =========================
   INIT APP
========================= */

function initCoursePage() {
  initCourseBasics();
  renderQuickFeatures();
  renderAccordion();
  initAccordion();
  renderListData();
  renderAudience();
  setCTA();
  initModal();
  initFormHandler();
  initMobileNav();

  lucide.createIcons();
}

initCoursePage();