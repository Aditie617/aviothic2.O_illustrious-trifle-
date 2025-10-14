// 🎂 flame lighting + Confetti
const cake = document.getElementById("cake");
const flames = document.querySelectorAll(".flame");
const message = document.getElementById("message");

cake.addEventListener("click", () => {
  flames.forEach((f) => (f.style.display = "block"));
  message.textContent = "Make a wish 💫";

  // 🎉 Confetti burst
  for (let i = 0; i < 5; i++) {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: [
        "#ffb6c1", "#d48ac7", "#fff", "#ff9ff3", "#c56cf0", "#fff8dc",
        "#f08080", "#ffb6c1", "#b0c4de", "#f4a4c0", "#d1c4e9", "#ffcccb",
        "#e6e6fa", "#ffe4e1", "#d8bfd8", "#dda0dd", "#ee82ee", "#da70d6",
        "#ff00ff", "#ba55d3", "#9370db", "#8a2be2", "#9400d3", "#9932cc",
        "#8b008b", "#800080"
      ],
    });
  }
});

// 💌 Modal
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const modal = document.getElementById("letterModal");

openLetterBtn.onclick = () => (modal.style.display = "block");
closeLetterBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// 🦖 Game Popup
document.getElementById("gameBox").addEventListener("click", () => {
  const gameWindow = window.open("", "_blank", "width=500,height=300");
  gameWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Dino Game — aviothic</title>
  <style>
    :root{--bg:#fff;--ground:#222;--dino:#2ecc71}
    html,body{height:100%;margin:0}
    body{display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(180deg,#fff,#f6f7fb);font-family:monospace;color:#222}
    .game-wrap{width:100%;max-width:900px;padding:18px}
    #score{font-size:18px;margin-bottom:8px;text-align:left}
    #game{width:100%;height:220px;border-radius:10px;border-bottom:6px solid #333;background:linear-gradient(180deg,#fff,#f4f6f9);position:relative;overflow:hidden}
    #dino{width:48px;height:48px;background:var(--dino);position:absolute;bottom:8px;left:60px;border-radius:8px;box-shadow:0 6px 14px rgba(43,44,66,0.12)}
    #cactus{width:22px;height:48px;background:#7f5539;position:absolute;bottom:8px;left:100%;animation:move 2s linear infinite;border-radius:4px}
    @keyframes move{0%{left:100%}100%{left:-40px}}
    .jump{animation:jump 0.42s ease-out}
    @keyframes jump{0%{bottom:8px}50%{bottom:110px}100%{bottom:8px}}
    #game-over{display:none;position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:14px 20px;border-radius:10px;border:2px solid #f45}
    .hint{margin-top:12px;color:#555;font-size:14px}
  </style>
</head>
<body>
  <div class="game-wrap">
    <div id="score">Score: 0</div>
    <div id="game" tabindex="0">
      <div id="dino" aria-hidden="true"></div>
      <div id="cactus" aria-hidden="true"></div>
      <div id="game-over">GAME OVER — Press R to restart</div>
    </div>
    <div class="hint">Press <strong>Space</strong> to jump • Press <strong>R</strong> to restart</div>
  </div>

  <script>
    const dino = document.getElementById('dino');
    const cactus = document.getElementById('cactus');
    const gameOverText = document.getElementById('game-over');
    const scoreText = document.getElementById('score');
    let isJumping = false, isAlive = true, score = 0;

    function jump() {
      if (!isJumping && isAlive) {
        isJumping = true;
        dino.classList.add('jump');
        setTimeout(() => {
          dino.classList.remove('jump');
          isJumping = false;
        }, 420);
      }
    }

    function checkCollision() {
      const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
      const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
      if (cactusLeft > 40 && cactusLeft < 110 && dinoTop < 50) {
        isAlive = false;
        cactus.style.animation = 'none';
        cactus.style.left = cactusLeft + 'px';
        gameOverText.style.display = 'block';
      }
    }

    function increaseScore() {
      if (isAlive) {
        score++;
        scoreText.innerText = 'Score: ' + score;
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.code === 'Space') jump();
      if (e.code === 'KeyR' && !isAlive) location.reload();
    });

    function setCactusSpeed() {
      const w = window.innerWidth;
      const speed = Math.max(1.4, 3 - w/1000);
      cactus.style.animationDuration = speed + 's';
    }
    setCactusSpeed();
    window.addEventListener('resize', setCactusSpeed);

    setInterval(checkCollision, 10);
    setInterval(increaseScore, 500);
  </script>
</body>
</html>
`);
});

// Pomodoro Timer
const pomodoroBtn = document.getElementById("pomodoroBtn");
const pomodoroContainer = document.getElementById("pomodoroContainer");
const startTimerBtn = document.getElementById("startTimerBtn");
const timerDisplay = document.getElementById("timerDisplay");
const pomodoroInput = document.getElementById("pomodoroInput");

let timerInterval;

pomodoroBtn.addEventListener("click", () => {
  pomodoroContainer.style.display =
    pomodoroContainer.style.display === "none" ? "block" : "none";
});

startTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);

  let minutes = parseInt(pomodoroInput.value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number of minutes.");
    return;
  }

  let time = minutes * 60;

  timerInterval = setInterval(() => {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (time <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up! 🎉";
      alert("Pomodoro complete! Take a break 🍵");
    }

    time--;
  }, 1000);
});
