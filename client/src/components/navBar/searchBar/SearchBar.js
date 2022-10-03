import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreedByName } from "../../../store/actions";
import './SearchBar.modules.css'



export default function SearchBar() {
    let dispatch = useDispatch();
    let detail = useSelector(state => state.detail);
    function handleOnChange(e) {
        e.preventDefault();
        let search = e.target.value || "";
        dispatch(getBreedByName(search));

    }
    return <>
        {!detail?<div className="SearchBar">
            <input autoComplete="off" className='input' type="text" name="name" placeholder="Search Breed" onChange={handleOnChange}></input>
        </div>:
        <div className="SearchBarHidden">
        <input autoComplete="off" className='inputHidden' type="text" name="name" placeholder="Search Breed" readOnly></input>
        </div>}
    </>
}