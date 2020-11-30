class Shape {
  constructor() {
    this.oldEdgeColor = null;
  }

  select() {
    this.oldEdgeColor = this.edgeColor;
    this.edgeColor = new Color(0, 255, 0);
  }

  unselect() {
    this.edgeColor = this.oldEdgeColor;
  }

  addToCanvas() {
    draEng.addShape(this);
  }
  setEdgeColor(color) {
    this.edgeColor = color;
  }

  setFillColor(color) {
      this.fillColor = color;
    }

  setColor(color) {
    this.setFillColor(color);
    this.setEdgeColor(color);
  }
}

class Square extends Shape {
  // p1 -> top left piont
  constructor(p1, width) {
    super();
    this.p1 = p1;
    this.width = width;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.fillRect(this.p1.x, this.p1.y, this.width, this.width);
    ctx.strokeRect(this.p1.x, this.p1.y, this.width, this.width);
  }

  resize() {}

  rePosition(pos) {
    this.p1 = pos;
  }

  inRange(point) {
    if (point.x >= this.p1.x && point.x <= this.p1.x + this.width) {
      //in horizontal range

      if (point.y >= this.p1.y && point.y <= this.p1.y + this.width) {
        return true;
      }
    }

    return false;
  }

  static instance(p1, p2) {
    let width;
    let deltaX = Math.abs(p1.x - p2.x);
    let deltaY = Math.abs(p1.y - p2.y);
    if(deltaX <= deltaY){
      width = p2.x - p1.x; 
    } else {
      width = p2.y - p1.y;
    }
    return new Square(p1, width);
  }

   type(){
    return "square"
  }
}

class Rectangle extends Shape {
  // p1 -> top left point
  // p2 -> down right point
  constructor(p1, p2) {
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.edgeColor = new Color(0, 0, 0);
    this.fillColor = new Color(255, 255, 255);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.edgeColor;
    ctx.fillRect(
      this.p1.x,
      this.p1.y,
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y
    );
    ctx.strokeRect(
      this.p1.x,
      this.p1.y,
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y
    );
  }

  inRange(point) {
    if (point.x >= this.p1.x && point.x <= this.p2.x) {
      //in horizontal range

      if (point.y >= this.p1.y && point.y <= this.p2.y) {
        return true;
      }
    }

    return false;
  }

  resize() {}

  rePosition(pos) {
    let dx = this.p2.x - this.p1.x,
      dy = this.p2.y - this.p1.y;

    this.p1 = pos;
    this.p2 = new Point(this.p1.x + dx, this.p1.y + dy);
  }

  
  type(){
    return "point"
  }
}

class Circle extends Shape {
  // p1 -> radius
  constructor(p1, radius) {
    super();
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
    ctx.fill()
  }

  inRange(point) {
    if (distance(point, this.p1) <= this.radius) {
      return true;
    }

    return false;
  }

  resize() {}

  rePosition(pos) {
    this.p1 = pos;
  }

  static instance(p1, p2) {
    return new Circle(p1, distance(p1, p2));
  }

  
   type(){
    return "circle"
  }
}

class Line extends Shape {
  /// p1 -> first point
  /// p2 -> second point
  constructor(p1, p2) {
    super();
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
    ctx.fill();
  }

  resize() {}

  inRange(point) {
    let dx = (this.p2.x - this.p1.x) / 100,
      dy = (this.p2.y - this.p1.y) / 100;

    let start = new Point(this.p1.x, this.p1.y);

    while (start.x <= this.p2.x) {
      if (distance(start, point) < 10) return true;
      start.x += dx;
      start.y += dy;
    }

    return false;
  }

  rePosition(pos) {
    let d = this.p2.subtract(this.p1);

    this.p1 = pos;
    this.p2 = this.p1.add(d);
  }

  
   type(){
    return "line"
  }
}

class Ellipse extends Shape {
  // rotation isn't required for construction

  constructor(center, radiusX, radiusY, rotation) {
    super();
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
    ctx.ellipse(
      this.center.x,
      this.center.y,
      this.radiusX,
      this.radiusY,
      this.rotation,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  }

  inRange(point) {
    if (
      Math.pow(this.center.x - point.x, 2) / Math.pow(this.radiusX, 2) +
        Math.pow(this.center.y - point.y, 2) / Math.pow(this.radiusY, 2) <=
      1
    )
      return true;
    return false;
  }
  resize() {}

  rePosition(pos) {
    this.center = pos;
  }

  static instance(p1, p2) {
    let radiusX = Math.abs(p2.x - p1.x);
    let radiusY = Math.abs(p1.y - p2.y);
    return new Ellipse(p1, radiusX, radiusY);
  }

   type(){
    return "ellipse"
  }
}

/*
var e = new Ellipse(new Point(300, 300), 100, 150);
e.draw();*/

class Triangle extends Shape {
  constructor(p1, p2, p3) {
    super();
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
    ctx.fill()
  }

  resize() {}

  inRange(p) {
    let p1 = this.p1,
      p2 = this.p2,
      p3 = this.p3;

    var s =
      p3.y * p2.x - p3.x * p2.y + (p2.y - p3.y) * p.x + (p3.x - p2.x) * p.y;
    var t =
      p3.x * p1.y - p3.y * p1.x + (p3.y - p1.y) * p.x + (p1.x - p3.x) * p.y;

    if (s < 0 != t < 0) return false;

    var A =
      -p1.y * p2.x + p3.y * (p2.x - p1.x) + p3.x * (p1.y - p2.y) + p1.x * p2.y;

    return A < 0 ? s <= 0 && s + t >= A : s >= 0 && s + t <= A;
  }

  rePosition(pos) {
    let d2 = this.p2.subtract(this.p1),
      d3 = this.p3.subtract(this.p1);

    this.p1 = pos;
    this.p2 = this.p1.add(d2);
    this.p3 = this.p1.add(d3);
  }

  type(){
    return "triangle"
  }
}
