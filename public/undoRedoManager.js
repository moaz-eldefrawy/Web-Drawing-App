class UndoRedoManager {
  constructor() {
    this.shapes = [];
    this.snapShots = [[]];
    this.currentSnapIndex = 0;
  }

  //the shape and its index
  newShapes(newShapes) {
    this.clearSnapsInFront(this.currentSnapIndex);
    this.shapes = this.cloneShapes(newShapes);
    this.snapShots.push(this.cloneShapes(newShapes));
    this.currentSnapIndex = this.snapShots.length - 1;
  }

  //go back one frame
  undo() {
    if (this.currentSnapIndex > 0) {
      this.currentSnapIndex--;
      this.shapes = this.cloneShapes(this.snapShots[this.currentSnapIndex]);
      draEng.shapes = this.cloneShapes(this.shapes);
      draEng.refresh();
    }
  }

  //advance one frame
  redo() {
    if (this.currentSnapIndex != this.snapShots.length - 1) {
      this.currentSnapIndex++;
      this.shapes = this.cloneShapes(this.snapShots[this.currentSnapIndex]);
      draEng.shapes = this.cloneShapes(this.shapes);
      draEng.refresh();
    }
  }

  cloneShapes(shapes) {
    let ret = [];
    for (let i = 0; i < shapes.length; i++) {
      ret.push(shapes[i].clone());
    }
    return ret;
  }

  clearSnapsInFront(index) {
    let ret = [];
    for (let i = 0; i <= index; i++) {
      ret.push(this.snapShots[i]);
    }
    this.snapShots = ret;
  }
}
