class DrawingEngine {
  constructor() {
    this.shapes = [];
    this.actionStack = [];
    this.coloring = false;
    this.selectedShape = null;
    this.moving = false;

    /*** Know Which Shape the User clicked  ***/
    canvas.addEventListener("click", this.detectClick);
    canvas.addEventListener("mousemove", this.detectMove)
    
    // for resizing
    canvas.addEventListener("mousedown", this.detectResizeStart);
   
  }

  deleteShape(shape){
    let arr=[];
    for (let i = 0; i < draEng.shapes.length; i++) {
      if (draEng.shapes[i] != shape) arr.push(draEng.shapes[i]);
    }
    this.shapes = arr;
    draEng.refresh()
  }

  shapeToResize() {
    const pos = getMousePosition(canvas, event);
    let arr = draEng.getShapesInRange(pos);
    draEng.resizedShape = arr[0];
    console.log("db->",draEng.resizedShape)

    draEng.clearSelectedShape();
  }

  detectResizeStart(event) {
    const pos = getMousePosition(canvas, event);
    let arr = draEng.getShapesInRange(pos);
    // shape to resize
    draEng.resizedShape = arr[0];
    console.log(event.button)
    if(draEng.resizedShape === draEng.selectedShape &&
      event.button == 2)
    { 
      canvas.addEventListener("mousemove", draEng.detectResizeChange )
      canvas.addEventListener("mouseup", draEng.detectResizeRelase)  
    }
  }

  

  
  detectResizeChange(event){
    let p1 = draEng.resizedShape.p1 || draEng.resizedShape.center;
    let p2 = getMousePosition(canvas, event)
    console.log(p1,p2)
    ShapeFactory.drawDottedShape(event,p1,draEng.resizedShape.type())
  }

  detectResizeRelase(event){
    console.log("mouseUp")
    console.log(draEng.resizedShape)
    let p1 = draEng.resizedShape.p1 || draEng.resizedShape.center;
    let p2 = getMousePosition(canvas, event);
    canvas.removeEventListener("mousemove", draEng.detectResizeChange )
    canvas.removeEventListener("mouseup", draEng.detectResizeRelase )  
  
    /// update the chosen shape
    /// You can disable this shape and add a new one

    let newShape = ShapeFactory.getShape(p1, p2, draEng.resizedShape.type());
    draEng.deleteShape(draEng.resizedShape)
    draEng.clearSelectedShape();
    draEng.addShape( newShape );
    draEng.refresh()
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

  clearSelectedShape() {
    if(draEng.selectedShape != null && draEng.selectedShape != undefined){
      draEng.selectedShape.unselect();
      draEng.selectedShape = null;
      draEng.refresh();
    }
  }

  detectClick(event) {
    const pos = getMousePosition(canvas, event);
    let arr = draEng.getShapesInRange(pos);

    //handles coloring
    if (draEng.coloring == true) {
      let hex = document.getElementById("color").value;
      console.log(hex);

      // color all seleced shapes
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

      // one was already selected 
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
