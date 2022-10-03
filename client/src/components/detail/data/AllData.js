import React from "react";
import './AllData.modules.css'

export default function AllData(props){
    return <div className="alldata">
        <div className="dataContainer">
        <div><h1> Name:</h1> {' '}<span className="span">{' '+props.name}</span></div>
        <div><h2> Height: </h2> <span className="span">{' '+props.height.split('-').map(e=>e+' cm').join(' -')}</span></div>
        <div><h2> Weight: </h2> <span className="span">{' '+props.weight.split('-').map(e=>e+' kg').join(' -')}</span></div>
        <div><h2> Temperament: </h2> <span className="span">{' '+props.tempers}</span></div>
        </div>
    </div>
}