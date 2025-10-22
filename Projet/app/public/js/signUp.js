const auth = document.getElementById("auth");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

registerbtn.addEventListener("click", () => {
	auth.classList.add("active");
});

loginbtn.addEventListener("click", () => {
	auth.classList.remove("active");
});
// Vérifiez si l'élément existe avant d'ajouter un écouteur
const togglePassword = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
	togglePassword.addEventListener("click", () => {
		const isPassword = passwordInput.type === "password";
		passwordInput.type = isPassword ? "text" : "password";
		togglePassword.innerHTML = isPassword
			? '<i class="fa-solid fa-eye-slash"></i>'
			: '<i class="fa-solid fa-eye"></i>';
	});
}

function onSignIn(googleUser) {
	console.log("Google user:", googleUser);
	const id_token = googleUser.credential;
	console.log("ID token:", id_token);

	fetch("/auth/google", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ idtoken: id_token }),
		credentials: "include",
	})
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => {
					throw new Error(err.message);
				});
			}
			return response.json();
		})
		.then((data) => {
			console.log("Server response:", data);
			if (data.success) {
				window.location.href = data.redirectTo || "/";
			} else {
				throw new Error(data.message || "Erreur inconnue");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			alert("Erreur lors de la connexion avec Google: " + error.message);
		});
}

// Vérifier l'état de connexion au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
	// Si on est sur la page de connexion et que l'utilisateur est déjà connecté
	if (window.location.pathname === "/signup" && localStorage.getItem("token")) {
		window.location.href = "/";
	}
});
const signOut = () => {
	const auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(() => {
		// Rediriger vers la page d'accueil ou de connexion
		window.location.href = "/logout";
	});
};
