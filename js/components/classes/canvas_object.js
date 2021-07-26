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
    this.transform_element = null;
    this.eventListenrs();
  }
  //set canvas size to the parent size
  setCanvasSizeToParentSize() {
    setFitParent(this);
  }
  //create the canvas
  createNewCanvas() {
    return createNewCanvas(this);
  }
  boundaryChecking(x, y) {
    boundaryChecking(this, x, y);
  }
  //initialize draw based on selected draw method
  beginDraw(x, y) {
    this.canvas_settings.isDrawing = true;
    var self = this;
    new stroke_line().beginDraw(self, x, y);
    // this.context.
  }
  //update the draw
  updateDraw(x, y) {
    if (this.canvas_settings.isDrawing) {
      new stroke_line().updateDraw(this, x, y);
    }
  }
  //end drawing
  endDraw() {
    console.log(this.canvas_settings);
    // this.context.closePath();
    this.canvas_settings.isDrawing = false;
  }
  //resize the transform outline
  resize_outline() {
    if (this.transform_element) {
      this.transform_element.style.top = `${this.canvas_settings.minYBoundary}px`;
      this.transform_element.style.left = `${this.canvas_settings.minXBoundary}px`;
      this.transform_element.style.width = `${
        this.canvas_settings.maxXBoundary - this.canvas_settings.minXBoundary
      }px`;
      this.transform_element.style.height = `${
        this.canvas_settings.maxYBoundary - this.canvas_settings.minYBoundary
      }px`;
    }
  }
  //create transform outline, and implement tranformation functionalities
  transform() {
    const transform_outline = document.createElement("div");
    transform_outline.classList.add("transform_outline");
    this.canvas.insertAdjacentElement("afterend", transform_outline);
    this.transform_element = transform_outline;
    this.resize_outline();
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

      this.canvas_settings.minXBoundary *=
        this.canvas.width / this.canvas_settings.prevWidth;
      this.canvas_settings.maxXBoundary *=
        this.canvas.width / this.canvas_settings.prevWidth;
      this.canvas_settings.minYBoundary *=
        this.canvas.height / this.canvas_settings.prevHeight;
      this.canvas_settings.maxYBoundary *=
        this.canvas.height / this.canvas_settings.prevHeight;

      this.canvas_settings.prevHeight = this.canvas.height;
      this.canvas_settings.prevWidth = this.canvas.width;

      this.resize_outline();

      new stroke_line().resize(this);
    });
  }
}
