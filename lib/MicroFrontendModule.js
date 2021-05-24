import React from 'react';
import ReactDOM from 'react-dom';

function MicroFrontendModule(name, options) {
  let callbacks = options.callbacks||[];
  
  return function (Component) {

    function ComponentWrapper(props) {

      let ref = React.useRef(null);

      let newProps = {}
      for (let key in props) {
        try {
          newProps[key] = JSON.parse(props[key]);
        } catch (e) {
          newProps[key] = props[key]
        }
      }
      for (let callback of callbacks) {
        newProps[callback] = function (data) {
          ref.current.dispatchEvent(new CustomEvent(callback, {
            bubbles: true,
            detail: data,
            composed: true
          }));
          if(callback.startsWith('on')){
            ref.current.dispatchEvent(new CustomEvent(callback.substring(2), {
              bubbles: true,
              detail: data,
              composed: true
            }));
          }
          
        }
      }

      return <div ref={ref}><Component {...newProps} /></div>
    }

    class MicroFrontendElement extends HTMLElement {

      constructor(props){
        super(props);
        const linkElem = document.createElement('style');
        linkElem.innerHTML = options.styles;
        this.mountPoint = document.createElement('span');
        let container = this.attachShadow({ mode: 'closed' })
        container.appendChild(linkElem)
        container.appendChild(this.mountPoint);

      }

      static get observedAttributes() { 
        return options.props; 
      }

      connectedCallback(){
        this.render()
      }

      attributeChangedCallback(name,oldValue, newValue) {
        if(oldValue != newValue){
          this.render();
        }
      }

      render(){
        let newProps = {}
        for(let value of this.attributes){
          newProps[value.name] = value.value;
        }

        ReactDOM.render(<ComponentWrapper {...newProps} />, this.mountPoint);
      }

      disconnectedCallback() { 
        
      }
    }
    if(!window.customElements.get(name)){
      window.customElements.define(name, MicroFrontendElement);
    }
  }
}

export default MicroFrontendModule