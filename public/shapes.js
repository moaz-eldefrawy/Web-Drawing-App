class Shape {
  constructor() {
    this.oldEdgeColor = new Color(0, 0, 0);
  }

  select() {
    this.oldEdgeColor = this.edgeColor;
    this.edgeColor = new Color(0, 255, 0);
  }

  unselect() {
    this.edgeColor = new Color(0, 0, 0);
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

  clone() {
    let copy = new Square(this.p1, this.width);
    copy.edgeColor = this.edgeColor;
    copy.fillColor = this.fillColor;

    return copy;
  }

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
    //to insure width is positive
    //make p1 the smaller x,y (top left)
    if (!p1.smaller(p2)) {
      [p1, p2] = [p2, p1];
    }

    let width;
    let deltaX = Math.abs(p1.x - p2.x);
    let deltaY = Math.abs(p1.y - p2.y);
    if (deltaX <= deltaY) {
      width = p2.x - p1.x;
    } else {
      width = p2.y - p1.y;
    }
    return new Square(p1, width);
  }

  type() {
    return "square";
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
    let max_x = Math.max(this.p1.x, this.p2.x);
    let min_x = Math.min(this.p1.x, this.p2.x);

    let max_y = Math.max(this.p1.y, this.p2.y);
    let min_y = Math.min(this.p1.y, this.p2.y);

    if (point.x >= min_x && point.x <= max_x) {
      //in horizontal range

      if (point.y >= min_y && point.y <= max_y) {
        return true;
      }
    }
    return false;
  }

  clone() {
    let copy = new Rectangle(this.p1, this.p2);
    copy.edgeColor = this.edgeColor;
    copy.fillColor = this.fillColor;

    return copy;
  }

  rePosition(pos) {
    let dx = this.p2.x - this.p1.x,
      dy = this.p2.y - this.p1.y;

    this.p1 = pos;
    this.p2 = new Point(this.p1.x + dx, this.p1.y + dy);
  }

  type() {
    return "rectangle";
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
    ctx.fill();
  }

  inRange(point) {
    if (distance(point, this.p1) <= this.radius) {
      return true;
    }

    return false;
  }

  clone() {
    let copy = new Circle(this.p1, this.radius);
    copy.edgeColor = this.edgeColor;
    copy.fillColor = this.fillColor;

    return copy;
  }

  rePosition(pos) {
    this.p1 = pos;
  }

  static instance(p1, p2) {
    return new Circle(p1, distance(p1, p2));
  }

  type() {
    return "circle";
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

  clone() {
    let copy = new Circle(this.p1, this.p2);
    copy.edgeColor = this.edgeColor;
    copy.fillColor = this.fillColor;

    return copy;
  }

  inRange(point) {
    let dx = (this.p2.x - this.p1.x) / 100,
      dy = (this.p2.y - this.p1.y) / 100;

    let start = new Point(this.p1.x, this.p1.y);

    while (Math.abs(start.x - this.p2.x) >= 1) {
      if (distance(start, point) < 10) return true;

      start.x += dx;
      start.y += dy;
    }

    return false;
  }

  rePosition(pos) {
    let midPoint = new Point(
      (this.p1.x + this.p2.x) / 2,
      (this.p1.y + this.p2.y) / 2
    );

    let delta = pos.subtract(midPoint);

    this.p1 = this.p1.add(delta);
    this.p2 = this.p2.add(delta);
  }

  type() {
    return "line";
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
  clone() {
    let copy = new Ellipse(
      this.center,
      this.radiusX,
      this.radiusY,
      this.rotation
    );
    copy.edgeColor = this.edgeColor;
    copy.fillColor = this.fillColor;

    return copy;
  }

  rePosition(pos) {
    this.center = pos;
  }

  static instance(p1, p2) {
    let radiusX = Math.abs(p2.x - p1.x);
    let radiusY = Math.abs(p1.y - p2.y);
    return new Ellipse(p1, radiusX, radiusY);
  }

  type() {
    return "ellipse";
  }
}

class Triangle extends Shape {
  constructor(p1, p2, p3) {
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.selectedPoint = null;
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
    ctx.fill();
  }

  clone() {
    let copy = new Triangle(this.p1, this.p2, this.p3);
    copy.edgeColor = this.edgeColor;
    copy.fillColor = this.fillColor;

    return copy;
  }

  cloneResize(newPoint) {
    let copy;
    switch (this.selectedPoint) {
      case this.p1:
        copy = new Triangle(newPoint, this.p2, this.p3);
        break;
      case this.p2:
        copy = new Triangle(this.p1, newPoint, this.p3);
        break;
      case this.p3:
        copy = new Triangle(this.p1, this.p2, newPoint);
        break;
    }

    return copy;
  }

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

  type() {
    return "triangle";
  }

  //I assume the pos lies inside the triangle
  //returns the closest point to pos
  selectPoint(pos) {
    let dist1 = distance(pos, this.p1),
      dist2 = distance(pos, this.p2),
      dist3 = distance(pos, this.p3);

    switch (Math.min(dist1, dist2, dist3)) {
      case dist1:
        return (this.selectedPoint = this.p1);
      case dist2:
        return (this.selectedPoint = this.p2);
      case dist3:
        return (this.selectedPoint = this.p3);
    }
  }
}
