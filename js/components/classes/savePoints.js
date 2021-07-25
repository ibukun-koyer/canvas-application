//save points class
class savePoints {
  constructor(pathSettings) {
    this.path = [];
    this.pathSettings = pathSettings;
  }
  saveNewPoint(x, y) {
    this.path.push([x, y]);
  }
  getPaths() {
    return this.path;
  }
}
