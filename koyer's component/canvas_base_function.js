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
  }
}
//this is the canvas object that keeps track of the action of the canvas obj
class canvas_object {
  constructor(context) {
    this.context = context;
    this.canvas_settings = new canvas_settings(context);
  }
  //initialize draw based on selected draw method
  beginDraw(x, y) {
    this.canvas_settings.isDrawing = true;

    if (this.canvas_settings.type_Of_draw === "stroke_line") {
      this.context.beginPath();
      this.context.moveTo(x, y);
    }
    // this.context.
  }
  //update the draw
  updateDraw(x, y) {
    if (this.canvas_settings.isDrawing) {
      if (this.canvas_settings.type_Of_draw === "stroke_line") {
        this.context.lineTo(x, y);
        this.context.stroke();
      }
    }
  }
  //end drawing
  endDraw() {
    this.context.closePath();
    this.canvas_settings.isDrawing = false;
  }
}
//the canvas main call
function canvas_base_functionality() {
  const canvas = document.querySelector("#canvas");
  const canvas_interaction = new canvas_object(canvas.getContext("2d"));

  canvas.addEventListener("mousedown", (e) => {
    canvas_interaction.beginDraw(e.pageX, e.pageY);
  });
  canvas.addEventListener("mousemove", (e) => {
    canvas_interaction.updateDraw(e.pageX, e.pageY);
  });
  canvas.addEventListener("mouseup", (e) => {
    canvas_interaction.endDraw();
  });

  //getting all inputs
  const color_input = document.querySelector(".stroke_color_input");
  color_input.addEventListener("change", () => {
    canvas_interaction.canvas_settings.context.strokeStyle = color_input.value;
  });
}
