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
    console.log(this.actionStack);
  }

  createShape(newShape) {
    console.log({
      newShape: newShape,
    });
    this.actionStack.push({
      type: "create",
      index: this.shapes.length,
      oldShape: null,
      newShape: newShape.clone(),
    });

    this.shapes.push(newShape.clone());

    //action happened, clear redo stack
    this.redoStack = [];
    console.log(this.actionStack);
  }

  deleteShape(i) {
    this.actionStack.push({
      type: "delete",
      index: i,
      oldShape: this.shapes[i].clone(),
      newShape: null,
    });

    //delete index i from shapes
    this.shapes = this.deleteIndex(this.shapes, i);

    //action happened, clear redo stack
    this.redoStack = [];
    console.log(this.actionStack);
  }

  //it accesses the draEng and updates its shapes
  //take from action stack and put into redo stack
  undo() {
    if (this.actionStack.length == 0) return;

    let change = this.lastItem(this.actionStack);
    this.redoStack.push(change);
    console.log({
      redoStack: this.redoStack,
    });

    //delete last item in actionStack
    this.actionStack = this.deleteIndex(
      this.actionStack,
      this.actionStack.length - 1
    );

    console.log("undo");
    console.log(change);
    console.log(this.actionStack);
    console.log("shapes : ");
    console.log(this.shapes);

    //reverse effect of change
    if (change.type == "change") {
      //put the old shape in the index
      this.shapes[change.index] = change.oldShape.clone();
    }

    //reverse effect of create
    else if (change.type == "create") {
      //delete the shape
      console.log("index = ");
      console.log(change.index);
      console.log(this.shapes);
      this.shapes = this.deleteIndex(this.shapes, change.index);
      console.log("shapes after splice : ");
      console.log(this.shapes);
    }

    //reverse effect of delete
    else if (change.type == "delete") {
      //add the shape
      this.shapes.push(change.oldShape.clone());
    }

    //return a copy of shapes
    var arr = [];
    for (let i = 0; i < this.shapes.length; i++)
      arr.push(this.shapes[i].clone());

    draEng.shapes = arr;
    console.log(draEng.shapes);
    draEng.refresh();
  }

  //take action from redo stack and put into action stack
  redo() {
    if (this.redoStack.length == 0) return;
    let change = this.lastItem(this.redoStack);

    console.log({
      beforeDelete: this.redoStack,
      index: this.redoStack.length - 1,
    });
    //delete last item from redoStack
    this.redoStack = this.deleteIndex(
      this.redoStack,
      this.redoStack.length - 1
    );

    console.log({
      afterDelete: this.redoStack,
    });
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
      this.shapes.push(change.newShape.clone());
    }

    //delete
    else if (change.type == "delete") {
      //delete shape
      this.shapes = this.deleteIndex(this.shapes, change.index);
    }

    //return a copy of shapes
    var arr = [];
    for (let i = 0; i < this.shapes.length; i++)
      arr.push(this.shapes[i].clone());

    draEng.shapes = arr;
    console.log(draEng.shapes);
    draEng.refresh();
  }

  lastItem(arr) {
    if (arr.length != 0) return arr[arr.length - 1];
  }

  //return the arr without the element at index "index"
  deleteIndex(arr, index) {
    var ret = [];
    for (let i = 0; i < arr.length; i++) {
      console.log("i = ");
      console.log(i);
      if (i != index) {
        ret.push(arr[i]);
        console.log("bad");
      }
    }

    return ret;
  }
}
