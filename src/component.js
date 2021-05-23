import React from 'react'

import MicroFrontend from './MicroFrontend';

import "./style.css";

export default function App(props) {

  const [counter,setCounter] = React.useState(0);

  function handleClick(e){
    setCounter(e.detail.counter);
  }

  function setGreen(){
    setCounter(0)
  }

  return (
    <div>
      <h1 onClick={setGreen} style={{ color: props.color }}>Hello, Worldfd!</h1>
      Custom Element
      <MicroFrontend
        name='x-greeting' 
        props={{
          counter,
          color:{
            color:"green"
          },
        }}
        callbacks={{
          tapped:handleClick
        }}
       />
		  <x-greeting
        color={JSON.stringify({color:"red"})}
        counter={counter}
        ontapped={handleClick}
      />
    </div>
  );
}
