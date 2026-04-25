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
const navLinks = document.getElementById("navLinks");
const mobileOverlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

/* Close when clicking overlay */
mobileOverlay.addEventListener("click", closeMenu);

/* Close when clicking any nav link */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
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
  ICON INIT
========================= */
lucide.createIcons();

/* =========================
  WEB3 FORMS SUBMISSION
========================= */
async function submitWeb3Form(form, statusEl = null, successMessage) {
  if (statusEl) statusEl.innerText = "Sending...";

  const data = new FormData(form);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data
    });

    const result = await res.json();

    if (result.success) {
      form.reset();
      if (statusEl) statusEl.innerText = "";
      showNotification(
        "success",
        successMessage || "Message sent successfully!",
        "We will contact you shortly."
      );

    } else {
      if (statusEl) statusEl.innerText = "";
      showNotification(
        "error",
        result.message || "Submission failed",
        "Please try again."
      );
    }

  } catch (err) {
    if (statusEl) statusEl.innerText = "";

    showNotification(
        "error",
        result.message || "Submission failed",
        "Please try again."
      );
  }
}

/* =========================
FORM TEMPLATE
========================= */
function contactFormTemplate() {
  return `
    <form id="contactForm">

      <input type="hidden" name="access_key" value="2252d2f0-0055-4592-a37e-fe796f25efd6">
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

      <button class="btn submit-btn" type="submit">Send Inquiry</button>

      <p id="form-status"></p>

    </form>
  `;
}

const demoFormTemplate = `
<form id="demoForm">

  <input type="hidden" name="access_key" value="2252d2f0-0055-4592-a37e-fe796f25efd6">
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

  <button class="btn submit-btn" type="submit">Get Free Demo</button>

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
  MODAL FUNCTIONS
========================= */
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalFooter = document.getElementById("modalFooter");
const closeBtn = document.getElementById("modalCloseBtn");

// OPEN
function openModal({ title = "", body = "", footer = "" }) {
  modalTitle.innerText = title;
  modalBody.innerHTML = body;
  modalFooter.innerHTML = footer;

  modal.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");
}

// CLOSE
function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

// EVENTS
closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);


/* =========================
  NOTIFICATION FUNCTIONS
========================= */

function showNotification(type = "success", title = "", message = "") {
  const modal = document.getElementById("notificationModal");
  const icon = document.getElementById("notificationIcon");
  const titleEl = document.getElementById("notificationTitle");
  const messageEl = document.getElementById("notificationMessage");

  // 🔴 SAFETY CHECK (IMPORTANT)
  if (!modal || !icon || !titleEl || !messageEl) {
    console.error("Notification modal missing in HTML");
    return;
  }

  titleEl.innerText = title || (type === "success" ? "Success" : "Error");
  messageEl.innerText = message || "";

  modal.classList.remove("success", "error");
  modal.classList.add(type, "active");

  icon.innerText = type === "success" ? "✓" : "✕";

  document.body.classList.add("no-scroll");
}

function closeNotification() {
  const modal = document.getElementById("notificationModal");

  modal.classList.remove("active", "success", "error");

  document.body.classList.remove("no-scroll");
}


















