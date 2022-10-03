import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTemperFilters, removeTemperFilters } from "../../../../store/actions";
import './TemperCard.modules.css'


export default function TemperCard(props){
    const temperFilters = useSelector(state=>state.temperFilters);
    const dispatch = useDispatch();
    const input = useRef(null);
    
    useEffect(()=>{

        if(temperFilters.includes(input.current.value)){
            input.current.classList.add('activeCard');
        }

    });
    
    let handleOnClick = function(e){
        if(!temperFilters.includes(e.target.value)){
            input.current.classList.add('activeCard');
            dispatch(setTemperFilters(e.target.value));
        }else{
            dispatch(removeTemperFilters(e.target.value));
            input.current.classList.remove('activeCard');
        }
    }
    return <input ref={input} type='submit' value={props.name} name = 'hola' onClick= {(e)=>{handleOnClick(e)}} className= 'temperCard'>
      
    </input>
}