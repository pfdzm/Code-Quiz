class CodeQuiz {
  constructor() {
    this.app = document.querySelector("#app");
    this.timerId = document.querySelector("#timer");
    this.timer = 75;
    this.timerId.textContent = this.timer;
    this.nIntervId;
    this.btnHard = document.querySelector("#startHard");
    this.btnEasy = document.querySelector("#startEasy");
    this.choice;
    this.feedbackId;
    this.score;
    this.difficulty;
  }
  start(questions) {
    this.questions = questions;
    this.startTimer();
    this.loadQ(0);
  }

  restart() {
    this.app.innerHTML = `
    <h1 class="text-center">Coding quiz challenge</h1>
            <p>
              Press either of the two buttons below to start the game. Incorrect
              answers incur a time penalty!
            </p>
            <form id="start" class="d-flex flex-column text-center">
              <button id="startEasy" class="btn btn-info">
                Start easy quiz!
              </button>
              <button id="startHard" class="mt-3 btn btn-info">
                Start hard quiz!
              </button>
            </form>
          </div>
          <p id="feedback" class="text-info"></p>`;
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
      if (this.questions[++i]) {
        this.loadQ(i);
      } else {
        this.stopTimer();
        this.setScore();
        this.app.innerHTML += `
        <p class="text-info">
          You win! Your score is <span class="font-weight-bold">${this.score}</span>
        </p>
        `;
        this.setHighscore();
      }
    } else {
      this.feedback("Wrong!", 2);
      if (this.timer - 15 < 0) {
        this.timer = 0;
        this.timerId.textContent = this.timer;
        this.stopTimer();
      } else {
        this.timer = this.timer - 15;
        this.timerId.textContent = this.timer;
      }
    }
  }

  setHighscore() {
    this.app.innerHTML += `
    <form action="" id="highscore">
    <div class="form-group">
      <input type="text" id="name" class="form-control" placeholder="Enter your name"/>
      <button type="submit" class="btn btn-info">Add to leaderboards</button>
    </div>
  </form>
`;
    const highscoreForm = document.querySelector("form#highscore");
    highscoreForm.addEventListener("click", e => {
      e.preventDefault();
      if (e.target.nodeName != "INPUT") {
        this.name = document.querySelector("#name").value;

        const highscores = localStorage.getItem(`highscores`);

        let scoreArr = [];
        if (highscores) {
          scoreArr = JSON.parse(highscores);
        }
        scoreArr.push({ name: this.name, score: this.score });

        console.log(scoreArr);
        localStorage.setItem(`highscores`, JSON.stringify(scoreArr));

        this.restart();
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
        this.difficulty = "hard";
        break;

      case "startEasy":
        quiz.start(questionsEasy);
        this.difficulty = "easy";
        break;

      default:
        break;
    }
  }
});
