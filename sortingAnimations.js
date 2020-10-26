ANIMATION_SPEED_MS = 240;
const INIT_COLOR = "#320000"; //bordeaux
const LIGHT_GREEN_COLOR = "#adf086";
const SALMON_COLOR = "#F67280";
const GREY_COLOR = "#6C5B7B";
const BLACK_COLOR = "#000000";

var sorting = false;
var animations = [];

function swapBarHeight(index1, index2){
  let bar1 = document.getElementsByClassName('array-bar')[index1];
  let bar2 = document.getElementsByClassName('array-bar')[index2];
  let height1 = bar1.style.height;
  let height2 = bar2.style.height;
  bar1.style.height = height2;
  bar2.style.height = height1;
}

function makeBarHeight(index, height){
  document.getElementsByClassName('array-bar')[index].style.height = height;
}

function makeBarColor(index, color){
  document.getElementsByClassName('array-bar')[index].style.backgroundColor = color;
}

function makeBarBorder(index, color){
  document.getElementsByClassName('array-bar')[index].style.outline = " 3px solid " + color;
  document.getElementsByClassName('array-bar')[index].style.outlineOffset = "-3px";
}
function removeBarBorder(index){
  document.getElementsByClassName('array-bar')[index].style.outline = "none";
  document.getElementsByClassName('array-bar')[index].style.outlineOffset = "0px";
}

function animateBubbleSort() {
  bubbleSort(data);

  for (an in animations){
    let args = animations[an].split(" ");
    setTimeout(function () {
      let num1 = Number(args[1]);
      let num2 = Number(args[2]);
      switch(args[0]){
        case "select":
        makeBarColor(num1, SALMON_COLOR);
        makeBarColor(num2, LIGHT_GREEN_COLOR);
        break;

        case "resetBars":
        makeBarColor(num1, INIT_COLOR);
        makeBarColor(num2, INIT_COLOR);
        break;

        case "swap":
        makeBarColor(num2, SALMON_COLOR);
        makeBarColor(num1, LIGHT_GREEN_COLOR);
        swapBarHeight(num1, num2);
        break;
      }
    }, an * ANIMATION_SPEED_MS);
    if(an == animations.length - 1) {
      setTimeout(function() { sorting = false; }, an * ANIMATION_SPEED_MS);
    }
  }
}

function animateMergeSort(){
  mergeSort(data, 0, data.length - 1);
  let leftThreshhold = 0;

  for (an in animations) {
    let anim_args = animations[an].split(" ");
    setTimeout(function() {
      let num1 = Number(anim_args[1]);
      let num2 = Number(anim_args[2]);
      switch(anim_args[0]){
        case "select":
        leftThreshhold = 0;
        for(var j = num1; j<=num2; j++){
          (j < anim_args[3]) ? makeBarColor(j, SALMON_COLOR) : makeBarColor(j, GREY_COLOR);
        }
        break;

        case "compare":
        makeBarBorder(num1 + leftThreshhold, BLACK_COLOR);
        makeBarBorder(num2, BLACK_COLOR);
        break;

        case "resetBarL":
        removeBarBorder(num1 + leftThreshhold);
        makeBarColor(num1 + leftThreshhold, INIT_COLOR);
        break;

        case "resetBar":
        removeBarBorder(num1);
        makeBarColor(num1, INIT_COLOR);
        break;

        case "swap":
        for(let i = num2; i > (num1 + leftThreshhold); i--) swapBarHeight(i, i - 1);

        removeBarBorder(num1 + leftThreshhold);
        makeBarColor(num1 + leftThreshhold, INIT_COLOR);

        removeBarBorder(num2);
        makeBarColor(num2, SALMON_COLOR);
        leftThreshhold += 1;
        break;
      }
    },an * ANIMATION_SPEED_MS);
    if(an == animations.length - 1) {
      setTimeout(function() { sorting = false; }, an * ANIMATION_SPEED_MS);
    }
  }
}

function animateInsertionSort(){
  insertionSort(data);
  for (an in animations) {
    let args = animations[an].split(" ");
    setTimeout(function(){
      let num1 = Number(args[1]);
      let num2 = Number(args[2]);
      switch(args[0]){
        case "pivot":
        makeBarColor(num1, SALMON_COLOR);
        break;

        case "compare":
        makeBarColor(num1, GREY_COLOR);
        break;

        case "swap":
        swapBarHeight(num1, num2);
        makeBarColor(num1, INIT_COLOR);
        makeBarColor(num2, SALMON_COLOR);
        break;

        case "resetColor":
        makeBarColor(num1, INIT_COLOR);
        break;
      }
    }, an * ANIMATION_SPEED_MS);
    if(an == animations.length - 1) {
      setTimeout(function() { sorting = false; }, an * ANIMATION_SPEED_MS);
    }
  }
}

function animateQuickSort(){
  quickSort(data, 0, data.length -1);
  let leftThreshhold = 0;

  for (an in animations) {
    let anim_args = animations[an].split(" ");

    setTimeout(function(){
      switch(anim_args[0]){
        case "select":
        leftThreshhold = 0;
        let num1 = Number(anim_args[1]);
        let num2 = Number(anim_args[2]);
        for(let i = num1; i <= num2; i++) makeBarColor(i, LIGHT_GREEN_COLOR);
        break;

        case "pivot":
        makeBarColor(Number(anim_args[1]), SALMON_COLOR);
        break;

        case "move":
        if(anim_args[1] == 'r'){
          let num1 = Number(anim_args[2]) - leftThreshhold;
          let num2 = Number(anim_args[3]);

          for(let i = num1; i < num2; i++) swapBarHeight(i, i + 1);

          makeBarColor(num2, INIT_COLOR);
          leftThreshhold += 1
        } else {
          let num1 = Number(anim_args[1]);
          let num2 = Number(anim_args[2]);

          for(let i = num1; i > num2; i--) swapBarHeight(i, i - 1);

          makeBarColor(num1, INIT_COLOR);
          makeBarColor(num2, SALMON_COLOR);
        }
        break;

        case "compare":
        makeBarColor(Number(anim_args[1]) - leftThreshhold, GREY_COLOR);
        break;

        case "resetColor":
        makeBarColor(Number(anim_args[1]), INIT_COLOR);
        break;

      }
    }, an * ANIMATION_SPEED_MS);
    if(an == animations.length - 1) {
      setTimeout(function() { sorting = false; }, an * ANIMATION_SPEED_MS);
    }
  }
}

function makeSortingButtonsDisabled(bool) {
  document.getElementById('bubbleSort').disabled = bool;
  document.getElementById('mergeSort').disabled = bool;
  document.getElementById('insertionSort').disabled = bool;
  document.getElementById('quickSort').disabled = bool;
}

document.getElementById('bubbleSort').onclick = function() {
  makeSortingButtonsDisabled(true);
  animateBubbleSort();
  sorting = true;
  animations = [];
}

document.getElementById('mergeSort').onclick = function() {
  makeSortingButtonsDisabled(true);
  animateMergeSort();
  sorting = true;
  animations = [];
}

document.getElementById('insertionSort').onclick = function() {
  makeSortingButtonsDisabled(true);
  animateInsertionSort();
  sorting = true;
  animations = [];
}

document.getElementById('quickSort').onclick = function() {
  makeSortingButtonsDisabled(true);
  animateQuickSort();
  sorting = true;
  animations = [];
}
