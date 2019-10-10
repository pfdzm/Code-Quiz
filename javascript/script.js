class CodeQuiz {
  constructor() {
    // Let's grab some elements we will need later
    this.app = document.querySelector("#app");
    this.timerId = document.querySelector("#timer");
    this.messageAreaId = document.querySelector("#messageArea");
    this.nIntervId;
    this.choice;
    this.feedbackId;
    this.score;
    this.difficulty;
  }
  start(questions) {
    this.questions = questions;
    // 15 seconds per question
    this.timer = questions.length * 15;
    this.timerId.textContent = this.timer;
    this.startTimer();
    this.loadQ(0);
    this.difficulty = questions.value;
  }

  startTimer() {
    this.nIntervId = setInterval(() => {
      this.timerId.textContent = --this.timer;
      this.setScore();
      if (this.timer < 1) {
        this.stopTimer();
        this.feedback("You lose, better luck next time!", 0);
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.nIntervId);
  }

  loadQ(i) {
    document.querySelector("#main").innerHTML = `
      <h1 class="text-center">${this.questions[i].title}</h1>
      <form id="choices" class="d-flex flex-column w-50 mx-auto">
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
      `;

    const form = document.querySelector("form#choices");
    form.addEventListener("click", e => {
      e.preventDefault();
      if (e.target.nodeName == "BUTTON") {
        this.answer = e.target.textContent;

        this.check(e.target.textContent, i);
      }
    });
  }

  feedback(msg, duration) {
    this.feedbackId = document.querySelector("#feedback");
    this.feedbackId.textContent = `${msg}`;
    if (duration > 0) {
      setTimeout(() => {
        this.feedbackId.textContent = ``;
      }, 1000 * duration);
    }
  }

  check(answer, i) {
    if (answer == this.questions[i].answer) {
      this.feedback("Correct!", 2);
      // check if there are more questions in the pool
      if (this.questions[++i]) {
        this.loadQ(i);
      } else {
        this.stopTimer();
        this.setScore();
        this.setHighscore("win");
      }
    } else {
      this.feedback("Wrong!", 2);
      if (this.timer - 15 < 0) {
        this.timer = 0;
        this.timerId.textContent = this.timer;
        this.stopTimer();
        this.setScore();
        this.setHighscore("lose");
      } else {
        this.timer = this.timer - 15;
        this.timerId.textContent = this.timer;
      }
    }
  }

  setHighscore(flag) {
    this.app.innerHTML = `
        <h1 class="text-center">You ${flag}! Your score is <span class="font-weight-bold">${this.score}</span></h1>`;
    this.app.innerHTML += `
    <form action="" id="highscore">
    <div class="form-group d-flex flex-column w-50 mx-auto">
      <input type="text" id="name" class="form-control" autocomplete="off" placeholder="Enter your name"/>
      <button type="submit" class="btn btn-info mt-3">Add to leaderboards</button>
    </div>
  </form>
`;
    const highscoreForm = document.querySelector("form#highscore");
    highscoreForm.addEventListener("click", e => {
      e.preventDefault();
      if (e.target.nodeName == "BUTTON") {
        if (document.querySelector("#name").value == "") {
          this.name = "Anonymous player";
        } else this.name = document.querySelector("#name").value;

        const highscores = localStorage.getItem(`highscores`);

        let scoreArr = [];
        if (highscores) {
          scoreArr = JSON.parse(highscores);
        }
        scoreArr.push({
          index: scoreArr.length + 1,
          name: this.name,
          score: this.score,
          difficulty: this.difficulty
        });

        localStorage.setItem(`highscores`, JSON.stringify(scoreArr));
        location.href = "./highscores.html";
      }
    });
  }

  setScore() {
    this.score = this.timer;
  }
}

const quiz = new CodeQuiz();

document.querySelector("form#start").addEventListener("click", e => {
  e.preventDefault();

  if (e.target.nodeName == "BUTTON") {
    switch (e.target.id) {
      case "startHard":
        quiz.start(questionsHard);
        quiz.difficulty = "hard";
        break;

      case "startEasy":
        quiz.start(questionsEasy);
        quiz.difficulty = "easy";
        break;

      default:
        break;
    }
  }
});
