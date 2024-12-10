function sendMail(email) {
  // Predefined subject and message body
  const subject = "Request for Job Application Information";
  const body =
    "Hello,\n\nI am interested in potential job opportunities with your company. Please let me know if there are open positions or if I can provide any additional information.\n\nThank you!";

  // Encode the subject and body to ensure special characters are correctly handled
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Open the user's default mail client
  window.location.href = mailtoLink;
}

function toggleCompanyForm() {
  // Toggle the visibility of the form
  const form = document.getElementById("company-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function addCompany() {
  // Get form values
  const name = document.getElementById("company-name").value;
  const tagline = document.getElementById("company-tagline").value;
  const logoUrl = document.getElementById("company-logo-url").value;
  const websiteUrl = document.getElementById("company-website-url").value;
  const email = document.getElementById("company-email").value;

  // Create a new company element
  const newCompany = document.createElement("div");
  newCompany.className = "company1";
  newCompany.innerHTML = `
      <a href="${websiteUrl}">
        <img src="${logoUrl}" alt="${name} Logo" class="company1--logo" />
        <h1 class="tagline">${tagline}</h1>
      </a>
      <button class="button-apply" onclick="sendMail('${email}', '${name}')">
        Send Email
      </button>
    `;

  // Append the new company element to the container
  document.getElementById("new-companies-container").appendChild(newCompany);

  // Hide the form and clear input fields
  toggleCompanyForm();
  document.getElementById("company-form").reset();
}
// Toggle the form's visibility
function toggleCompanyForm() {
  const form = document.getElementById("company-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Load companies from localStorage on page load
window.onload = function () {
  loadCompanies();
};

// Function to add a new company
function addCompany() {
  const name = document.getElementById("company-name").value;
  const passwords = document.getElementById("passwords").value;
  const tagline = document.getElementById("company-tagline").value;
  const logoUrl = document.getElementById("company-logo-url").value;
  const websiteUrl = document.getElementById("company-website-url").value;
  const email = document.getElementById("company-email").value;

  const newCompany = {
    name,
    passwords,
    tagline,
    logoUrl,
    websiteUrl,
    email,
  };

  // Save to localStorage
  saveCompanyToLocalStorage(newCompany);

  // Display the new company
  if (passwords == 123456) {
    displayCompany(newCompany);
  } else {
    alert("you are not an authenticated person");
  }
  // Reset form and hide it
  toggleCompanyForm();
  document.getElementById("company-form").reset();
}

// Function to save company to localStorage
function saveCompanyToLocalStorage(company) {
  let companies = JSON.parse(localStorage.getItem("companies")) || [];
  companies.push(company);
  localStorage.setItem("companies", JSON.stringify(companies));
}

// Function to load companies from localStorage
function loadCompanies() {
  let companies = JSON.parse(localStorage.getItem("companies")) || [];
  companies.forEach(displayCompany);
}

// Function to display a company in the DOM
function displayCompany(company, index) {
  const newCompany = document.createElement("div");
  newCompany.className = "company1";
  newCompany.innerHTML = `
      <a href="${company.websiteUrl}">
        <img src="${company.logoUrl}" alt="${company.name} Logo" class="company1--logo" />
        <h1 class="tagline">${company.tagline}</h1>
      </a>
      <button class="button-apply" onclick="sendMail('${company.email}', '${company.name}')">
        Send Email
      </button>
      <button class="button-delete" onclick="deleteCompany(${index})">
        Delete
      </button>
      `;
  document.getElementById("new-companies-container").appendChild(newCompany);
}
function deleteCompany(index) {
  // Get companies from localStorage
  let companies = JSON.parse(localStorage.getItem("companies")) || [];

  // Remove the company at the given index
  companies.splice(index, 1);

  // Save the updated list back to localStorage
  localStorage.setItem("companies", JSON.stringify(companies));

  // Clear the container and reload the companies
  const container = document.getElementById("new-companies-container");
  container.innerHTML = "";
  loadCompanies();
}
function loadCompanies() {
  let companies = JSON.parse(localStorage.getItem("companies")) || [];
  companies.forEach((company, index) => displayCompany(company, index));
}
