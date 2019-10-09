class CodeQuiz {
  constructor() {
    this.timerId = document.querySelector("#timer");
    this.timer = 0;
    this.nIntervId;
  }
  start(questions) {
    this.questions = questions;
    document.querySelector("#app").innerHTML = `
      <h1 class="text-center">Welcome to Code Quiz</h1>`;
    this.startTimer();
  }

  startTimer() {
    this.nIntervId = setInterval(() => {
      this.timerId.textContent = ++this.timer;
      if (this.timer == 10) {
        document.querySelector("#app").innerHTML += `
        <h1 class="text-center">Time's up!</h1>`;
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.nIntervId);
  }
}

const quiz = new CodeQuiz();

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
});

document.querySelector("#startEasy").addEventListener("click", e => {
  e.preventDefault();
  quiz.start(questionsEasy);
});

document.querySelector("#startHard").addEventListener("click", e => {
  e.preventDefault();
  quiz.start(questionsHard);
});
