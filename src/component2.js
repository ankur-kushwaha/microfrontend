import { h } from 'preact';
import {MicroFrontendModule} from '../dist/index';
import styles from "./style.css";

function App(props){

  const handleClick = ()=>{
    props.tapped({
      counter:Number(props.counter)+1
    });
  }
  return (  
    <div>
      <h1 onClick={handleClick} style={{ color: this.props.color?.color }}>Hello, World {this.props.counter}! </h1>
    </div>
  )
  
}

MicroFrontendModule('x-greeting',{
  props:['color','counter'],
  callbacks:['tapped'],
  styles
})(App)

export default App;
