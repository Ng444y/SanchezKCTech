document.addEventListener("DOMContentLoaded", function () {
    // 🌙 Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️"; // Change icon to sun
            localStorage.setItem("theme", "dark"); // Save preference
        } else {
            themeToggle.textContent = "🌙"; // Change icon to moon
            localStorage.setItem("theme", "light"); // Save preference
        }
    });

    // Load Dark Mode Preference from localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️"; // Set sun icon if dark mode is active
    }

    // 📊 Progress Bar Animation
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach((bar) => {
        let finalWidth = bar.getAttribute("data-width"); // Get custom width attribute
        bar.style.width = "0%"; // Reset width to 0
        setTimeout(() => {
            bar.style.width = finalWidth; // Animate to final width
        }, 300);
    });

    // 📂 Auto Resume Download
    document.getElementById("downloadResume").addEventListener("click", function () {
        const link = document.createElement("a");
        link.href = "resume/Kurt_Sanchez_Resume.pdf"; // Path to the resume
        link.download = "Kurt_Sanchez_Resume.pdf"; // File name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
