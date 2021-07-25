/*
    Function Name: boundaryChecking
    functionality: calculates the current canvas's boundary and the area that has been drawn inside
*/
function boundaryChecking(self, x, y) {
  //calculate the axis string and find the variable being requested for
  const parameters = (axis) => {
    let calculateAxis;
    try {
      calculateAxis = axis?.toUpperCase();
      if (calculateAxis !== "X" && calculateAxis !== "Y") {
        calculateAxis = "X";
      }
    } catch (e) {
      calculateAxis = "X";
    }
    return [calculateAxis, calculateAxis === "Y" ? y : x];
  };
  //find min boundary
  const minBoundary = (axis) => {
    const [calcultedAxis, newEntry] = parameters(axis);

    let boundary = `min${calcultedAxis}Boundary`;
    if (
      self.canvas_settings[boundary] === null ||
      newEntry < self.canvas_settings[boundary]
    ) {
      self.canvas_settings[boundary] = newEntry;
    }
  };
  //find max boundary
  const maxBoundary = (axis) => {
    const [calcultedAxis, newEntry] = parameters(axis);
    let boundary = `max${calcultedAxis}Boundary`;
    if (
      self.canvas_settings[boundary] === null ||
      newEntry > self.canvas_settings[boundary]
    ) {
      self.canvas_settings[boundary] = newEntry;
    }
  };
  //do min and max boundary checking on x and y
  minBoundary("x");
  minBoundary("y");
  maxBoundary("x");
  maxBoundary("y");
}
/*
    Function Name: createNeWwCanvas
    functionality: creates a new canvas object and returns it
*/
function createNewCanvas(self) {
  const newCanvas = document.createElement("canvas");
  newCanvas.classList.add("canvas-item");
  self.parentElement.append(newCanvas);
  return newCanvas;
}
/*
    Function Name: setFitParent
    functionality: sets the size of the canvas to the size of the container on init and resize
*/
function setFitParent(self) {
  self.canvas.width = parseFloat(
    window.getComputedStyle(self.parentElement).width
  );
  self.canvas.height = parseFloat(
    window.getComputedStyle(self.parentElement).height
  );
}
