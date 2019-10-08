class CodeQuiz {
  constructor(level) {
    this.level = level;
    this.timerId = document.querySelector("#timer");
    this.timer = 0;
  }
  start() {
    document.querySelector("#app").innerHTML = `
      <h1 class="text-center">Welcome to Code Quiz</h1>`;
  }

  startTimer() {
    var nIntervId = setInterval(() => {
      this.timerId.textContent = ++this.timer;
    }, 1000);
  }
  stopTimer() {
    clearInterval(nIntervId);
  }
}
const quiz = new CodeQuiz("easy");

document.querySelector("#start").addEventListener("click", () => {
  quiz.start();
  quiz.startTimer();
});
