const form = document.getElementById('loginForm');
const logins = [
    { email: "meuemail@gmail.com", password: "1234" }
]
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (logins.some((login) => login.email.toLowerCase() === email.toLowerCase().trim() && login.password === password)) {
        window.location.replace("home.html");
    } else {
        alert("Credenciais inválidas.");
    }
});


