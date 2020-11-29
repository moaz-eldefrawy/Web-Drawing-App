/*
  let c = new Color(3,5,10);
  console.log(c.toString());
*/

var draEng = new DrawingEngine();

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

var p1, p2, addedShape;
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
    p1 = undefined;
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
      } // end else
    } // end create2PointsShape()

    canvas.addEventListener("click", recieveClicks);
  }
  static create3PoitnsShape(shape) {
    /// creates a traingle without checking
    var p1, p2, p3;
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

        p1 = undefined;
        p2 = undefined;
      }
    }

    canvas.addEventListener("click", recieveClicks);
  } // end create3PointsShape()
}

function lineClick() {
  ShapeFactory.create2PointsShape("line");
}
function rectangleClick() {
  ShapeFactory.create2PointsShape("rectangle");
}
function circleClick() {
  ShapeFactory.create2PointsShape("circle");
}
function squareClick() {
  ShapeFactory.create2PointsShape("square");
}
function triangleClick() {
  ShapeFactory.create3PoitnsShape("triangle");
}

function ellipseClick() {
  ShapeFactory.create2PointsShape("ellipse");
}
