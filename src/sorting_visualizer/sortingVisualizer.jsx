import React from 'react';
import './sortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {bubbleSort} from '../sorting_algorithms/bubbleSort.js';
import {quicksortHelper} from '../sorting_algorithms/quickSort.js';
import {mergeSort} from '../sorting_algorithms/mergeSort.js';
import {heapSortHelper} from '../sorting_algorithms/heapSort.js';

// Wait time in ms for bubble sort
const WAIT_TIME_BUBBLE = 5;

// Wait time in ms for quick sort
const WAIT_TIME_QUICK = 50;

// Wait time in ms for merge sort
const WAIT_TIME_MERGE = 30;

// Wait time in ms for heap sort
const WAIT_TIME_HEAP = 30;

// Default colour for the bars
const DEFAULT_BACKGROUND = 'MediumAquaMarine';

// Color of array bars that are being compared
const SWITCH_COLOUR = 'HotPink';

// Colour of array bar that acts as a pivot
const PIVOT_COLOUR = 'Plum';

export default class SortingVisualizer extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            array : []
        }
    }

    render(){
        const {array} = this.state;
        return(
            <div>
                <div className = 'array-container'>
                    {array.map((value, idx) => (
                        <div className = 'array-element' 
                            key={ idx }
                            style = {{
                                backgroundColor: DEFAULT_BACKGROUND,
                                height: `${ value }px`,
                            }}> 
                        </div>
                    ))}
                </div>
                <div className='button-container'>
                    <ButtonGroup vertical>
                        <Button variant='secondary' onClick = {() => this.setArray()}>Reset Array</Button>
                        <Button variant='secondary' onClick = {() => this.bubbleSortVisuals()}>Bubble Sort</Button>
                        <Button variant='secondary' onClick = {() => this.quickSortVisuals()}>Quick Sort</Button>
                        <Button variant='secondary' onClick = {() => this.mergeSortVisuals()}>Merge Sort</Button>
                        <Button variant='secondary' onClick = {() => this.heapSortVisuals()}>Heap Sort</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }

    bubbleSortVisuals(){
        const animations = bubbleSort(this.state.array);
        for(let i = 0; i < animations.length; i++){  
            const arrayBars = document.getElementsByClassName('array-element');
            // Animations is a 2D array, if the value at index [i][1] is a 1,
            // there is a swap of values, else there is a colour change.
            const colourChange = animations[i][1] !== 1;
            if(colourChange){
                const [indexOne, indexTwo] = animations[i][0];
                const barOneStyle = arrayBars[indexOne].style;
                const barTwoStyle = arrayBars[indexTwo].style;
                const colour = animations[i][1] === 0 ? SWITCH_COLOUR:DEFAULT_BACKGROUND;
                setTimeout(() => {
                    barOneStyle.backgroundColor = colour;
                    barTwoStyle.backgroundColor = colour;
                }, WAIT_TIME_BUBBLE*i);
            }else{
                const [barOneIndex, barTwoIndex] = animations[i][0];
                const barOne = arrayBars[barOneIndex];
                const barTwo = arrayBars[barTwoIndex];
                setTimeout(() => {
                    let temp = barOne.style.height;
                    barOne.style.height = barTwo.style.height;
                    barTwo.style.height = temp;
                }, WAIT_TIME_BUBBLE*i);
            }
            
        }

    }

    quickSortVisuals(){
        const animations = quicksortHelper(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-element');
            const [pivotBar, barLeft, barRight] = animations[i][0];
            const pivotStyle = arrayBars[pivotBar].style;
            const leftStyle = arrayBars[barLeft].style;
            const rightStyle = arrayBars[barRight].style;
            if(animations[i][1] == 0){
                setTimeout(() => {
                    leftStyle.backgroundColor = SWITCH_COLOUR;
                    rightStyle.backgroundColor = SWITCH_COLOUR;
                    pivotStyle.backgroundColor = PIVOT_COLOUR;
                    let temp = leftStyle.height;
                    leftStyle.height = rightStyle.height;
                    rightStyle.height = temp;
                }, WAIT_TIME_QUICK*i);
            }else if(animations[i][1] == 1){
                setTimeout(() => {
                    pivotStyle.backgroundColor = DEFAULT_BACKGROUND;
                    leftStyle.backgroundColor = DEFAULT_BACKGROUND;
                    rightStyle.backgroundColor = DEFAULT_BACKGROUND;
                }, WAIT_TIME_QUICK*i);
            }
            
        }
    }

    mergeSortVisuals(){
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-element');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
              const [barOneIdx, barTwoIdx] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const color = i % 3 === 0 ? SWITCH_COLOUR : DEFAULT_BACKGROUND;
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * WAIT_TIME_MERGE);
            } else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * WAIT_TIME_MERGE);
            }
          }
       
    }

    heapSortVisuals(){
        const animations = heapSortHelper(this.state.array);
        for(let i = 0; i < animations.length; i++){  
            const arrayBars = document.getElementsByClassName('array-element');
            const [indexOne, indexTwo] = animations[i][0];
            const barOneStyle = arrayBars[indexOne].style;
            const barTwoStyle = arrayBars[indexTwo].style;
            if(animations[i][1] == 0){
                setTimeout(() => {
                    barOneStyle.backgroundColor = SWITCH_COLOUR;
                    barTwoStyle.backgroundColor = SWITCH_COLOUR;
                    let temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                }, WAIT_TIME_HEAP*i);
            }else{
                setTimeout(() => {
                   barOneStyle.backgroundColor = DEFAULT_BACKGROUND;
                   barTwoStyle.backgroundColor = DEFAULT_BACKGROUND;
                }, WAIT_TIME_HEAP*i);
            }
            
        }
    }

    componentDidMount(){
        this.setArray();
    }

    setArray(){
        const array = []
        for(let i = 0; i < 100; i++){
            array.push(randomInt());
        }
        this.setState({array : array});
    }

}

function randomInt(){
    return  Math.floor(Math.random() * (500 - 5 + 1)) + 5;
}