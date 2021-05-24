import {h} from 'preact'
import MicroFrontendModule from '../lib/MicroFrontendModule'
// import { useRef,useEffect } from 'preact/hooks';


export default function Hello() {
    return (
        <div>
            Hello World
        </div>
    )
}

MicroFrontendModule('x-hello',{
    
})(Hello)

