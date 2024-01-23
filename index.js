// Function to load modular HTML content
async function loadHTMLContent(containerId, filePath) {
  const response = await fetch(filePath);
  const htmlContent = await response.text();
  document.getElementById(containerId).innerHTML = htmlContent;
  performElementSelection();
}

// Load modular HTML content into respective containers
loadHTMLContent("headerContainer", "./components/header.html");
loadHTMLContent("heroContainer", "./components/hero.html");
loadHTMLContent("aboutContainer", "./components/about.html");
loadHTMLContent("experienceContainer", "./components/experience.html");
loadHTMLContent("projectsContainer", "./components/projects.html");
loadHTMLContent("socialContainer", "./components/social.html");
loadHTMLContent("footerContainer", "./components/footer.html");

function performElementSelection() {
  // Code for menu functionality
  var menu = document.querySelector(".smallscreen-nav");
  var open = document.querySelector(".fa-bars");
  var close = document.querySelector(".fa-xmark");

  open.addEventListener("click", () => {
    menu.style.display = "block";
  });

  close.addEventListener("click", () => {
    menu.style.display = "none";
  });
}
