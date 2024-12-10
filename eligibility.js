"use strict";
function showEligibleCompanies() {
  // Get CGPA values from the form
  const firstYearCgpa = parseFloat(
    document.getElementById("1st-year-cgpa").value
  );
  const secondYearCgpa = parseFloat(
    document.getElementById("2nd-year-cgpa").value
  );
  const thirdYearCgpa = parseFloat(
    document.getElementById("3rd-year-cgpa").value
  );

  // Sample company lists based on CGPA ranges
  const companies = {
    high: ["Google", "Microsoft", "Amazon"],
    mid: ["Infosys", "TCS", "Wipro"],
    low: ["Tech Mahindra", "Cognizant"],
  };

  let eligibleCompanies = [];

  // Decide eligible companies based on CGPA averages
  const averageCgpa = (firstYearCgpa + secondYearCgpa + thirdYearCgpa) / 3;

  if (averageCgpa >= 8.5) {
    eligibleCompanies = [...companies.high, ...companies.mid, ...companies.low];
  } else if (averageCgpa >= 7.0) {
    eligibleCompanies = [...companies.mid, ...companies.low];
  } else {
    eligibleCompanies = companies.low;
  }

  // Display the list of eligible companies
  const companyListDiv = document.getElementById("companyList");
  companyListDiv.innerHTML =
    "<ul>" +
    eligibleCompanies.map((company) => `<li>${company}</li>`).join("") +
    "</ul>";

  // Show the modal
  document.getElementById("companyModal").style.display = "block";
}
document.getElementById("studentForm").reset();

// Close the modal
function closeModal() {
  document.getElementById("companyModal").style.display = "none";
}

// Close the modal when clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById("companyModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
