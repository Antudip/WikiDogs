import React,{useRef,useEffect } from "react";
import './Filter.modules.css'
import { useDispatch} from "react-redux";
import { removeTemperFilters } from "../../../../store/actions";
import TempersFilter from "./tempersFilter/TempersFilter";
export default function FilterByTemper(props) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const setShowTempersForFilter = props.setShowTempersForFilter;

    useEffect(()=>{
        if(props.filters.includes(ref.current.name)){
            ref.current.checked = true;
            ref.current.classList.add('activeCheckbox');
        }else{
            ref.current.checked = false;
            ref.current.classList.remove('activeCheckbox');

        }
    })
    return <>
        <li className={props.filters.includes('byTemper')?"listElements e3 activo":"listElements e3"}>

            <label htmlFor={props.id} className="text">{props.name}</label>
            <input ref = {ref} className="inputs" type='checkbox' onClick={(e) => {
                if (!props.filters.includes('byTemper')) {
                    props.showTempers();
                }
                props.handleOnClick(e);
                dispatch(removeTemperFilters());

            }} name={props.id} id = {props.id}></input>
            {props.showTempersForFilter? <TempersFilter filters ={props.filters} setShowTempersForFilter={setShowTempersForFilter} tempers = {props.tempers}></TempersFilter> : <div></div>}
        </li>
    </>
}