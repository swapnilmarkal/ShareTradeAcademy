/* =========================
   HEADER SCROLL EFFECT
========================= */
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* =========================
  ACTIVE NAV LINK ON SCROLL
========================= */

const sections = document.querySelectorAll("section");
const navLinksItems = document.querySelectorAll(".nav-links a:not(.enroll-btn)");

window.addEventListener("scroll", () => {
  let current = "";

  const headerOffset = 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerOffset;

    if (section.id && window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinksItems.forEach(link => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    // ignore invalid links
    if (!href || href === "#") return;

    const linkHash = href.split("#")[1];

    if (linkHash === current) {
      link.classList.add("active");
    }
  });
});


/* =========================
   MOBILE NAV
========================= */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const mobileOverlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

/* Close when clicking overlay */
mobileOverlay.addEventListener("click", closeMenu);

/* Close when clicking any nav link */
document.querySelectorAll(".mobile-nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}


const mobileCloseBtn = document.getElementById("mobileCloseBtn");

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", closeMenu);
}


/* =========================
   COURSE CARDS
========================= */
function renderCourseCards() {
  const grid = document.querySelector(".course-grid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.keys(COURSES).forEach(key => {
    const course = COURSES[key];

    const card = document.createElement("div");
    card.className = "course-card premium";

    card.innerHTML = `
      <div class="course-img">
        <img src="${course.heroImage}" alt="${course.title}">
        <span class="course-tag">${course.modules?.[0]?.title || "Course"}</span>
      </div>

      <div class="course-content">
        <h3>${course.title}</h3>
        <p class="course-sub">${course.subtitle}</p>

        <ul class="course-points">
          ${course.quick.slice(0, 3).map(q => `<li>✔ ${q}</li>`).join("")}
        </ul>

        <div class="course-footer">
          <span class="price">${course.price}</span>
          <a href="course.html?course=${key}" class="btn primary small">
            View Details
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCourseCards();
});

/* =========================
   LOAD BOOKS
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initBooks();
});

function initBooks() {
  const grid = document.getElementById("booksGrid");
  const footer = document.getElementById("booksFooter");

  if (!grid) return;

  grid.innerHTML = "";
  footer.innerHTML = "";

  if (!BOOKS || BOOKS.length === 0) {
    grid.innerHTML = `
      <div class="books-empty">
        <h3>No Books Available</h3>
        <p>We are currently updating our library. Please check back soon.</p>
      </div>
    `;
    return;
  }

  const visibleBooks = BOOKS.slice(0, 3);

  visibleBooks.forEach(book => {
    const isUnavailable = book.status !== "available";

    const card = document.createElement("div");
    card.className = `book-card ${isUnavailable ? "out-of-stock" : ""}`;

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">

      <div class="book-content">
        <h3>${book.title}</h3>
        <p>${book.desc}</p>

        <div class="book-footer">
          <h4 class="price">₹${book.price}</h4>

          <button class="btn primary small" ${isUnavailable ? "disabled" : ""}>
            ${isUnavailable ? "Coming Soon" : "Buy Now"}
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (BOOKS.length > 3) {
    footer.innerHTML = `
      <a href="books.html" class="btn outline">View More Books</a>
    `;
  }
}

/* =========================
   FAQ ACCORDION
========================= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});


/* =========================
   TESTIMONIAL AUTO SCROLL
========================= */
const slider = document.getElementById('testimonialSlider');
let scrollAmount = 0;

setInterval(() => {
  if (slider.scrollWidth - slider.clientWidth <= scrollAmount) {
    scrollAmount = 0;
  } else {
    scrollAmount += 320;
  }

  slider.scrollTo({
    left: scrollAmount,
    behavior: "smooth"
  });
}, 4000);

/* =========================
FORM TEMPLATE
========================= */
function contactFormTemplate() {
  return `
    <form id="contactForm">

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

      <button class="btn primary submit-btn" type="submit">Send Inquiry</button>

      <p id="form-status"></p>

    </form>
  `;
}

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

  <button class="btn primary submit-btn" type="submit">Get Free Demo</button>

</form>
`;

/* =========================
  INJECT DEMO FORM
========================= */

document.addEventListener("DOMContentLoaded", () => {

  openModal({
    title: "Free Demo Session",

    body: demoFormTemplate,

    footer: ``
  });

  bindDemoForm();
});

/* =========================
  ON SUBMIT HANDLER FOR DEMO FORM
========================= */

function bindDemoForm() {
  const form = document.getElementById("demoForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitWeb3Form(form, null, "Demo Requested.");
    closeModal();
  });
}

/* =========================
  INJECT CONTACT FORM
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".contact-form-container");

  if (container) {
    container.innerHTML = contactFormTemplate();
    bindContactForm();
  }
});

/* =========================
  ON SUBMIT HANDLER FOR CONTACT FORM
========================= */
function bindContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitWeb3Form(form, status, "Message sent successfully!");
  });
}

/* =========================
  ENROLLMENT MODAL -> DEMO FORM FOR NOW
========================= */
function handleEnrollClick(e) {
  e.preventDefault();

  closeMenu();
  openModal({
    title: "Free Demo Session",
    body: demoFormTemplate,
    footer: ``
  });

  bindDemoForm();

}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-enroll]").forEach(btn => {
    btn.addEventListener("click", handleEnrollClick);
  });
});























