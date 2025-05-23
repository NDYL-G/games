// js/auth.js
import { auth } from '../firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export function setupAuthUI() {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const logoutBtn = document.getElementById("logout-btn");
  const userDisplay = document.getElementById("user-display");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = signupForm.email.value;
      const password = signupForm.password.value;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        alert("Signup failed: " + err.message);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
    });
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      if (userDisplay) userDisplay.textContent = `Signed in as ${user.email}`;
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      if (userDisplay) userDisplay.textContent = "Not signed in";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  });
}
