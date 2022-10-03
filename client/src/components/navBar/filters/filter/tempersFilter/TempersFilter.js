import React from "react";
import TemperCard from "../../temperCard/TemperCard";
import './TempersFilter.modules.css'
export default function TempersFilter(props){
    const setShowTempersForFilter = props.setShowTempersForFilter;
    
    return<>
        <div className="tempers">{props.tempers.map((e) => <TemperCard key={e + Math.random(0, 200)} name={e}></TemperCard>)}
                <button className='hiddeButton' onClick={() => { setShowTempersForFilter(false) }}>X</button>
        </div>
    </>
}