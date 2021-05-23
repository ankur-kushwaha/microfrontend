// import { Component } from 'react'
import Module from './Module';
import { h } from 'preact';
import styles from "./style.css";
// import ShadowDOM from "preact-shadow-dom";



function App(props){

  const handleClick = ()=>{
    props.onClick2({
      counter:Number(props.counter)+1
    });
  }
  
  return (  
    <div>
      <h1 onClick={handleClick} style={{ color: this.props.color?.color }}>Hello, World {this.props.counter}! </h1>
    </div>
  )
  
}

Module('x-greeting',{
  props:['color','counter'],
  callbacks:['onClick2'],
  styles
})(App)

export default App;
