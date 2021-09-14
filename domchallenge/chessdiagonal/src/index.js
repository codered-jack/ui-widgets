import "./styles.css";
let app = document.getElementById("app");
let chessTable = document.createElement("table");
let body = document.querySelector("body");
for (let i = 0; i < 8; i++) {
  let tr = document.createElement("tr");

  for (let j = 0; j < 8; j++) {
    let td = document.createElement("td");
    if ((i + j) % 2 === 0) {
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
  let red = document.querySelectorAll(".red");

  for (let redElem of red) {
    redElem.classList.remove("red");
  }
}

chessTable.addEventListener("click", (e) => {
  e.stopPropagation();
  removeRed();
  e.target.classList.add("red");
  let [i, j] = e.target.id.split("-");

  let path = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];

  for (let p = 0; p < path.length; p++) {
    dfs(i, j);
    function dfs(i, j) {
      let [a, b] = path[p];

      let nextx = +i + +a,
        nexty = +j + +b;
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
