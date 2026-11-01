
// ==========================================
// TRENT DIGITAL LABS - WEBSITE SETTINGS
// ==========================================

const SITE_EMAIL = "contact.trentlabs@gmail.com";


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}


// ==========================================
// AUTOMATIC COPYRIGHT YEAR
// ==========================================

document.querySelectorAll("[data-year]").forEach(element => {
  element.textContent = new Date().getFullYear();
});


// ==========================================
// CLIENT ENQUIRY FORM
// ==========================================

const quoteForm = document.querySelector("#quote-form");

if (quoteForm) {
  quoteForm.addEventListener("submit", event => {
    event.preventDefault();

    const status = document.querySelector("#form-status");
    const formData = new FormData(quoteForm);
    const fields = Object.fromEntries(formData.entries());

    // Clean up form values
    const getField = (name, fallback = "Not provided") => {
      const value = fields[name]?.toString().trim();
      return value || fallback;
    };

    // Email subject
    const subject = encodeURIComponent(
      "New Website Enquiry | Trent Digital Labs"
    );

    // Professional email layout
    const emailBody = `
Dear Trent Digital Labs,

A new project enquiry has been submitted through the official website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name: ${getField("name")}
Business Name: ${getField("business")}
Email Address: ${getField("email")}
Telephone Number: ${getField("phone")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Requested: ${getField("service", "Not specified")}
Estimated Budget: ${getField("budget", "Not specified")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DESCRIPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${getField("details", "No additional project details provided.")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS

Please review the enquiry and contact the client using the details provided above to discuss their requirements and potential next steps.

Kind regards,

Trent Digital Labs
Website Enquiry System

contact.trentlabs@gmail.com
    `.trim();

    const body = encodeURIComponent(emailBody);

    // Open the visitor's default email application
    const mailtoLink =
      `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent =
        "Your email application should open with your enquiry ready to send.";
    }

    window.location.href = mailtoLink;
  });
}
