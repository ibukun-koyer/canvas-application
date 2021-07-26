class stroke_line {
  beginDraw = (self, x, y) => {
    if (self.canvas_settings.type_Of_draw === "stroke_line") {
      self.canvas_settings.savePoints.push(
        new savePoints({
          line_width: self.canvas_settings.context.lineWidth,
          line_color: self.canvas_settings.context.strokeStyle,
          canvas_width: self.canvas.width,
          canvas_height: self.canvas.height,
        })
      );
      self.canvas_settings.currentSaveSpot += 1;

      self.canvas_settings.savePoints[
        self.canvas_settings.currentSaveSpot
      ].saveNewPoint(x, y);

      self.context.moveTo(x, y);
      self.context.beginPath();
      self.boundaryChecking(x, y);
    }
  };
  updateDraw = (self, x, y) => {
    if (self.canvas_settings.type_Of_draw === "stroke_line") {
      self.canvas_settings.savePoints[
        self.canvas_settings.currentSaveSpot
      ].saveNewPoint(x, y);

      self.boundaryChecking(x, y);
      self.context.lineTo(x, y);
      self.context.stroke();
    }
  };
  resize = (self) => {
    if (self.canvas_settings.type_Of_draw === "stroke_line") {
      for (let savePoint of self.canvas_settings.savePoints) {
        self.context.strokeStyle = savePoint.pathSettings.line_color;
        self.context.lineWidth = savePoint.pathSettings.line_width;
        let i = 0;
        let widthRatio =
          self.canvas.width / savePoint.pathSettings.canvas_width;
        let heightRatio =
          self.canvas.height / savePoint.pathSettings.canvas_height;

        for (let path of savePoint.path) {
          if (i === 0) {
            self.context.moveTo(path[0] * widthRatio, path[1] * heightRatio);
            self.context.beginPath();
            i++;
          } else {
            self.context.lineTo(path[0] * widthRatio, path[1] * heightRatio);
          }
        }
        // self.context.closePath();
        self.context.stroke();
      }
    }
  };
}
