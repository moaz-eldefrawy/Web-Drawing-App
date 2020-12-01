class UndoRedoManager {
  constructor() {
    this.shapes = [];
    this.actionStack = [];
    this.redoStack = [];
  }

  //the shape and its index
  shapeChange(newShape, i) {
    this.actionStack.push({
      type: "change",
      index: i,
      oldShape: this.shapes[i].clone(),
      newShape: newShape.clone(),
    });

    this.shapes[i] = newShape.clone();

    //action happened, clear redo stack
    this.redoStack = [];
  }

  createShape(newShape) {
    this.actionStack.push({
      type: "create",
      index: this.shapes.length,
      oldShape: null,
      newShape: newShape.clone(),
    });

    this.shapes.push(newShape.clone());

    //action happened, clear redo stack
    this.redoStack = [];
  }

  deleteShape(i) {
    this.actionStack.push({
      type: "delete",
      index: i,
      oldShape: this.shapes[i].clone(),
      newShape: null,
    });

    this.shapes.splice(i, 1);

    //action happened, clear redo stack
    this.redoStack = [];
  }


  //it accesses the draEng and updates its shapes
  //take from action stack and put into redo stack
  undo() {
    if (this.actionStack.length == 0) return;

    let change = this.lastItem(this.actionStack);
    this.actionStack.splice(this.actionStack.length - 1, 1);
    this.redoStack.push(change);

    //reverse effect of change
    if (change.type == "change") {
      //put the old shape in the index
      this.shapes[change.index] = change.oldShape.clone();
    }

    //reverse effect of create
    else if (change.type == "create") {
      //delete the shape
      this.shapes.splice(change.index, 1);
    }

    //reverse effect of delete
    else if (change.type == "delete") {
      //add the shape to the index it was deleted from
      this.shapes.splice(change.index, 0, change.oldShape.clone());
    }

    //return a copy of shapes
    draEng.shapes = this.shapes.map((x) => x.clone());
    draEng.refresh();
  }

  //take action from redo stack and put into action stack
  redo() {
    if (this.redoStack.length == 0) return;
    let change = this.lastItem(this.redoStack);
    this.redoStack.splice(this.redoStack.length - 1, 1);
    this.actionStack.push(change);

    //apply change to shapes
    //apply change (old -> newShape)
    if (change.type == "change") {
      //put the old shape in the index
      this.shapes[change.index] = change.newShape.clone();
    }

    //create
    else if (change.type == "create") {
      //insert the shape
      this.shapes.splice(change.index, 0, change.newShape.clone());
    }

    //delete
    else if (change.type == "delete") {
      //delete shape
      this.shapes.splice(change.index, 1);
    }

    //return a copy of shapes
    draEng.shapes = this.shapes.map((x) => x.clone());
    draEng.refresh();
  }

  lastItem(arr) {
    if (arr.length != 0) return arr[arr.length - 1];
  }
}
