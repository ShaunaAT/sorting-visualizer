var animations = [];

export function quicksortHelper(array){
    animations.length = 0;
    quicksort(array, 0, array.length-1);
    return animations; // [[pivot, left, right], 0 or 1]
}

function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}


function quicksort(array, left, right) {
   if(left >= right){
       return;
   }
   let pivot = partition(array, left, right);
   quicksort(array, left, pivot-1);
   quicksort(array, pivot+1, right);
}


function partition(array, left, right) {
    let pivotIndex = left;
    let pivotValue = array[right];

    for(let i = left; i < right; i++){
        if(array[i] < pivotValue){
            swap(array, i, pivotIndex);
            // i and the pivot index are the indices of the values being compared,
            // so they are pushed twice. The 0 indicates a change of colour and
            // swap. The 1 indicates a change back to the default colour.
            animations.push([[pivotIndex, i, pivotIndex], 0]);
            animations.push([[pivotIndex, i, pivotIndex], 1]);
            pivotIndex++;
        }
    }

    swap(array, pivotIndex, right);
    // Push these values twice to change their colour, swap the
    // values at pivotIndex and right, and then change their colour back
    // to the default.
    animations.push([[pivotIndex, pivotIndex, right], 0]);
    animations.push([[pivotIndex, pivotIndex, right], 1]);
    return pivotIndex;
}

