// footer-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to load footer
    function loadFooter() {
        const footerContainer = document.createElement('div');
        fetch('footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
                // Append the footer to the body or a specific container
                document.body.appendChild(footerContainer.querySelector('footer'));
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }

    // Load footer on page load
    loadFooter();
});