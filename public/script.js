var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


/* UTLS */

function distance(p1,p2){
    return Math.sqrt( (p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y)  );
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}

/*
  let c = new Color(3,5,10);
  console.log(c.toString());
*/
class Color {

  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  setR(r) {
    this.r = r
  }
  setG(g) {
    this.g = g
  }
  setG(b) {
    this.b = b;
  }
  toString() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")"
  }
}

class DrawingEngine {
  constructor() {
    this.shapes = [];

    /*** Know Which Shape the User clicked  ***/
    canvas.addEventListener("click", this.detectClick)
  }

  detectClick() {

  }

  addShape(shape) {
    this.shapes.push(shape);
  }

  refresh() {
    for (var shape in this.shapes) {
      this.shapes[shape].draw();
    }
  }


}
/*GLOBAL INSTANCE */
var draEng = new DrawingEngine();

class Square {

  constructor(p1, width) {
    this.p1 = p1;
    this.width = width;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    console.log(this.fillColor);
    console.log(this.edgeColor);
    ctx.fillRect(this.p1.x, this.p1.y, this.width, this.width);
    ctx.strokeRect(this.p1.x, this.p1.y, this.width, this.width);
  }

  addToCanvas() {
    draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  resize() {

  }

  rePosition() {

  }
}

class Rectangle {

  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.fillRect(this.p1.x, this.p1.y, this.p2.x - this.p1.x, this.p2.y - this.p1.y);
    ctx.strokeRect(this.p1.x, this.p1.y, this.p2.x - this.p1.x, this.p2.y - this.p1.y);
  }

  addToCanvas() {
    draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  resize() {

  }

  rePosition() {

  }
}


class Circle {

  constructor(p1, radius) {
    this.p1 = p1;
    this.radius = radius;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.arc(this.p1.x, this.p1.y, this.radius, 0, Math.PI * 2, 0);
    ctx.stroke();
  }

  addToCanvas() {
    draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  resize() {

  }

  rePosition() {

  }
}


class Line {

  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }

