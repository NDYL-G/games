import { db } from '../firebase-config.js';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function loadLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard-list");
  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));

  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name || "Unknown"} — ${data.score}`;
    leaderboardList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);
