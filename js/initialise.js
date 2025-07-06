import {
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { auth } from './firebase-config.js';

signInAnonymously(auth)
  .then(() => {
    console.log("✅ Anonymous sign-in started...");
  })
  .catch((error) => {
    console.error("❌ Anonymous sign-in failed:", error);
  });

// Monitor sign-in state and confirm readiness
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User authenticated:", user.uid);
    // Optionally: trigger your game setup manually here
  } else {
    console.warn("⚠️ No authenticated user");
  }
});
