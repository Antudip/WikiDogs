import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './LandingPage.modules.css'
import { useSelector, useDispatch } from "react-redux";
import { getAllBreeds } from '../../store/actions';


export default function LandingPage() {
    const dispatch = useDispatch()
    const breeds = useSelector(state => state.breeds);
    const isLoading = useSelector(state => state.isLoading);
    const referencia = useRef(null);
    let [randomDogs, setRandomDogs] = useState([]);

    useEffect(() => {
        dispatch(getAllBreeds());
    }, []);

    useEffect(() => {
        let dogsRandom = [];
        let indexes = [];
        if (breeds.length) {
            let newIndex;
            for (let i = 0; i < 3; i++) {
                newIndex = Math.ceil(Math.random() * breeds.length - 1);
                !indexes.includes(newIndex) ? indexes.push(newIndex) : i--;

            }
            dogsRandom = indexes.map(e => breeds[e].image)


        }
        setRandomDogs(dogsRandom);
       

    }, [breeds]);

    return <div className="landingPage">

        {breeds.length && !isLoading ? <div ref={referencia} className="randomDogsContainer">

            <div className="anotherContainer">
                <div className="images">
                    {randomDogs.map(e => {
                        return <div className="dog" key={e}><img src={e} alt=""></img></div>
                    })}
                </div>
                <div className="randomDogsBackground"></div>

                <Link to='/home'>
                    <div className="botoncitoContainer">
                        <button id="botoncito"><div>LOG IN</div></button>

                    </div>
                </Link>

            </div>

        </div> : <div className="loadingIcon"><img src="https://media3.giphy.com/media/xNj5Tx8kMHQdZFzrPp/giphy.gif?cid=ecf05e47wjwe7py8nplxh6n153ntmf9wk5yx71dgi260b6vr&rid=giphy.gif&ct=s" alt='hola'></img></div>}
    </div>
}