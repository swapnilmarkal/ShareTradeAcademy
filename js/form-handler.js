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