import "./styles.css";

const app = document.getElementById("app");
const chessTable = document.createElement("table");
const body = document.querySelector("body");

for (let i = 0; i < 8; i++) {
  const tr = document.createElement("tr");

  for (let j = 0; j < 8; j++) {
    const td = document.createElement("td");
    if (!((i + j) & 1)) {
      td.setAttribute("class", "cell white");
    } else {
      td.setAttribute("class", "cell black");
    }
    td.setAttribute("id", i + "-" + j);
    tr.appendChild(td);
  }
  chessTable.appendChild(tr);
}

app.appendChild(chessTable);

function removeRed() {
  const red = document.querySelectorAll(".red");

  for (const redElem of red) {
    redElem.classList.remove("red");
  }
}

const path = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

chessTable.addEventListener("click", (e) => {
  e.stopPropagation();
  removeRed();
  e.target.classList.add("red");
  const [i, j] = e.target.id.split("-");

  for (const p of path) {
    const [a, b] = p;
    dfs(i, j);
    function dfs(i, j) {
      const nextx = +i + a,
        nexty = +j + b;
      if (check(nextx, nexty)) {
        dfs(nextx, nexty);
        let elem = document.getElementById(nextx + "-" + nexty);
        elem.classList.add("red");
      }

      return;
    }
  }
});

body.addEventListener("click", removeRed);

function check(i, j) {
  return i >= 0 && i < 8 && j >= 0 && j < 8;
}
