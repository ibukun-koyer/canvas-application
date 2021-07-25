//the canvas container classname
const canvas_container_id = "contain-canvas";
//save points class
class savePoints {
  constructor() {
    this.path = [];
  }
  saveNewPoint(x, y) {
    this.path.push([x, y]);
  }
  getPaths() {
    return this.path;
  }
}
//a class that stores the canvas current setting and allows you to change canvas settings.
class canvas_settings {
  constructor(context) {
    this.context = context;
    this.context.fillStyle = "black";
    this.context.lineWidth = 1;
    this.context.font = "30px Arial";
    this.context.strokeStyle = "black";
    this.isDrawing = false;
    this.type_Of_draw = "stroke_line";
    this.prevWidth = 0;
    this.prevHeight = 0;
    this.currentSaveSpot = -1;
    this.minXBoundary = null;
    this.maxXBoundary = null;
    this.minYBoundary = null;
    this.maxYBoundary = null;
    this.savePoints = [];
  }
}

//this is the canvas object that keeps track of the action of the canvas obj
class canvas_object {
  parentElement = document.querySelector(`#${canvas_container_id}`);
  constructor() {
    this.canvas = this.createNewCanvas();
    this.setCanvasSizeToParentSize();
    this.context = this.canvas.getContext("2d");
    this.canvas_settings = new canvas_settings(this.context);
    this.canvas_settings.prevWidth = this.canvas.width;
    this.canvas_settings.prevHeight = this.canvas.height;
    this.eventListenrs();
  }
  setCanvasSizeToParentSize() {
    this.canvas.width = parseFloat(
      window.getComputedStyle(this.parentElement).width
    );
    this.canvas.height = parseFloat(
      window.getComputedStyle(this.parentElement).height
    );
  }

  //create the canvas
  createNewCanvas() {
    const newCanvas = document.createElement("canvas");
    newCanvas.classList.add("canvas-item");
    this.parentElement.append(newCanvas);
    return newCanvas;
  }
  boundaryChecking(x, y) {
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
    const minBoundary = (axis) => {
      const [calcultedAxis, newEntry] = parameters(axis);

      let boundary = `min${calcultedAxis}Boundary`;
      if (
        this.canvas_settings[boundary] === null ||
        newEntry < this.canvas_settings[boundary]
      ) {
        this.canvas_settings[boundary] = newEntry;
      }
    };
    const maxBoundary = (axis) => {
      const [calcultedAxis, newEntry] = parameters(axis);
      let boundary = `max${calcultedAxis}Boundary`;
      if (
        this.canvas_settings[boundary] === null ||
        newEntry > this.canvas_settings[boundary]
      ) {
        this.canvas_settings[boundary] = newEntry;
      }
    };
    minBoundary("x");
    minBoundary("y");
    maxBoundary("x");
    maxBoundary("y");
  }
  //initialize draw based on selected draw method
  beginDraw(x, y) {
    this.canvas_settings.isDrawing = true;
    if (this.canvas_settings.type_Of_draw === "stroke_line") {
      this.canvas_settings.savePoints.push(new savePoints());
      this.canvas_settings.currentSaveSpot += 1;

      this.canvas_settings.savePoints[
        this.canvas_settings.currentSaveSpot
      ].saveNewPoint(x, y);

      this.context.moveTo(x, y);
      this.context.beginPath();
      this.boundaryChecking(x, y);
    }
    // this.context.
  }
  //update the draw
  updateDraw(x, y) {
    if (this.canvas_settings.isDrawing) {
      if (this.canvas_settings.type_Of_draw === "stroke_line") {
        this.canvas_settings.savePoints[
          this.canvas_settings.currentSaveSpot
        ].saveNewPoint(x, y);

        this.boundaryChecking(x, y);
        this.context.lineTo(x, y);
        this.context.stroke();
      }
    }
  }
  //end drawing
  endDraw() {
    console.log(this.canvas_settings);
    this.context.closePath();
    this.canvas_settings.isDrawing = false;
  }
  //create event listers for this canvas
  eventListenrs() {
    //-->on draw start
    this.canvas.addEventListener("mousedown", (e) => {
      this.beginDraw(e.offsetX, e.offsetY);
    });
    //-->on draw update
    this.canvas.addEventListener("mousemove", (e) => {
      this.updateDraw(e.offsetX, e.offsetY);
    });
    //-->on draw end
    this.canvas.addEventListener("mouseup", (e) => {
      this.endDraw();
    });
    window.addEventListener("resize", () => {
      this.setCanvasSizeToParentSize();
    });
  }
}

//the canvas main call
function canvas_base_functionality() {
  const canvas_interaction = new canvas_object();
  //getting all inputs
  //-->getting color input
  const color_input = document.querySelector(".stroke_color_input");
  color_input.addEventListener("change", () => {
    canvas_interaction.canvas_settings.context.strokeStyle = color_input.value;
  });
  //-->getting line width input
  const lineWidth = document.querySelector(".stroke-width");
  lineWidth.addEventListener("change", () => {
    canvas_interaction.canvas_settings.context.lineWidth = lineWidth.value;
  });
}
