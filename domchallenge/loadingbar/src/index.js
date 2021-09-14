//use requestanimationframe for performance
//timing not implemented
import "./styles.css";

let btn = document.getElementById("load");
let qbar = document.querySelector(".qbar");

let flag = false;
let queue = 0;
let width = 0;

const update = () => {
  let elem = document.getElementById("progressbar");
  qbar.parentElement.style.visibility = "visible";
  queue++;
  qbar.innerHTML = queue;
  if (!flag) {
    run();
  }
  function run() {
    flag = true;
    if (width >= 100) {
      width = 0;
      queue--;
      qbar.innerHTML = queue;
      elem.style.width = "0%";
      elem.innerHTML = "";
      if (queue < 1) {
        qbar.parentElement.style.visibility = "hidden";
        flag = false;
        return;
      }
    } else {
      width++;
    }
    elem.style.width = width + "%";
    elem.innerHTML = width + "%";
    setTimeout(run, 0);
  }
};

btn.addEventListener("click", update);
