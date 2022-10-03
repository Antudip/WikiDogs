import React from "react";
import './PrePageButton.modules.css';

export default function PrePageButton(props){
    return <>
        <button className="prePageButton" onClick={()=>{
            if(!props.detail){
                props.previousPage()
            }else{
                if(props.index >  0){
                    props.setIndex(props.index-1);
                }
            }
        }}><i className="fa-solid fa-angles-left"></i></button>
       
    </>
}