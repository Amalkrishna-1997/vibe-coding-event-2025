let p1Choice = null;
let p2Choice = null;
let score1 = 0;
let score2 = 0;
let canPlay = false;

const keyMap = {
  a: "🪨",
  s: "📄",
  d: "✂️",
  j: "🪨",
  k: "📄",
  l: "✂️"
};

function startGame() {
  const name1 = document.getElementById("player1Name").value || "Player 1";
  const name2 = document.getElementById("player2Name").value || "Player 2";
  document.getElementById("name1").innerText = name1;
  document.getElementById("name2").innerText = name2;
  document.getElementById("gameArea").style.display = "block";
  resetChoices();
  startCountdown();
}

function startCountdown() {
  let count = 3;
  canPlay = false;
  const status = document.getElementById("status");
  const countdownInterval = setInterval(() => {
    status.innerText = `⏳ Get Ready! Starting in ${count}...`;
    status.style.color = `hsl(${count * 60}, 100%, 50%)`;
    count--;
    if (count < 0) {
      clearInterval(countdownInterval);
      status.innerText = "🚀 GO! Press your keys!";
      status.style.color = "#00ff99";
      canPlay = true;
    }
  }, 1000);
}

function getWinnerSymbol(choice1, choice2) {
  if (choice1 === choice2) return "draw";
  if (
    (choice1 === "🪨" && choice2 === "✂️") ||
    (choice1 === "📄" && choice2 === "🪨") ||
    (choice1 === "✂️" && choice2 === "📄")
  ) {
    return "p1";
  }
  return "p2";
}

function animateChoice(id) {
  const el = document.getElementById(id);
  el.classList.add("animated");
  setTimeout(() => {
    el.classList.remove("animated");
  }, 500);
}

function showWinner(winner) {
  const anim = document.getElementById("winnerAnimation");
  if (winner === "draw") {
    anim.innerHTML = "🤝 It's a <span style='color: #fff'>Draw!</span>";
  } else if (winner === "p1") {
    anim.innerHTML = "🎉 <span style='color: #00e676'>" + document.getElementById("name1").innerText + "</span> Wins!";
    score1++;
    document.getElementById("score1").innerText = score1;
  } else {
    anim.innerHTML = "🎉 <span style='color: #00e676'>" + document.getElementById("name2").innerText + "</span> Wins!";
    score2++;
    document.getElementById("score2").innerText = score2;
  }

  setTimeout(() => {
    anim.innerHTML = "";
    resetChoices();
    startCountdown();
  }, 2500);
}

function resetChoices() {
  p1Choice = null;
  p2Choice = null;
  document.getElementById("choice1").innerText = "❓";
  document.getElementById("choice2").innerText = "❓";
}

document.addEventListener("keydown", (event) => {
  if (!canPlay) return;

  const key = event.key.toLowerCase();
  if (!keyMap[key]) return;

  if (["a", "s", "d"].includes(key) && !p1Choice) {
    p1Choice = keyMap[key];
    const el = document.getElementById("choice1");
    el.innerText = p1Choice;
    animateChoice("choice1");
  }

  if (["j", "k", "l"].includes(key) && !p2Choice) {
    p2Choice = keyMap[key];
    const el = document.getElementById("choice2");
    el.innerText = p2Choice;
    animateChoice("choice2");
  }

  if (p1Choice && p2Choice) {
    canPlay = false;
    const result = getWinnerSymbol(p1Choice, p2Choice);
    showWinner(result);
  }
});
