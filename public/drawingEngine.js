class DrawingEngine {
  constructor() {
    this.shapes = [];

    this.selectedShape = null;
    this.moving = false;

    /*** Know Which Shape the User clicked  ***/
    canvas.addEventListener("click", this.detectClick);
    canvas.addEventListener("mousemove", this.detectMove);

    // for resizing
    canvas.addEventListener("mousedown", this.detectResizeStart);
  }
  shapeIndex(shape) {
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i] == shape) return i;
    }
  }
  deleteShape(shape) {
    undoRedoManager.deleteShape(draEng.shapeIndex(shape));

    //filter shapes
    this.shapes.filter((x) => x != shape);

    undoRedoManager.deleteShape(index);
    draEng.refresh();
  }

  copySelectedShape() {
    //have to unselect first to avoid copying the edge color
    draEng.selectedShape.unselect();
    let copy = draEng.selectedShape.clone();
    copy.rePosition(new Point(600, 300));
    draEng.addShape(copy);
    draEng.clearSelectedShape();
    draEng.refresh();
  }

  detectResizeStart(event) {
    const pos = getMousePosition(canvas, event);
    let arr = draEng.getShapesInRange(pos);
    // shape to resize
    draEng.resizedShape = arr[0];
    if (
      draEng.resizedShape === draEng.selectedShape &&
      event.button == 2 &&
      draEng.moving == false
    ) {
      if (draEng.selectedShape.type() == "triangle")
        draEng.selectedShape.selectPoint(pos);

      console.log("resizeing");
      event.stopPropagation();
      canvas.addEventListener("mousemove", draEng.detectResizeChange);
      canvas.addEventListener("mouseup", draEng.detectResizeRelase);
    }
  }

  detectResizeChange(event) {
    let p1 = draEng.resizedShape.p1 || draEng.resizedShape.center;
    let p2 = getMousePosition(canvas, event);

    if (draEng.resizedShape.type() == "triangle")
      ShapeFactory.drawDottedTriangle(event, draEng.resizedShape);
    else ShapeFactory.drawDottedShape(event, p1, draEng.resizedShape.type());
  }

  detectResizeRelase(event) {
    //   console.log("mouseUp")
    // console.log(draEng.resizedShape)
    let p1 = draEng.resizedShape.p1 || draEng.resizedShape.center;
    let p2 = getMousePosition(canvas, event);
    canvas.removeEventListener("mousemove", draEng.detectResizeChange);
    canvas.removeEventListener("mouseup", draEng.detectResizeRelase);

    /// update the chosen shape
    /// You can disable this shape and add a new one
    // creation
    let newShape;

    if (draEng.resizedShape.type() == "triangle")
      newShape = ShapeFactory.getTriangle(p2, draEng.resizedShape);
    else newShape = ShapeFactory.getShape(p1, p2, draEng.resizedShape.type());

    newShape.setFillColor(draEng.resizedShape.fillColor);

    let index = draEng.shapeIndex(draEng.resizedShape);
    draEng.shapes[index] = newShape;
    undoRedoManager.shapeChange(draEng.shapes[index], index);
    // removal
    draEng.clearSelectedShape();
    draEng.refresh();
  }

  //give it a mouse point, returns the shapes that return inRange() = true
  getShapesInRange(pos) {
    let arr = [];
    for (let i = 0; i < draEng.shapes.length; i++) {
      if (draEng.shapes[i].inRange(pos)) arr.push(draEng.shapes[i]);
    }
    return arr;
  }

  detectMove(event) {
    const pos = getMousePosition(canvas, event);

    let arr = draEng.getShapesInRange(pos);

    //Change pointer if pointing at shape
    if (arr.length != 0) canvas.style.cursor = "pointer";
    else canvas.style.cursor = "initial";

    //handles moving
    if (draEng.moving == true) {
      let shape = draEng.selectedShape;
      shape.rePosition(pos);

      draEng.refresh();
      return;
    }
  }

  clearSelectedShape() {
    if (draEng.selectedShape != null) {
      draEng.selectedShape.unselect();
    }
    draEng.selectedShape = null;
    draEng.moving = false;
    draEng.refresh();
  }

  detectClick(event) {
    const pos = getMousePosition(canvas, event);
    let arr = draEng.getShapesInRange(pos);

    //unselect when clicking empty space && there is a shape selected
    if (arr.length == 0 && draEng.selectedShape != null) {
      let shape = draEng.selectedShape;
      shape.unselect();
      draEng.selectedShape = null;
      draEng.refresh();
    }

    //Clicked while in moving state => place shape at pos
    if (draEng.moving == true) {
      let shape = draEng.selectedShape;
      undoRedoManager.shapeChange(shape, draEng.shapeIndex(shape));
      shape.unselect();
      draEng.selectedShape = null;
      draEng.moving = false;
      document.getElementById("state").innerHTML = "";
      draEng.refresh();
      return;
    }

    //Clicked again on a selected shape
    if (arr.length != 0) {
      if (draEng.selectedShape == arr[0]) {
        draEng.moving = true;
        document.getElementById("state").innerHTML = "Moving";
      }

      // one was already selected
      if (draEng.selectedShape != null) draEng.selectedShape.unselect();
      draEng.selectedShape = arr[0];
      arr[0].select();
    }

    draEng.refresh();
  }

  color() {
    if (draEng.selectedShape == null) return;

    let hex = document.getElementById("color").value;
    console.log(hex);

    let shape = draEng.selectedShape;
    shape.setColor(hex);
    undoRedoManager.shapeChange(shape, draEng.shapeIndex(shape));

    shape.unselect();
    draEng.selectedShape = null;
    draEng.refresh();
    return;
  }

  addShape(shape) {
    this.shapes.push(shape);
    undoRedoManager.createShape(shape);
  }

  refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var shape in this.shapes) {
      this.shapes[shape].draw();
    }
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
