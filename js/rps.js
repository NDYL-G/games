import { auth, db } from '../firebase-config.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  // Redirect to login if not signed in
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      setupGame(user);
    }
  });
});

function setupGame(user) {
  const choices = ["rock", "paper", "scissors"];
  const buttons = document.querySelectorAll(".choice");
  const result = document.getElementById("result");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const userChoice = button.dataset.choice;
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      const outcome = getResult(userChoice, computerChoice);

      result.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${outcome}`;

      if (outcome === "You win!") {
        updateScore(user);
      }
    });
  });
}

function getResult(user, computer) {
  if (user === computer) return "It's a draw!";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "scissors" && computer === "paper") ||
    (user === "paper" && computer === "rock")
  ) return "You win!";
  return "You lose!";
}

async function updateScore(user) {
  try {
    const userRef = doc(db, "leaderboard", user.uid);
    await setDoc(userRef, {
      name: user.email,
      score: increment(1)
    }, { merge: true });
  } catch (err) {
    console.error("Error updating score:", err);
  }
}
