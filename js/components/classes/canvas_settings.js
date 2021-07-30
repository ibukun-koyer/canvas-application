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
    this.show_transform_outline = false;
    this.transform_origin = "begin begin";
  }
}
