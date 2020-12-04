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
    console.log(draEng.shapes);
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

  this.processShapes = function(jsonArray) {
    let shapes = [];
    console.log('MY JSON ARRAY');
    console.log(jsonArray);
    let n = jsonArray.length;
    for(let i = 0; i < n;i++) {
      console.log(i);
      let currentShape = jsonArray[i];
      let type = currentShape.type;
      let newShape;
      console.log(currentShape);
      if(type == 'circle')
        newShape = new Circle(Point.JSONtoPoint(currentShape.p1), currentShape.radius);
      else if(type == 'ellipse')
        newShape = new Ellipse(Point.JSONtoPoint(currentShape.center), currentShape.radiusX, currentShape.radiusY);
      else if(type == 'line')
        newShape = new Line(Point.JSONtoPoint(currentShape.p1), Point.JSONtoPoint(currentShape.p2));
      else if(type == 'square')
        newShape = new Square(Point.JSONtoPoint(currentShape.p1), currentShape.width, currentShape.height);
      else if(type == 'rectangle')
        newShape = new Rectangle(Point.JSONtoPoint(currentShape.p1), Point.JSONtoPoint(currentShape.p2));
      else if(type == 'triangle')
        newShape = new Triangle(Point.JSONtoPoint(currentShape.p1), Point.JSONtoPoint(currentShape.p2), Point.JSONtoPoint(currentShape.p3));

      newShape.fillColor = new Color(currentShape.fillColor.r, currentShape.fillColor.g, currentShape.fillColor.b);
      newShape.edgeColor = new Color(currentShape.edgeColor.r, currentShape.edgeColor.g, currentShape.edgeColor.b);
      shapes.push(newShape);
    }
    console.log('Shapes after processing');
    console.log(shapes);
    draEng.shapes = shapes;
    draEng.refresh();
  }

  this.loadJSON = function() {
    let file = document.getElementById("fileInput").files[0];
    let formData = new FormData();
    
    formData.append("file", file);

    fetch('http://localhost:3000/uploadJsonFile', {
      method: "post",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log('inside JSON');
      console.log(data);
      this.processShapes(data);
    });
  }

  this.loadXML = function() {
    let file = document.getElementById("fileInput").files[0];
    let formData = new FormData();
    
    formData.append("file", file);

    fetch('http://localhost:3000/uploadXMLFile', {
      method: "post",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      shapes = this.processShapes(data);
      console.log(shapes);
    });
  }

  this.saveJSON = function() {
    let shapes = JSON.stringify(draEng.shapes);

    console.log('INSIDE SAVE FUNCTION');
    console.log(shapes);
    fetch('http://localhost:3000/createJsonFile', {
      method: "post",
      body: shapes,
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    }
    })
    .then(res => res.json())
    .then(body => {
      window.open('http://localhost:3000/getJsonFile/'+body.filename)
    })
  }

  this.saveXML = function() {
    let shapes = JSON.stringify(draEng.shapes);

    console.log('INSIDE SAVE FUNCTION');
    console.log(shapes);
    fetch('http://localhost:3000/createXMLFile', {
      method: "post",
      body: shapes,
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    }
    })
    .then(res => res.json())
    .then(body => {
      window.open('http://localhost:3000/getXMLFile/'+body.filename)
    })
  }


};
