<template>
  <div></div>

  <ColorPicker />
  <!--
  <h3> Menu </h3>
  <div id="menu">
    <button id="line"></button>
    <button id="triangle"></button>
    <button id="square"></button>
    <button id="rectangle"></button>
    <button id="ellipse"></button>
    <button id="circle"></button>
    <button id="save"></button>
    <button id="undo"></button>
    <button id="redo"></button>  
  </div> 
  
  <div id="board">
  </div>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <Main />

  -->
</template>

<script>
/*import HelloWorld from './components/HelloWorld.vue'
import Main from './components/Main.vue'*/
import { ColorPicker } from "vue-accessible-color-picker";

export default {
  name: "App",
  components: {
    ColorPicker,
    /*HelloWorld,
    Main*/
  },
};
</script>

<style>
/* MENU */

button:hover {
  cursor: pointer;
}

button > div{
  width:100%;
  height: 100%;
 
  border: none;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */

}

#line > div {
  background-image: url("./assets/line.png");
}

#triangle > div{
  background-image: url("./assets/triangle.png");
}

#square > div {
  background-image: url("./assets/square.png");
}
#rectangle > div {
  background-image: url("./assets/rectangle.png");
}
#ellipse > div {
  background-image: url("./assets/ellipse.png");
}
#circle > div {
  background-image: url("./assets/circle.png");
}

#undo > div {
  background-image: url("./assets/undo.png");
}
#redo > div {
  background-image: url("./assets/redo.png");
}

#save > div {
  background-image: url("./assets/save.png");
}

#delete > div {
  background-image: url("./assets/delete.png");    
}

#colorBtn > div{
  background-image: url("./assets/colorBtn.png");      
}

#copy > div{
  background-image: url("./assets/copy.png");      
}

/* END MENU */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
