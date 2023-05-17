const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const score = document.querySelector(".score");
const grass = document.querySelector(".grass");
const textStart = document.querySelector(".text-start");
const textGameOver = document.querySelector(".text-game-over");
const textHelp = document.querySelector(".text-help");
const floor1 = document.querySelector(".floor-1");
const floor2 = document.querySelector(".floor-2");
const floor3 = document.querySelector(".floor-3");
const btnPlay = document.getElementById("btnPlay");
const btnRefresh = document.getElementById("btnRefresh");
const audioStart = new Audio("./audio/theme.mp3");
const audioGameOver = new Audio("./audio/gameover.mp3");
const sound = document.querySelector(".sound");

btnPlay.addEventListener("click", startGame);

let isRunning = true;

let isAudioOn = true;

function toggleAudio() {
  isAudioOn = !isAudioOn;
  audioGameOver.pause();
  if (isAudioOn) {
    sound.src = "./images/sound.png";
  } else {
    sound.src = "./images/nosound.png";
  }
}

function checkDevice() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    // está utilizando celular
    pipe.style.animationDuration = "1s";

    const altura = window.innerHeight;
    const largura = window.innerWidth;

    if (altura > largura) {
      console.log(altura);
      textHelp.textContent = `(Para uma melhor experiência, vire a tela na horizontal)`;
    }

    return true;
  }
}
checkDevice();

audioStart.addEventListener("ended", () => {
  audioStart.currentTime = 0;
  audioStart.play();
});

let scoreCount = 0;
const scoreIncrement = 1;

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

function floorAnimation1() {
  floor1.classList.add("floor-animation-1");
}
setInterval(floorAnimation1, 0);

function floorAnimation2() {
  floor2.classList.add("floor-animation-2");
}
setInterval(floorAnimation2, 0);

function floorAnimation3() {
  floor3.classList.add("floor-animation-3");
}
setInterval(floorAnimation3, 3100);

function startGame() {
  document.addEventListener("keydown", jump);
  document.addEventListener("click", jump);
  const menu = document.querySelector(".menu");
  menu.style.display = "none";
  sound.style.display = "none";
  if (isAudioOn) {
    audioStart.play();
  }
  const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (isRunning) {
      if (
        pipePosition <= 120 &&
        pipePosition > 0 &&
        marioPosition < (checkDevice ? 80 : 90)
      ) {
        pipe.style.animationPlayState = "paused";

        grass.style.animationPlayState = "paused";

        mario.style.animationPlayState = "paused";
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./images/game-over.png";
        mario.style.width = "75px";
        mario.style.marginLeft = "50px";

        floor1.style.animationPlayState = "paused";

        floor2.style.animationPlayState = "paused";

        floor3.style.animationPlayState = "paused";

        clearInterval(loop);
        endGame();
      }
      scoreCount++;
      num = Number(String(scoreCount).slice(0, -2));
      score.textContent = num;
    }

    if (num === 5 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth; // força reflow (força o navegador a recalcular a posição de todos os elementos para a próxima renderização)
      pipe.style.animation = "pipe-animation 1.4s infinite linear";
    }
    if (num === 10 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 1.3s infinite linear";
    }
    if (num === 15 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 1.2s infinite linear";
    }
    if (num === 20 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 1.1s infinite linear";
    }
    if (num === 25 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 1s infinite linear";
    }
    if (num === 30 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 0.9s infinite linear";
    }
    if (num === 35 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 0.8s infinite linear";
    }
    if (num === 40 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 1.3s infinite linear";
    }
    if (num === 45 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 0.6s infinite linear";
    }
    if (num === 50 && pipe.offsetLeft < 0) {
      pipe.style.animation = "none";
      pipe.offsetWidth;
      pipe.style.animation = "pipe-animation 0.5s infinite linear";
    }
  }, 10);
}

function endGame() {
  isRunning = false;
  audioStart.pause();
  sound.style.display = "block";
  if (isAudioOn) {
    audioGameOver.play();
  }
  const gameOver = document.querySelector(".game-over");
  gameOver.style.display = "block";
  pipe.style.animationDuration = !checkDevice ? "1.5" : "1.0";

  btnRefresh.addEventListener("click", restartGame);
}

function restartGame() {
  audioGameOver.pause();
  pipe.style.animationPlayState = "running";
  mario.style.animationPlayState = "running";
  floor1.style.animationPlayState = "running";
  floor2.style.animationPlayState = "running";
  floor3.style.animationPlayState = "running";
  grass.style.animationPlayState = "running";

  // Reinicialize todas as variáveis do jogo aqui

  scoreCount = 0;
  score.textContent = scoreCount;
  pipe.style.animation = "pipe-animation 1.5s infinite linear";

  const menu = document.querySelector(".menu");
  const gameOver = document.querySelector(".game-over");

  menu.style.display = "block";
  gameOver.style.display = "none";

  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.bottom = "0";
  mario.style.marginLeft = "0";

  function newGame() {
    setTimeout(() => {
      isRunning = true;
    }, 2000);

    startGame();
  }
  newGame();
}
