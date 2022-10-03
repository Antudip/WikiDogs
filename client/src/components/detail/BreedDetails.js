/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './BreedDetails.modules.css'
import Data from './data/AllData'

export default function BreedDetail(props) {
    const setIndex = props.setIndex;
    const index = props.index;
    let [breedCopy,setBreedCopy] = useState();
    // let anotherCopy;
    
    let ind;
    useEffect(() => {
        props.breeds.find((e, i) => {
            if (e.id === props.id) {
                ind = i;
                return true;
            }

            return false;
        });
        setIndex(ind);
        
    },[]);

    useEffect(()=>{
        setBreedCopy(props.breeds[index]);
    },[props.breeds,index])

    return <>
        <div className='compeleteCard'>
            <div className='background'></div>
            <div className='data'>

                {breedCopy?<Data height={breedCopy.height} weight={breedCopy.weight} name={breedCopy.name} tempers={breedCopy.temperaments}></Data>:<></>}
            </div>
            <div className='imageBox'><img className='image' alt='Img not found' src={breedCopy?.image}></img></div>
            <div className='description'>{breedCopy?.description}</div>
            <button className='hiddeDetailButton' onClick={() => { 
                props.showDetail(false, undefined)
                
                }}><i className="fa-regular fa-rectangle-xmark"></i></button>
        </div>
    </>
}