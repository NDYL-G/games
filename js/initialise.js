import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from './firebase-config.js';
import { submitScore, getTopScores } from './firebase-leaderboard.js';

// Sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");

    // Optional: test leaderboard
    submitScore("TestPlayer", Math.floor(Math.random() * 1000));

    getTopScores(5).then(scores => {
      console.log("Top 5 Scores:");
      scores.forEach((entry, index) => {
        console.log(`#${index + 1} ${entry.player}: ${entry.score}`);
      });
    });
  })
  .catch((error) => {
    console.error("Sign-in failed:", error);
  });
