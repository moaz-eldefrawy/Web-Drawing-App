class DrawingEngine {
  constructor() {
    this.shapes = [];
    this.actionStack = [];
    this.coloring = false;
    this.selectedShape = null;
    this.moving = false;

    /*** Know Which Shape the User clicked  ***/
    canvas.addEventListener("click", this.detectClick);
    canvas.addEventListener("mousemove", this.detectMove);
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

    if (arr.length != 0) canvas.style.cursor = "pointer";
    else canvas.style.cursor = "initial";
  }

  detectClick(event) {
    const pos = getMousePosition(canvas, event);
    let arr = draEng.getShapesInRange(pos);

    //handles coloring
    if (draEng.coloring == true) {
      let hex = document.getElementById("color").value;
      console.log(hex);

      for (let i = 0; i < arr.length; i++) arr[i].setColor(hex);

      draEng.refresh();
      draEng.coloring = false;

      return;
    }

    //handles moving
    if (draEng.moving == true) {
      let shape = draEng.selectedShape;

      shape.rePosition(pos);
      draEng.moving = false;
      document.getElementById("state").innerHTML = "";
      draEng.selectedShape.unselect();
      draEng.selectedShape = null;
      draEng.refresh();

      return;
    }

    //Clicked again on a selected shape
    if (arr.length != 0) {
      if (draEng.selectedShape == arr[0]) {
        draEng.moving = true;
        document.getElementById("state").innerHTML = "Moving";
      }

      if (draEng.selectedShape != null) draEng.selectedShape.unselect();
      draEng.selectedShape = arr[0];
      arr[0].select();
    }

    draEng.refresh();
  }

  addShape(shape) {
    this.shapes.push(shape);
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
