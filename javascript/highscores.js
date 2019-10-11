class Highscore {
  constructor() {
    this.target = document.querySelector("#scoreTable");
    this.reset = document.querySelector("#resetScores");
    this.scores;
    this.reset.addEventListener("click", e => {
      e.preventDefault();
      if (confirm("Are you sure you want to clear all scores?")) {
        localStorage.clear();
        this.target.innerHTML = ``;
      }
    });
  }

  renderScores() {
    this.scores = JSON.parse(localStorage.getItem("highscores"));
    if (this.scores != null) {
      for (const iterator of this.scores) {
        const tr = document.createElement("tr");
        for (const key in iterator) {
          if (iterator.hasOwnProperty(key)) {
            const element = iterator[key];
            const td = document.createElement("td");
            td.textContent = element;
            tr.appendChild(td);
          }
        }
        this.target.appendChild(tr);
      }
    }
  }
}

const highscores = new Highscore();
highscores.renderScores();
