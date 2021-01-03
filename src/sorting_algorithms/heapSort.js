var animations = [];

export function heapSortHelper(array){
    animations.length = 0;
    heapSort(array);
    return animations; // [[indexOne, indexTwo], 0 or 1 or 2]
}

function heapSort(array){
    let n = array.length;
    let i = Math.floor(n/2 - 1);
    let k = n-1;

    while(i >= 0){
        heapify(array, n, i);
        i--;
    }

    while(k >= 0){
        // Push the values that are being swapped 3 
        animations.push([[k, 0], 0]);
        animations.push([[k, 0], 1]);
        //animations.push([[k, 0], 2]);
        [array[k], array[0]] = [array[0], array[k]];
        heapify(array, k, 0);
        k--;
    }

    return array;
}


function heapify(array, length, i){
    var left = 2*i + 1;
    var right = 2*i + 2;
    var max = i;

    if(left < length && array[left] > array[max]){
        max = left;
    }
    
    if(right < length && array[right] > array[max]){
        max = right;
    }

    if(max != i){
        [array[i], array[max]] = [array[max], array[i]];
        animations.push([[i, max], 0]);
        animations.push([[i, max], 1]);
        //animations.push([[i, max], 2]);
        heapify(array, length, max);
    }
    
    return array;
}
