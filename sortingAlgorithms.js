function bubbleSort(data) {
  var sorted = false;
  var swap = false;
  var i = 0;
  var end_index = data.length - 1

  while(!sorted){
    animations.push("select "+i+" "+ (i+1));
    if(data[i] > data[i + 1]){
      swap = true;
      let temp = data[i];
      data[i] = data[i + 1];
      data[i + 1] = temp;
      animations.push("swap "+i+" "+ (i+1));
    }
    animations.push("resetBars "+i+" "+ (i+1));
    i += 1;
    if(i == end_index){
      if(!swap) sorted = true;
      else swap = false;
      i = 0;
      end_index -= 1;
    }
  }
}

function mergeSort(unsortedArray, left, right){
  if(right - left == 0) return;
  let middle = Math.floor((left + right) / 2);

  mergeSort(unsortedArray, left, middle);
  mergeSort(unsortedArray, middle + 1, right);

  merge(unsortedArray, left, middle, right);
}

function merge(arr, left, middle, right){
  middle++;
  let leftArray = arr.slice(left, middle);
  let rightArray = arr.slice(middle, right + 1);

  animations.push("select " + left + " " + right + " " + middle);

  var l = 0;
  var r = 0;
  var k = left;

  while(l < leftArray.length && r < rightArray.length){
    animations.push("compare " + (left + l) + " " + (middle + r));
    if (leftArray[l] <= rightArray[r]) {
      animations.push("resetBarL " + (left + l));
      arr[k] = leftArray[l];
      l++;
    } else {
      animations.push("swap " + (left + l) + " " + (middle + r));
      arr[k] = rightArray[r];
      r++;
    }
    k++;
  }

  while(l < leftArray.length){
    arr[k] = leftArray[l];
    animations.push("resetBarL "+ (left + l));
    l++;
    k++;
  }

  while(r < rightArray.length){
    arr[k] = rightArray[r];
    animations.push("resetBar "+ (middle + r));
    r++;
    k++;
  }
}

function insertionSort(data){
  for(let i = 1; i < data.length; i++){
    animations.push("pivot " + i);

    for(let j = i - 1; j >= 0; j--){
      animations.push("compare " + j);
      if(data[i] > data[j]){
        animations.push("resetColor " + j);
        break;
      }

      if(data[i] < data[j] && (j - 1 >= 0 ? data[i] > data[j - 1] : true)){

        let temp = data[i];

        for(let x = i; x > j; x--){
          animations.push("swap " + x + " " + (x-1));
          data[x] = data[x - 1];
        }

        data[j] = temp;
        animations.push("resetColor " + j);
        break;
      }
    }
    animations.push("resetColor " + i);
  }
}

function quickSort(arr, left, right){
  if(left < right){
    animations.push("select " + left + " " + right);
    let pivot = partition(arr, left, right);

    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
}

function partition(arr, left, right){
  let pivot = arr[right];
  animations.push("pivot " + right);
  let elements = arr.slice(left, right);
  var smallerI = left;
  var biggerI = right;

  for(let i = 0; i < elements.length; i++){
    if(i < biggerI) animations.push("compare " + (i + left));
    if(elements[i] < pivot){
      arr[smallerI] = elements[i];
      animations.push("resetColor " + smallerI);
      smallerI++;
    } else {
      arr[biggerI] = elements[i];
      animations.push("move r " + (i + left) + " " + (biggerI - 1));
      biggerI--;
    }
  }

  arr[smallerI] = pivot;
  animations.push("move " + right + " " + smallerI);
  animations.push("resetColor " + smallerI);
  return smallerI;
}