  addToCanvas() {
    draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  resize() {

  }

  rePosition() {

  }
}

class Ellipse {
  // rotation isn't required for construction
  constructor(center, radiusX, radiusY, rotation ) {
    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.rotation = rotation || 0;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.ellipse(this.center.x, this.center.y, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
    ctx.stroke();
  }

  addToCanvas() {
    draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  resize() {

  }

  rePosition() {

  }
}

var e = new Ellipse(new Point(300,300), 100,150);
e.draw()

class Triangle {

  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.closePath();
    ctx.stroke();

  }

  addToCanvas() {
      draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color
  }

  setFillColor(color) {
    this.fillColor = color;
  }

  resize() {

  }

  rePosition() {

  }
}



/* DEMO */
var sq1 = new Square(new Point(50, 50), 50);
var sq2 = new Square(new Point(70, 70), 50);
sq1.setFillColor(new Color(255, 0, 0));
sq1.setEdgeColor(new Color(255, 0, 0));
sq1.addToCanvas();
sq2.addToCanvas();
draEng.refresh();


/** TODO: Conver those functions to classes **/
function drawRectangle(p1, width, length) {
  ctx.beginPath();
  ctx.strokeRect(p1.x, p1.y, width, length);
}

function drawTriangle(p1, p2, p3) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.closePath();
  ctx.stroke();
  //  ctx.fill();
}

function drawCircle(center, radius) {
  ctx.beginPath();
  ctx.arc(100, 100, 50, 0, Math.PI * 2, 0);
  ctx.stroke();
}

function drawLine(p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
/* TODO: ELLIPSE DRAWING */

//drawLine(new Point(50,50), new Point(50,350))








var lineBtn = document.getElementById("line")
var triangleBtn = document.getElementById("triangle")
var squareBtn = document.getElementById("square")
var rectangleBtn = document.getElementById("rectangle")
var ellipseBtn = document.getElementById("ellipse")
var circleBtn = document.getElementById("circle")
var undoBtn = document.getElementById("undo")
var redoBtn = document.getElementById("redo")

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return new Point(x, y);
}

function lineClick() {
  var p1, p2;
  canvas.style.cursor = "crosshair";

  function recieveClicks(e) {

    if (p1 == undefined)
      p1 = getMousePosition(canvas, e);
    else {
      p2 = getMousePosition(canvas, e);
      canvas.style.cursor = "initial";
      canvas.removeEventListener("click", recieveClicks);

      let line = new Line(p1, p2);
      line.addToCanvas();
      line.draw();

      p1 = undefined
      p2 = undefined
    }

  }

  canvas.addEventListener("click", recieveClicks)
}


function rectangleClick() {
  var p1, p2;
  secondClick = false;
  canvas.style.cursor = "crosshair";

  function recieveClicks(e) {

    if (p1 == undefined)
      p1 = getMousePosition(canvas, e);
    else {
      p2 = getMousePosition(canvas, e);
      canvas.style.cursor = "initial";
      canvas.removeEventListener("click", recieveClicks);

      let rec = new Rectangle(p1, p2);
      rec.addToCanvas();
      rec.draw();

      p1 = undefined
      p2 = undefined
    }

  }

  canvas.addEventListener("click", recieveClicks)

}


var c = new Circle(new Point(100,100), 100);
c.draw();

function circleClick() {
  var p1, p2;
  secondClick = false;
  canvas.style.cursor = "crosshair";

  function recieveClicks(e) {

    if (p1 == undefined)
      p1 = getMousePosition(canvas, e);
    else {
      p2 = getMousePosition(canvas, e);
      canvas.style.cursor = "initial";
      canvas.removeEventListener("click", recieveClicks);

      let circle = new Circle(p1, distance(p1,p2));
      circle.addToCanvas();
      circle.draw();

      p1 = undefined
      p2 = undefined
    }

  }

  canvas.addEventListener("click", recieveClicks)

}


function squareClick(){
  var p1, p2;
  secondClick = false;
  canvas.style.cursor = "crosshair";

  function recieveClicks(e) {

    if (p1 == undefined)
      p1 = getMousePosition(canvas, e);
    else {
      p2 = getMousePosition(canvas, e);
      canvas.style.cursor = "initial";
      canvas.removeEventListener("click", recieveClicks);
      let width = Math.min( Math.abs(p1.x-p2.x), Math.abs(p1.y-p2.y) )
      let square = new Square(p1, width );
      square.addToCanvas();
      square.draw();

      p1 = undefined
      p2 = undefined
    }

  }

  canvas.addEventListener("click", recieveClicks)
}

function triangleClick(){
  var p1, p2,p3;
  secondClick = false;
  canvas.style.cursor = "crosshair";

  function recieveClicks(e) {

    if (p1 == undefined)
      p1 = getMousePosition(canvas, e);
    else if(p2 == undefined)
      p2 = getMousePosition(canvas, e);
    else {
      p3 = getMousePosition(canvas, e);
      canvas.style.cursor = "initial";
      canvas.removeEventListener("click", recieveClicks);
      let square = new Triangle(p1, p2, p3 );
      square.addToCanvas();
      square.draw();

      p1 = undefined
      p2 = undefined
    }

  }

  canvas.addEventListener("click", recieveClicks)
}


function ellipseClick(){
  var p1, p2,p3;
  secondClick = false;
  canvas.style.cursor = "crosshair";

  function recieveClicks(e) {

    if (p1 == undefined)
      p1 = getMousePosition(canvas, e);
    else {
      p2 = getMousePosition(canvas, e);
      canvas.style.cursor = "initial";
      canvas.removeEventListener("click", recieveClicks);
      let square = new Ellipse(p1, Math.abs(p2.x-p1.x),
      Math.abs(p1.y-p2.y) );
      square.addToCanvas();
      square.draw();

      p1 = undefined
      p2 = undefined
    }

  }

  canvas.addEventListener("click", recieveClicks)

}
