/* =========================
  HTML TEMPLATE FOR NOTIFICATION
========================= */

/*

 <div class="notification-modal" id="notificationModal">
    <div class="notification-content">

      <div class="notification-icon" id="notificationIcon">✓</div>

      <h3 class="notification-title" id="notificationTitle">Success</h3>

      <p class="notification-message" id="notificationMessage">
        Message goes here
      </p>

      <button class="notification-btn" onclick="closeNotification()">
        OK
      </button>

    </div>
  </div>
*/

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

