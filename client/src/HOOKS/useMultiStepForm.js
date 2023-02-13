import React from "react";
import { useState } from "react";

// arg: array of components for each steps
export const useMultiStepsForm = (steps) => {
  const [currentStepInx, setCurrentStepInx] = useState(0);

  // add props on existing React.element
  steps[0] = React.cloneElement(
    steps[0],
    { next: next }
  );

  steps[1] = React.cloneElement(
    steps[1],
    { back: back }
  )

  function next() {
    // go next: if: not last page
    setCurrentStepInx(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepInx(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  // go to specific page
  function goto(index) {
    setCurrentStepInx(index);
  }
  
  return {
    currentStepInx,
    // current form step
    step: steps[currentStepInx],
    // all steps
    steps,
    goto,
    next,
    back,
    activeStep: currentStepInx,
  }
}