//const { transformVNodeArgs } = require("vue");

/*
  let c = new Color(3,5,10);
  console.log(c.toString());
*/
var draEng = new DrawingEngine();
var undoRedoManager = new UndoRedoManager();

window.onload = function() {
  document.addEventListener('keydown', function (event) {
   
    if (event.key === 'z') {
      undoRedoManager.undo()
    }
    
    if (event.key === 'y') {
      undoRedoManager.redo()
    }

    if (event.key === 'c') {
      draEng.color()
    }
    
    if (event.key === 'd') {
      deleteShape();
    }
  });
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

  this.lineClick = function() {
    ShapeFactory.create2PointsShape("line");
  };
  this.rectangleClick = function() {
    ShapeFactory.create2PointsShape("rectangle");
  };
  this.circleClick = function() {
    ShapeFactory.create2PointsShape("circle");
  };
  this.squareClick = function() {
    ShapeFactory.create2PointsShape("square");
  };
  this.triangleClick = function() {
    ShapeFactory.create3PoitnsShape("triangle");
  };
  this.ellipseClick = function() {
    ShapeFactory.create2PointsShape("ellipse");
  };

  this.deleteShape = function() {
    if (draEng.selectedShape == null) return;

    console.log(draEng.selectedShape);
    let shape = draEng.selectedShape;
    draEng.clearSelectedShape();
    draEng.deleteShape(shape);
  };

  this.copyShape = function() {
    if (draEng.selectedShape == null) return;
    draEng.copySelectedShape();
  };
};
