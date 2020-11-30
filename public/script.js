/*
  let c = new Color(3,5,10);
  console.log(c.toString());
*/
var draEng = new DrawingEngine();
var p1, p2, currentShape, addedShape;
class ShapeFactory {
  static getShape(p1, p2, shape) {
    var addedShape;
    if (shape == "line") {
      addedShape = new Line(p1, p2);
    } else if (shape == "rectangle") {
      addedShape = new Rectangle(p1, p2);
    } else if (shape == "circle") {
      addedShape = new Circle(p1, distance(p1, p2));
    } else if (shape == "square") {
      addedShape = Square.instance(p1, p2);
    } else if (shape == "ellipse") {
      addedShape = Ellipse.instance(p1, p2);
    }
    return addedShape;
  }

  static drawDottedShape(e, p1, shape) {
    var mousecoords = getMousePosition(canvas, e);
    let p2 = new Point(mousecoords.x, mousecoords.y);
    var shape = ShapeFactory.getShape(p1, p2, shape);

    draEng.refresh();
    ctx.setLineDash([6]);
    shape.draw();
    ctx.setLineDash([0]);
  }

  static create2PointsShape(shape) {
    if(currentShape == undefined)
      currentShape = shape;
    else
      return 0;
    p1 = undefined
    canvas.style.cursor = "crosshair";
    function recieveClicks(e) {
      if (p1 == undefined) {
        p1 = getMousePosition(canvas, e);
        canvas.onmousemove = function(e) {
          ShapeFactory.drawDottedShape(e, p1, shape);
        };
      } else {
        p2 = getMousePosition(canvas, e);

        canvas.style.cursor = "initial";
        canvas.removeEventListener("click", recieveClicks);
        canvas.onmousemove = undefined;

        addedShape = ShapeFactory.getShape(p1, p2, shape);
        addedShape.addToCanvas();
        addedShape.draw();
        currentShape = undefined
      } // end else
    } // end create2PointsShape()

    canvas.addEventListener("click", recieveClicks);
  }
  static create3PoitnsShape(shape) {
    if(currentShape == undefined)
      currentShape = shape;

    else
      return 0;
    /// creates a traingle without checking
    p1=undefined
    var p2, p3;
    canvas.style.cursor = "crosshair";

    function recieveClicks(e) {
      if (p1 == undefined) p1 = getMousePosition(canvas, e);
      else if (p2 == undefined) p2 = getMousePosition(canvas, e);
      else {
        p3 = getMousePosition(canvas, e);
        canvas.style.cursor = "initial";
        canvas.removeEventListener("click", recieveClicks);
        let triangle = new Triangle(p1, p2, p3);
        triangle.addToCanvas();
        triangle.draw();

        currentShape = undefined
      }
    }

    canvas.addEventListener("click", recieveClicks);
  } // end create3PointsShape()
}

window.onload = function() {
  var lineBtn = document.getElementById("line");
  var triangleBtn = document.getElementById("triangle");
  var squareBtn = document.getElementById("square");
  var rectangleBtn = document.getElementById("rectangle");
  var ellipseBtn = document.getElementById("ellipse");
  var circleBtn = document.getElementById("circle");
  var undoBtn = document.getElementById("undo");
  var redoBtn = document.getElementById("redo");

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return new Point(x, y);
  }


  this.lineClick= function() {
    ShapeFactory.create2PointsShape("line");
  }
  this.rectangleClick= function() {
    ShapeFactory.create2PointsShape("rectangle");
  }
  this.circleClick= function() {
    ShapeFactory.create2PointsShape("circle");
  }
  this.squareClick= function() {
    ShapeFactory.create2PointsShape("square");
  }
  this.triangleClick= function() {
    ShapeFactory.create3PoitnsShape("triangle");
  }
  this.ellipseClick= function() {
    ShapeFactory.create2PointsShape("ellipse");
  }

  this.deleteShape= function(){

    console.log(draEng.selectedShape)
    let shape = draEng.selectedShape;
    draEng.clearSelectedShape()
    draEng.deleteShape(shape)
  }
}