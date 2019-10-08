class CodeQuiz {
  constructor(level) {
    this.level = level;
    this.timerId = document.querySelector("#timer");
    this.timer = 0;
    this.nIntervId;
  }
  start() {
    document.querySelector("#app").innerHTML = `
      <h1 class="text-center">Welcome to Code Quiz</h1>`;
  }

  startTimer() {
    this.nIntervId = setInterval(() => {
      this.timerId.textContent = ++this.timer;
      if (this.timer == 10) {
        document.querySelector("#app").innerHTML += `
        <h1>Time's up!</h1>`;
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.nIntervId);
  }
}
const quiz = new CodeQuiz("easy");

document.querySelector("#start").addEventListener("click", () => {
  quiz.start();
  quiz.startTimer();
});
