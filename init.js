const MAX_RANGE = 40;
const MIN_RANGE = 5;
CURR_SIZE = 20;

function createData () {
  var arr = [];
  while(arr.length < CURR_SIZE){
    var r = Math.floor(Math.random() * CURR_SIZE) + 1;
    if(arr.indexOf(r) == -1) arr.push(r);
  }
  return arr;
}

function getHeight(value) {
  return value/CURR_SIZE * 100;
}

function clearArray() {
  var container = document.getElementById('container');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function newArray() {
  data = createData();
  var container = document.getElementById('container');

  container.style.width = 24 * CURR_SIZE+"px";

  for(elem of data) {
    let height = getHeight(elem);
    let newElem = document.createElement('div');

    newElem.classList.add('array-bar');
    newElem.style.height = getHeight(elem) + "%";

    container.appendChild(newElem);
  }
}

var data;

window.onload = function () {
  newArray();
}

document.getElementById('reset').onclick = function() {
  if(!sorting){
    clearArray();
    newArray();
    makeSortingButtonsDisabled(false);
  }
}

document.getElementById("slideRange").onchange = function() {
  let val = this.value;
  ANIMATION_SPEED_MS = val;
  CURR_SIZE = Math.max(Math.floor((1 - val/(500 - 20)) * MAX_RANGE), MIN_RANGE);
  clearArray();
  newArray();
  makeSortingButtonsDisabled(false);
}
