class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  subtract(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}

/*GLOBAL INSTANCE */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return new Point(x, y);
}

function distance(p1, p2) {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  );
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  setR(r) {
    this.r = r;
  }
  setG(g) {
    this.g = g;
  }
  setB(b) {
    this.b = b;
  }
  toString() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }

  static newColorHexa(h) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];

      // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return new Color(r, g, b);
  }
}
