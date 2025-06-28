const buttonAdmin = document.querySelector("#button-admin");

// --- EVENT LISTENERS ---

buttonAdmin.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "admin.html";
});