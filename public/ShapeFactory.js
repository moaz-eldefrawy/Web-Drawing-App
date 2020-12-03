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

  static getTriangle(newPoint, triangle) {
    let newTriangle = triangle.cloneResize(newPoint);
    return newTriangle;
  }

  static drawDottedShape(e, p1, shapeType) {
    var mousecoords = getMousePosition(canvas, e);
    let p2 = new Point(mousecoords.x, mousecoords.y);

    var shape = ShapeFactory.getShape(p1, p2, shapeType);

    draEng.refresh();
    ctx.setLineDash([6]);
    shape.draw();
    ctx.setLineDash([0]);
  }

  //I would have to change too many functions' parameters to make it compatible with triangles
  static drawDottedTriangle(e, triangle) {
    var mousecoords = getMousePosition(canvas, e);

    let newTriangle = triangle.cloneResize(mousecoords);

    draEng.refresh();
    ctx.setLineDash([6]);
    newTriangle.draw();
    ctx.setLineDash([0]);
  }

  static create2PointsShape(shape) {
    if (currentShape == undefined) currentShape = shape;
    else return 0;
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
        currentShape = undefined;
      } // end else
    } // end create2PointsShape()

    canvas.addEventListener("click", recieveClicks);
  }
  static create3PoitnsShape(shape) {
    if (currentShape == undefined) currentShape = shape;
    else return 0;
    /// creates a traingle without checking
    p1 = undefined;
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

        currentShape = undefined;
      }
    }

    canvas.addEventListener("click", recieveClicks);
  } // end create3PointsShape()
}
