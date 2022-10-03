import React from "react";
import './NextPageButton.modules.css';

export default function NextPageButton(props){

    return <>
        <button className ='nextPageButton' onClick={()=>{
            if(!props.detail){
                props.nextPage()
            }else{
                if(props.breeds.length -1 >  props.index){
                    props.setIndex(props.index+1)
                }
            }
            }}><i className="fa-solid fa-angles-right"></i></button>
    </>
}