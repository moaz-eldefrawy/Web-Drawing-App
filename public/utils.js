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

  smaller(point) {
    if (this.y < point.y) return true;

    if (this.x < point.x) return true;

    return false;
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
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);

      // 6 digits
    } else if (h.length == 7) {
      r = parseInt(h[1] + h[2], 16);
      g = parseInt(h[3] + h[4], 16);
      b = parseInt(h[5] + h[6], 16);
    }

    return new Color(r, g, b);
  }
}
