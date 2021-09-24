let d = document.querySelector(".origin");
let drop = document.getElementById("dropzone");
let deleted = document.getElementById("deleted");

let input = document.querySelector("input");

let btn = document.getElementById("add");

btn.addEventListener("click", addTodo);

function addTodo() {
  const completeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  completeBtn.innerHTML = "Complete";
  deleteBtn.innerHTML = "Delete";

  let newlist = document.createElement("div");

  let newlistitem = document.createElement("div");
  newlistitem.setAttribute("contenteditable", "true");

  newlistitem.innerText = input.value;

  newlist.setAttribute("class", "draggable");
  newlist.setAttribute("id", Math.floor(Math.random() * 20));
  newlist.setAttribute("draggable", "true");
  newlist.appendChild(newlistitem);
  newlist.appendChild(completeBtn);
  newlist.appendChild(deleteBtn);
  if (input.value !== "") {
    d.appendChild(newlist);
    input.value = "";
  }

  completeBtn.addEventListener("click", function () {
    const parent = this.parentNode;
    parent.remove();
    drop.appendChild(parent);
    completeBtn.style.display = "none";
  });

  deleteBtn.addEventListener("click", function () {
    const parent = this.parentNode;
    parent.remove();
    deleted.appendChild(parent);
    deleteBtn.style.display = "none";
    completeBtn.style.display = "none";
  });
}

d.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("dragdata", e.target.id);
  e.target.style.background = "yellow";
});

drop.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.style.cursor = "pointer";
});

drop.addEventListener("drop", (e) => {
  const data = e.dataTransfer.getData("dragdata");
  const dragElem = document.getElementById(data);
  let child = dragElem.children;

  child[1].style.display = "none";
  child[2].style.display = "block";
  drop.appendChild(dragElem);
});

deleted.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.style.cursor = "pointer";
});

deleted.addEventListener("drop", (e) => {
  const data = e.dataTransfer.getData("dragdata");
  const dragElem = document.getElementById(data);
  let child = dragElem.children;

  child[1].style.display = "none";
  child[2].style.display = "none";
  deleted.appendChild(dragElem);
});

//drag back from drop

drop.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("dragdata", e.target.id);
  e.target.style.background = "yellow";
});

d.addEventListener("dragover", (e) => {
  e.preventDefault();
});

d.addEventListener("drop", (e) => {
  const data = e.dataTransfer.getData("dragdata");
  const dragElem = document.getElementById(data);
  let child = dragElem.children;

  child[1].style.display = "block";
  child[2].style.display = "block";
  d.appendChild(dragElem);
});

//drag back from deleted

deleted.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("dragdata", e.target.id);
  e.target.style.background = "yellow";
});
