/* =========================
  MODAL TEMPLATE
========================= */
/*  <div class="modal" id="modal">

    <div class="modal-content">

      <!-- HEADER -->
      <div class="modal-header" id="modalHeader">
        <h3 id="modalTitle">Title</h3>

        <button class="modal-close" id="modalCloseBtn">×</button>
      </div>

      <!-- BODY -->
      <div class="modal-body" id="modalBody">
        <!-- dynamic content goes here -->
      </div>

      <!-- FOOTER -->
      <div class="modal-footer" id="modalFooter">
        <!-- buttons go here -->
      </div>

    </div>

  </div>
*/

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
