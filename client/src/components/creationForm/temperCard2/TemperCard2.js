import React, { useEffect, useRef} from "react";
import './TemperCard2.modules.css'



export default function TemperCard2 (props) {
    let card = useRef(null);
    useEffect(()=>{
        if(props.addedTempers.includes(card.current.value)){
            card.current.classList.add('activeTemper');
        }
    });
    return <input type='submit' ref={card} value= {props.name} onClick={()=>{
       
        props.addTemper(props.name)
        }} className='card'>
        </input>
    
}