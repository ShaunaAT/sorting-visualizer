export function bubbleSort(a){
    let len = a.length;
    let swapped;
    const animations = [];
    do {
        swapped = false;
        // 0 for switch colour to SWITCH_COLOUR
        // 1 for swap heights
        // 2 for switch back to DEFAULT_COLOUR
        for (let i = 0; i < len-1; i++) {
            animations.push([[i, i+1], 0]);
            if (a[i] > a[i + 1]) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
                animations.push([[i, i+1], 1]);
            }
            animations.push([[i, i+1], 2]);
        }
    } while (swapped);
    return animations; 
}
