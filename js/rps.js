document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"];
  const buttons = document.querySelectorAll(".choice");
  const result = document.getElementById("result");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const userChoice = button.dataset.choice;
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      const outcome = getResult(userChoice, computerChoice);
      result.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${outcome}`;
    });
  });

  function getResult(user, computer) {
    if (user === computer) return "It's a draw!";
    if (
      (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) return "You win!";
    return "You lose!";
  }
});
