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
   MOBILE NAV
========================= */
const burger = document.getElementById('hamburger');
const nav = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('active');
  });
});


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
   CONTACT FORM
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    status.innerHTML = "Sending...";

    const data = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        status.innerHTML = "✅ Message sent successfully!";
        form.reset();

        setTimeout(() => {
          status.innerHTML = "";
        }, 4000);
      } else {
        status.innerHTML = "❌ " + result.message;
      }

    } catch (error) {
      status.innerHTML = "❌ Network error!";
    }
  });

});


/* =========================
   ICON INIT
========================= */
lucide.createIcons();