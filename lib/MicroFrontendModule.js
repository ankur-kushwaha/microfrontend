import { h,render } from 'preact';
import { useRef } from 'preact/hooks';

function MicroFrontendModule(name, options) {
  
  return function (Component) {

    function ComponentWrapper(props) {

      let ref = useRef(null);

      let newProps = {}
      for (let key in props) {
        try {
          newProps[key] = JSON.parse(props[key]);
        } catch (e) {
          newProps[key] = props[key]
        }
      }
      for (let callback of options.callbacks) {
        newProps[callback] = function (data) {
          ref.current.base.dispatchEvent(new CustomEvent(callback, {
            bubbles: true,
            detail: data,
            composed: true
          }));
          if(callback.startsWith('on')){
            ref.current.base.dispatchEvent(new CustomEvent(callback.substring(2), {
              bubbles: true,
              detail: data,
              composed: true
            }));
          }
          
        }
      }

      return <Component ref={ref} {...newProps} />
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

        render(<ComponentWrapper {...newProps} />, this.mountPoint);
      }

      disconnectedCallback() { 
        
      }
    }

    window.customElements.define(name, MicroFrontendElement);

  }
}

export default MicroFrontendModule