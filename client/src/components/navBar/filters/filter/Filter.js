import React, { useEffect, useRef } from "react";
import './Filter.modules.css'



export default function Filter(props){
    const ref = useRef(null);
    const liElementRef = useRef(null);
    useEffect(()=>{
        if(props.filters.includes(ref.current.name)){
            liElementRef.current.classList.add('activo');
    
            ref.current.checked = true;
            ref.current.classList.add('activeCheckbox');
        }else{
            liElementRef.current.classList.remove('activo');

            ref.current.checked = false;
            ref.current.classList.remove('activeCheckbox');

        }
    })
    return <div  className="listElements e1" ref={liElementRef}>
    <label aria-readonly htmlFor={props.id} className="text">{props.name}</label>
    <input  ref = {ref} className="inputs" type='checkbox' id = {props.id} name={props.id} onClick={(e)=>{props.handleOnClick(e)}}   ></input>
    </div>
}