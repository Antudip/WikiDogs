/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import formValidator from "./functions/validator";
import './CreationForm.modules.css'
import { getAllBreeds, getTempers } from "../../store/actions";
import TemperCard2 from "./temperCard2/TemperCard2";
let error = "";



export default function CreationForm() {

    const breeds = useSelector(state => state.breeds);
    const dispatch = useDispatch();
    const tempers = useSelector(state => state.tempers);
    const [someThingHappend, setSomethingHappend] = useState(false);
    const [breedCreated, setBreedCreated] = useState(false);
    const [addedTempers, setAddedTempers] = useState([]);
    const [errorState, setErrorState] = useState('');

    useEffect(() => {
        dispatch(getTempers());
        dispatch(getAllBreeds());
    }, [dispatch])

   

    function handlerOnSubmit(e) {
        e.preventDefault();

        const target = e.target;
        error = 0;

        error = formValidator(target.name.value, target.minHeight.value, target.maxHeight.value,
            target.minWeight.value, target.maxWeight.value, target.image.value, addedTempers, breeds);



        if (error) {
            setErrorState(error)
            setSomethingHappend(true);
            setBreedCreated(false);
        } else {
            setSomethingHappend(false);
            setBreedCreated(true);
            dispatch(getAllBreeds());
        }


        // console.log(error);
    }

    const addTemper = (temper) => {
        if (!addedTempers.includes(temper)) {
            setAddedTempers([...addedTempers, temper]);
        } else {
            setAddedTempers(addedTempers.filter(e => e !== temper));
        }
    }
    return <>
        <div className="formContainer">
            <form className='form' onSubmit={(e) => handlerOnSubmit(e)}>
                <input className="principalInputs normalInput" autoComplete="off" type='text' name="name" placeholder="Specify the name here"></input>
                <div className="heightAndWeight">
                    <div className="heightInputs">
                        <div>
                            <input className="normalInput" autoComplete="off" type='number' name="minHeight" placeholder="min Height here"></input>
                            <span>cm</span>
                        </div>
                        <div>
                            <input className="normalInput" autoComplete="off" type='number' name="maxHeight" placeholder="max Height here"></input>
                            <span>cm</span>
                        </div>
                    </div>
                    <div className="weightInputs">
                        <div>
                            <input className="normalInput" autoComplete="off" type='number' name="minWeight" placeholder="min Weight here"></input>
                            <span>kg</span>
                        </div>

                        <div>
                            <input className="normalInput" autoComplete="off" type='number' name="maxWeight" placeholder="max Weight here"></input>
                            <span>kg</span>
                        </div>
                    </div>
                </div>
                <input className="principalInputs normalInput" autoComplete="off" type='text' name="image" placeholder="Image URL here"></input>
                {someThingHappend ? <div className="error">{errorState}</div> : breedCreated ? <h1 style={{color:'#272'}}>breed added successfully</h1> : <></>}

                <button className='button' type='submit' name="submit" ><i className="fa-solid fa-paper-plane"></i></button>
                <div className="temperCardContainer">
                    {tempers.map((e) => <TemperCard2 addedTempers={addedTempers} addTemper={addTemper} key={e + Math.random(1000)} name={e}></TemperCard2>)}
                </div>
                    <h2 style={{margin:'0', color:'#888', order:'10'}}>add temperaments</h2>
                <Link to='/home'>
                    <button id='backButton' ><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <div className="imgCont">
                    <div className="imageOutline"></div>
                    <img src='https://i.pinimg.com/originals/05/ae/06/05ae0601b3eaa1d6dc8de16ce22214d8.jpg' alt='perrufo'></img>
                </div>
            </form>
        </div>
    </>
}