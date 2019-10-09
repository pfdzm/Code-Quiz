class CodeQuiz {
  constructor() {
    this.timerId = document.querySelector("#timer");
    this.timer = 75;
    this.timerId.textContent = this.timer;
    this.nIntervId;
    this.btnHard = document.querySelector("#startHard");
    this.btnEasy = document.querySelector("#startEasy");
  }
  start(questions) {
    this.questions = questions;
    this.startTimer();
    this.loadQ(0);
  }

  startTimer() {
    this.nIntervId = setInterval(() => {
      this.timerId.textContent = --this.timer;
      if (this.timer == 0) {
        document.querySelector("#app").innerHTML += `
        <h1 class="text-center">Time's up!</h1>`;
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.nIntervId);
  }

  loadQ(i) {
    document.querySelector("#app").innerHTML = `
      <h1 class="text-center">${this.questions[i].title}</h1>
      <form id="choices" class="d-flex flex-column">
      <button class="btn btn-info mb-3">${this.questions[i].choices[0]}</button>
      <button class="btn btn-info mb-3">${this.questions[i].choices[1]}</button>
      <button class="btn btn-info mb-3">${this.questions[i].choices[2]}</button>
      <button class="btn btn-info mb-3">${this.questions[i].choices[3]}</button>
      </form>
      `;
    const form = document.querySelector("form#choices");

    for (let button of form) {
      button.addEventListener("click", e => {
        e.preventDefault();
      });
    }
    document
      .querySelector("form#choices")
      .addEventListener("submit", function(e) {
        preventDefault();
      });
  }
}

const quiz = new CodeQuiz();

document.querySelector("form#start").addEventListener("submit", function(e) {
  e.preventDefault();
});

quiz.btnEasy.addEventListener("click", e => {
  e.preventDefault();
  quiz.start(questionsEasy);
});

quiz.btnHard.addEventListener("click", e => {
  e.preventDefault();
  quiz.start(questionsHard);
});
