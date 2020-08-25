/*
 * Author: Jessie Cruz
 * Date: August 24, 2020
 */
let rects;
let helper;
let rectStates;
let helperStates;
let totalRects;
let scl = 50;
let sorter;

// From: coolors.co
const rectColor = [241, 242, 246];
const sortedColor = [29, 175, 104];
const currentColor = [33, 118, 255];
const comparisonColor = [230, 57, 70];
const highlightColor = [255, 190, 11];
const helperColor2 = [254, 147, 140];

const sortedState = 1;
const currentState = 2;
const comparisonState = 3;
const highlightState = 4;
const helperState2 = 5;

function setup() {
  createCanvas(800, 700);
  totalRects = floor(width / scl);
  rects = new Array(totalRects);
  initRectsArray();
  rectStates = Array(rects.length).fill(0);
  helperStates = Array(rects.length).fill(highlightState);
  
  // SORTING
  helper = new Array(rects.length);
  sorter = mergeSort(rects, helper, 0, rects.length - 1);
  frameRate(1);
}

function draw() {
  sorter.next();
  background(0);
  fill(255);
  drawRects();
}

function getFill(array, index) {
  switch (array[index]) {
    case sortedState:
      fill(sortedColor);
      break;
      
    case currentState:
      fill(currentColor);
      break;
      
    case comparisonState:
      fill(comparisonColor);
      break;
      
    case highlightState:
      fill(highlightColor)
      break;
      
    case helperState2:
      fill(helperColor2)
      break;
      
    default:
      fill(rectColor);
  }
}

function drawRects() {
  for (let i = 0; i < rects.length; i++) {
    drawRectArray(i);
    
    drawHelperArray(i);
  }
}

function drawRectArray(index) {
  getFill(rectStates, index);
  let halfHeight = 0.5 * height
  let yoff = halfHeight - 1 - rects[index];
  rect(index * scl, yoff, scl, rects[index]);

  let xoff = index * scl + 0.5 * scl;
  textAlign(CENTER);
  text(rects[index], xoff, yoff - 10);
}

function drawHelperArray(index) {
  getFill(helperStates, index);
  let yoff2 = height - 1 - helper[index];
  rect(index * scl, yoff2, scl, helper[index]);
  
  if (helper[index] > 0) {
    let xoff = index * scl + 0.5 * scl;
    textAlign(CENTER);
    text(helper[index], xoff, yoff2 - 10);
  }
}

function initRectsArray() {
  for (let i = 0; i < rects.length; i++) {
    rects[i] = floor(random(5, height * 0.5 - 30));
  }
}