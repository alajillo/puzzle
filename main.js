const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;

function checkStatus() {
  const currentList = [...container.children];
  const unMatchedList = currentList.filter((child, index) => {
    return Number(child.getAttribute("data-index")) !== index;
  });
  if (unMatchedList.length === 0) {
    gameText.style.display = "block";
    isPlaying = false;
  }
}

let isPlaying = false;
let tiles = [];
const dragged = {
  el: null,
  class: null,
  index: null,
};

function setGame() {
  container.innerHTML = "";
  tiles = createimageTiles();
  tiles.forEach((tile) => container.appendChild(tile));
  setTimeout(() => {
    container.innerHTML = "";
    shuffle(tiles).forEach((tile) => container.appendChild(tile));
  }, 2000);
}

function createimageTiles() {
  const tempArray = [];
  Array(tileCount)
    .fill()
    .forEach((v, i) => {
      const li = document.createElement("li");
      li.setAttribute("data-index", i);
      li.setAttribute("draggble", "true");
      li.classList.add(`list${i}`);
      container.appendChild(li);
      tempArray.push(li);
    });
  return tempArray;
}

function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }
  return array;
}

container.addEventListener("dragstart", (e) => {
  if (!isPlaying) return;
  const obj = e.target;
  dragged.el = obj;
  dragged.class = obj.className;
  dragged.index = [...obj.parentNode.children].indexOf(obj);
});
container.addEventListener("dragover", (e) => {
  if (!isPlaying) return;
  const obj = e.target;
  e.preventDefault();
  //   console.log(e);
});
container.addEventListener("drop", (e) => {
  if (!isPlaying) return;
  const obj = e.target;

  if (obj.className !== dragged.class) {
    let originPlace;
    let isLast = false;

    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    const droppedindex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedindex
      ? obj.before(dragged.el)
      : obj.after(dragged.el);
    isLast ? originPlace.after(obj) : originPlace.before(obj);
  }
  checkStatus();
});

startButton.addEventListener("click", () => {
  setGame();
  isPlaying = true;
});
