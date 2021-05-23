import {h} from 'preact'
import { useRef,useEffect } from 'preact/hooks';

export default function MicroFrontend({name,props,callbacks}) {
    const container = useRef(null);
    const element = useRef(document.createElement(name));

    useEffect(()=>{
        for(let key in props){
            let value = props[key];
            if(typeof props[key] =='object'){
                value = JSON.stringify(props[key])
            }
            if(element.current.getAttribute(key)!=value){
                element.current.setAttribute(key,value);
            }
        }
    },[props])

    useEffect(()=>{
        let current = element.current;
        for(let key in callbacks){
            current.addEventListener(key,callbacks[key])
        }
        return ()=>{
            for(let key in callbacks){
                current.removeEventListener(key,callbacks[key]);
            }
        }
    },[callbacks])

    useEffect(()=>{
        if(container.current){
            container.current.appendChild(element.current);
        }
    },[container])    
    
    return (
        <div ref={container} />
    )
}
