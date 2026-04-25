/* =========================
    COURSE LOADER
========================= */

const params = new URLSearchParams(window.location.search);
const courseKey = params.get("course");
const course = COURSES[courseKey];

if (!course) {
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
   BASIC DATA
========================= */

document.getElementById("courseTitle").innerText = course.title;
document.getElementById("courseSubtitle").innerText = course.subtitle;
document.getElementById("sidebarTitle").innerText = course.title;
document.getElementById("price").innerText = course.price;

// HERO IMAGE
document.getElementById("hero").style.backgroundImage =
  `url(${course.heroImage})`;

/* =========================
   HERO META + SIDEBAR
========================= */

course.quick.forEach(item => {
  const span = document.createElement("span");
  span.innerText = item;
  document.getElementById("heroMeta").appendChild(span);

  const li = document.createElement("li");
  li.innerText = "✔ " + item;
  document.getElementById("quickFeatures").appendChild(li);
});

/* =========================
   ACCORDION RENDER
========================= */

const accordionContainer = document.getElementById("courseAccordion");

course.details.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "accordion-item";

  div.innerHTML = `
    <button class="accordion-header">
      <span>${index + 1}. ${item.title}</span>
      <i data-lucide="chevron-down"></i>
    </button>

    <div class="accordion-body">
      <p>${item.desc}</p>
    </div>
  `;

  accordionContainer.appendChild(div);
});

/* =========================
   ACCORDION INTERACTION
========================= */

document.addEventListener("click", function (e) {
  const header = e.target.closest(".accordion-header");
  if (!header) return;

  const item = header.parentElement;

  document.querySelectorAll(".accordion-item").forEach(i => {
    if (i !== item) i.classList.remove("active");
  });

  item.classList.toggle("active");
});

/* =========================
   BENEFITS & FEATURES
========================= */
// BENEFITS
course.benefits.forEach(item => {
  const div = document.createElement("div");
  div.className = "benefit-card";
  div.innerText = item;
  document.getElementById("benefits").appendChild(div);
});

// FEATURES
course.features.forEach(item => {
  const div = document.createElement("div");
  div.className = "feature-card";
  div.innerText = item;
  document.getElementById("features").appendChild(div);
});

/* =========================
  Who & Outcomes
========================= */

// WHO
course.who.forEach(item => {
  const li = document.createElement("li");
  li.innerText = item;
  document.getElementById("who").appendChild(li);
});

// OUTCOMES
course.outcomes.forEach(item => {
  const li = document.createElement("li");
  li.innerText = item;
  document.getElementById("outcomes").appendChild(li);
});

/* =========================
    PRICE
========================= */
document.getElementById("ctaPrice").innerText = course.price;

/* =========================
   ICONS
========================= */

lucide.createIcons();