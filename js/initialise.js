import { signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from './firebase-config.js';
import { submitScore, getTopScores } from './firebase-leaderboard.js';

// Sign in anonymously to Firebase
signInAnonymously(auth)
  .then(() => {
    console.log("✅ Signed in anonymously");

    // Submit a test score (for "classic" mode)
    submitScore("classic", "TestPlayer", Math.floor(Math.random() * 1000));

    // Fetch and log the top 5 scores from "classic" leaderboard
    getTopScores("classic", 5).then(scores => {
      console.log("🏆 Top 5 Scores:");
      scores.forEach((entry, index) => {
        console.log(`#${index + 1}: ${entry.player} — ${entry.score}`);
      });
    });
  })
  .catch((error) => {
    console.error("❌ Sign-in failed:", error);
  });
