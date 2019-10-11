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
      // create an iterator over the sorted highscores array of objects
      // create a table row for each highscore object
      for (const iterator of this.scores.sort((a, b) => {
        return b.score - a.score;
      })) {
        const tr = document.createElement("tr");
        // iterate over each property of a highscore object and put it in a table cell
        for (const key in iterator) {
          // prevent iterating over Prototype properties
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
