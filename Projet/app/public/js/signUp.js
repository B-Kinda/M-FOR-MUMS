const auth = document.getElementById("auth");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

registerbtn.addEventListener("click", () => {
	auth.classList.add("active");
});

loginbtn.addEventListener("click", () => {
	auth.classList.remove("active");
});
const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
	const isPassword = passwordInput.type === "password";
	passwordInput.type = isPassword ? "text" : "password";
	togglePassword.innerHTML = isPassword
		? '<i class="fa-solid fa-eye-slash"></i>'
		: '<i class="fa-solid fa-eye"></i>';
});
