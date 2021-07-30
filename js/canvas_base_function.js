//the canvas main call
function canvas_base_functionality() {
  const canvas_interaction = new canvas_object();

  //

  //these are the input listeners, they would all be removed later on, they are here for just testing

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

  function setSelectedRadio(radio, type) {
    let originStr = canvas_interaction.canvas_settings.transform_origin;

    console.log(radio.checked, type);
    if (radio.checked && originStr) {
      let split = originStr.split(" ");
      console.log(radio.nextElementSibling.innerText);
      canvas_interaction.canvas_settings.transform_origin =
        type === 0
          ? radio.nextElementSibling.innerText + " " + split[1]
          : split[0] + " " + radio.nextElementSibling.innerText;
      canvas_interaction.refresh_transform();
    }
  }
  //-->getting x-origin
  document.querySelectorAll(".x-origin").forEach((radio) => {
    radio.addEventListener("change", () => {
      setSelectedRadio(radio, 0);
    });
  });

  //-->getting y-origin
  document.querySelectorAll(".y-origin").forEach((radio) => {
    radio.addEventListener("change", () => {
      setSelectedRadio(radio, 1);
    });
  });
}
