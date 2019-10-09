class CodeQuiz {
  constructor() {
    this.timerId = document.querySelector("#timer");
    this.timer = 75;
    this.timerId.textContent = this.timer;
    this.nIntervId;
    this.btnHard = document.querySelector("#startHard");
    this.btnEasy = document.querySelector("#startEasy");
    this.choice;
    this.feedbackMsg;
    this.score;
  }
  start(questions) {
    this.questions = questions;
    this.startTimer();
    this.loadQ(0);
  }

  startTimer() {
    this.nIntervId = setInterval(() => {
      this.timerId.textContent = --this.timer;
      this.checkTimer();
      if (this.feedbackMsg.textContent != ``) {
        this.feedbackMsg.textContent = ``;
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.nIntervId);
  }

  checkTimer() {
    if (this.timer < 1) {
      document.querySelector("#app").innerHTML += `
      <h1 class="text-center">Time's up!</h1>`;
      this.stopTimer();
    }
  }

  loadQ(i) {
    document.querySelector("#app").innerHTML = `
      <h1 class="text-center">${this.questions[i].title}</h1>
      <form id="choices" class="d-flex flex-column">
      <button id="0" class="btn btn-info mb-3">${
        this.questions[i].choices[0]
      }</button>
      <button id="1" class="btn btn-info mb-3">${
        this.questions[i].choices[1]
      }</button>
      <button id="2" class="btn btn-info mb-3">${
        this.questions[i].choices[2]
      }</button>
      <button id="3" class="btn btn-info mb-3">${
        this.questions[i].choices[3]
      }</button>
      </form>
      <p id="feedback" class="text-info"></p>
      `;
    const form = document.querySelector("form#choices");
    this.feedbackMsg = document.querySelector("#feedback");

    for (let button of form) {
      button.addEventListener("click", e => {
        e.preventDefault();
        this.answer = e.target.textContent;
        this.check(e.target.textContent, i);
      });
    }
    document
      .querySelector("form#choices")
      .addEventListener("submit", function(e) {
        preventDefault();
      });
  }
  check(answer, i) {
    if (answer == this.questions[i].answer) {
      console.log("correct");
      if (this.questions[++i]) {
        this.loadQ(i);
        this.feedbackMsg.textContent = `Correct!`;
      } else {
        this.stopTimer();
        this.score = parseInt(timer.textContent);
      }
    } else this.feedbackMsg.textContent = `Wrong!`;
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
