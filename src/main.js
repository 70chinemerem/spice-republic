// ☀️ Theme Toggle
const themeBtn = document.getElementById("theme-toggle");

// Check if theme toggle button exists before adding event listener
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    // Toggle dark class on document element
    document.documentElement.classList.toggle("dark");
    // Determine current mode and update button
    const mode = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    localStorage.setItem("theme", mode);
    themeBtn.textContent = mode === "dark" ? "☪︎" : "☀️";
  });

  // Load saved theme preference on page load
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeBtn.textContent = "☪︎";
  }
}

// 🎯 Scroll to Services Section
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to first section after hero
      const firstSection = document.querySelector('section:not(.min-h-screen)');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
// 📱 Mobile Menu Toggle 
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});