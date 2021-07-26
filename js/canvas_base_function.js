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
  //-->getting click notice
  const transform = document.querySelector(".transform");
  transform.addEventListener("click", () => {
    // canvas_interaction.canvas_settings.context.lineWidth = lineWidth.value;
    canvas_interaction.transform();
  });
}
