let d = document.querySelector(".origin");
let drop = document.getElementById("dropzone");
let deleted = document.getElementById("deleted");
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
  drop.appendChild(dragElem);
});

deleted.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.style.cursor = "pointer";
});

deleted.addEventListener("drop", (e) => {
  const data = e.dataTransfer.getData("dragdata");
  const dragElem = document.getElementById(data);
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
  d.appendChild(dragElem);
});

//drag back from deleted

deleted.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("dragdata", e.target.id);
  e.target.style.background = "yellow";
});
