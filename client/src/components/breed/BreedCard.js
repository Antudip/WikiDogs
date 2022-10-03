import React from "react";
import './BreedCard.modules.css';
import { useDispatch } from "react-redux";
import { removeBreed } from "../../store/actions";


export default function BreedCard(props) {
    const dispatch = useDispatch()

    
    function handleOnClick(id) {
        dispatch(removeBreed(id));
    }
    

    return <div className="cardContainer">
   
    
        <div className='BreedCard' >
            <div onClick={()=>{props.showDetails(true,props.id)}} className="handlerClicker"></div>
            <div>{props.name}</div>
            <div className="imageContainer">
                <img src={props.image} alt='Not img found' className="image" ></img>

            </div>
            {!props.fromApi ? <button className="deleteButton" onClick={() => handleOnClick(props.id)}><i className="fa-regular fa-rectangle-xmark"></i></button> : <></>}
        </div>
        
    </div>
}