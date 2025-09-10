// Dynamically insert login page content
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("login-root");
  if (!root) return;
  root.innerHTML = `
		<section class="login-welcome">
			<img src="../../public/assets/img/logo/logo.webp" alt="E.CO Logo" class="login-logo" width="100" height="100" />
			<div class="login-welcome-text">
				<h2>Welcome back!</h2>
				<p>It's good to see you again</p>
			</div>
		</section>
		<h3 class="login-heading">Log In</h3>
		<form class="login-form" autocomplete="on">
			<label for="login-username">E-Mail / Username</label>
			<input type="text" id="login-username" name="username" autocomplete="username" required />
			<label for="login-password">Password</label>
			<input type="password" id="login-password" name="password" autocomplete="current-password" required />
			<button type="submit" class="btn-large">Log in</button>
		</form>
		<div class="login-or">or</div>
		<a href="register.html" class="btn-large-white login-create-account">Create an account</a>
	`;
});
