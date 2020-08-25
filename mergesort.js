/*
 * Author: Jessie Cruz
 * Date: August 24, 2020
 */
function* mergeSort(array, helper, low, high) {
  if (low < high) {
    let middle = low + floor((high - low) / 2);
    yield* mergeSort(array, helper, low, middle); // SORT LEFT HALF;
    yield* mergeSort(array, helper, middle + 1, high); // SORT RIGHT HALF;
    yield* merge(array, helper, low, middle, high); // MERGE BOTH HALVES;
  }
}

function* merge(array, helper, low, middle, high) {
  // COPY BOTH HALVES;
  helper.fill(0);
  for (let i = low; i <= high; i++) {
    helper[i] = array[i];
  }

  let helperLeft = low;
  let helperRight = middle + 1;
  let current = low;

  while (helperLeft <= middle && helperRight <= high) {
    // RESET "HIGHLIGHTS".
    rectStates = rectStates.map(x => (x === sortedState ? sortedState : 0));
    helperStates.fill(0);

    // CURRENT INDEX "HIGHLIGHT";
    rectStates[current] = currentState;
    helperStates[helperLeft] = comparisonState;
    helperStates[helperRight] = comparisonState;
    yield;


    if (helper[helperLeft] <= helper[helperRight]) {

      // LEFT COMPARISON "HIGHLIGHT";
      helperStates[helperLeft] = highlightState;
      yield;
      array[current] = helper[helperLeft];
      helperLeft++;


    } else {

      // RIGHT COMPARISON "HIGHLIGHT"
      helperStates[helperRight] = highlightState;
      yield;
      array[current] = helper[helperRight];
      helperRight++;

    }

    // Set color states
    rectStates[current] = highlightState;
    yield;
    rectStates[current] = sortedState;
    current++;
  }

  let remaining = middle - helperLeft;

  if (remaining < 0) {
    yield;
    rectStates[current] = currentState;
    yield;
    rectStates[current] = sortedState;
    yield;
  }

  for (let i = 0; i <= remaining; i++) {
    rectStates = rectStates.map(x => (x === sortedState ? sortedState : 0));
    helperStates.fill(0);
    helperStates[helperLeft + i] = highlightState;
    yield;

    rectStates[current + i] = highlightState;
    yield;

    array[current + i] = helper[helperLeft + i];
    rectStates[current + i] = sortedState;
    yield;
  }
}
