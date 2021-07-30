class transform {
  constructor(canvas_settings) {
    this.transform_element = null;
    this.canvas_settings = canvas_settings;
  }
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
  transform(canvas) {
    if (this.canvas_settings.show_transform_outline) {
      this.transform_element.remove();
    } else {
      const transform_outline = document.createElement("div");
      transform_outline.classList.add("transform_outline");

      canvas.insertAdjacentElement("afterend", transform_outline);
      this.transform_element = transform_outline;

      const wrapEdges = document.createElement("div");
      wrapEdges.classList.add("wrapEdges");
      transform_outline.append(wrapEdges);

      for (let i = 0; i < 8; i++) {
        const transformEdge = document.createElement("div");
        transformEdge.classList.add("transformEdge");
        transformEdge.classList.add("turn-off-drag");
        const edgeSize = getCssVariable("edge-size");
        const pos = `${(edgeSize / 2) * -1}px`;
        const one_dir_pos = "calc((100% - var(--edge-size)) / 2)";
        // if (i < 4) {
        transformEdge.style.top = i === 0 || i === 1 ? pos : i === 4 ? pos : "";
        transformEdge.style.bottom =
          i === 2 || i === 3
            ? pos
            : i === 5
            ? pos
            : i === 6 || i === 7
            ? one_dir_pos
            : "";
        transformEdge.style.left =
          i === 0 || i === 2
            ? pos
            : i === 6
            ? pos
            : i === 4 || i === 5
            ? one_dir_pos
            : "";
        transformEdge.style.right =
          i === 1 || i === 3 ? pos : i === 7 ? pos : "";

        transformEdge.style.cursor =
          i === 0 || i === 3
            ? "nw-resize"
            : i === 4 || i === 5
            ? "n-resize"
            : i === 6 || i === 7
            ? "w-resize"
            : "ne-resize";

        wrapEdges.append(transformEdge);
      }
      const rotate_icon = document.createElement("i");
      rotate_icon.classList.add("fa");
      rotate_icon.classList.add("fa-repeat");
      rotate_icon.setAttribute("aria-hidden", "true");
      rotate_icon.classList.add("rotate-icon");
      rotate_icon.classList.add("turn-off-drag");
      const locations = this.canvas_settings.transform_origin.split(" ");
      const rotate_icon_size = getCssVariable("rotate-size") + "rem";
      let rotate_offset = "1.2rem";

      console.log(locations);
      if (locations[0] === "center") {
        rotate_icon.style.left = `calc((100% - ${rotate_icon_size}) / 2)`;
      }
      if (locations[0] === "begin") {
        rotate_icon.style.left = `calc((${rotate_icon_size} * -1) - ${rotate_offset})`;
      }
      if (locations[0] === "end") {
        rotate_icon.style.right = `calc((${rotate_icon_size} * -1) - ${rotate_offset})`;
      }
      if (locations[1] === "begin") {
        rotate_icon.style.top = `calc((${rotate_icon_size} * -1) - ${rotate_offset})`;
      }
      if (locations[1] === "center") {
        rotate_icon.style.top = `calc((100% - ${rotate_icon_size}) / 2)`;
      }
      if (locations[1] === "end") {
        rotate_icon.style.bottom = `calc((${rotate_icon_size} * -1) - ${rotate_offset})`;
      }

      wrapEdges.append(rotate_icon);
      this.resize_outline();
    }
  }
}
