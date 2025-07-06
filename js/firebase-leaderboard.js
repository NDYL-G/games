// js/firebase-leaderboard.js

import { db, auth } from './firebase-config.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/**
 * Submit a score to a specific leaderboard.
 * @param {string} mode - Leaderboard mode (e.g. 'classic', 'survival')
 * @param {string} playerName - The name of the player
 * @param {number} score - The score achieved
 */
export async function submitScore(mode, playerName, score) {
  try {
    const leaderboardRef = collection(db, `leaderboards/${mode}/scores`);
    await addDoc(leaderboardRef, {
      player: playerName,
      score: score,
      uid: auth.currentUser?.uid || null,
      timestamp: serverTimestamp()
    });
    console.log("✅ Score submitted successfully");
  } catch (error) {
    console.error("❌ Error submitting score:", error);
  }
}

/**
 * Get the top scores from a specific leaderboard.
 * @param {string} mode - Leaderboard mode (e.g. 'classic', 'survival')
 * @param {number} maxEntries - Number of top scores to fetch
 * @returns {Promise<Array>} - Array of score entries
 */
export async function getTopScores(mode, maxEntries = 10) {
  try {
    const leaderboardRef = collection(db, `leaderboards/${mode}/scores`);
    const q = query(leaderboardRef, orderBy("score", "desc"), limit(maxEntries));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    return [];
  }
}
