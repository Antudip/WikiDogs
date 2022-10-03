/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter, getTempers} from "../../../store/actions";
import Filter from "./filter/Filter";
import FilterByTemper from "./filter/FilterByTemper";
import './Filters.modules.css';





export default function Filters(props){
    
    const dispatch = useDispatch();
    const tempers = useSelector(state => state.tempers);
    const filters = useSelector(state=>state.filters);
    const [showTempersForFilter,setShowTempersForFilter] = useState(false);

    useEffect(()=>{
        dispatch(getTempers());
    },[dispatch]);
   

    function handleOnClick(e){
        if(filters.find(f=>f===e.target.name)){           
            dispatch(removeFilter(e.target.name));  
            if(e.target.name === 'byTemper'){
                setShowTempersForFilter(false);
            }
            
        }else{
            
            dispatch(addFilter(e.target.name));
            if(e.target.name === 'byTemper'){
                setShowTempersForFilter(true);
            }
            if(e.target.name === 'byMinWeight' || e.target.name === 'byMaxWeight'){
                dispatch(removeFilter('alphabeticallyFromA'));
                dispatch(removeFilter('alphabeticallyFromZ'));
                if(e.target.name === 'byMinWeight'){
                    dispatch(removeFilter('byMaxWeight'));
                }else{
                    dispatch(removeFilter('byMinWeight'));
                }   
            }
            if(e.target.name === 'alphabeticallyFromA' || e.target.name === 'alphabeticallyFromZ'){
                dispatch(removeFilter('byMinWeight'));
                dispatch(removeFilter('byMaxWeight'));
               
                if(e.target.name === 'alphabeticallyFromA'){
                    dispatch(removeFilter('alphabeticallyFromZ'));
                }else{
                    dispatch(removeFilter('alphabeticallyFromA'));
                }   
            }
        }
        
    }
    
    function showTempers(){
        if(showTempersForFilter){
            setShowTempersForFilter(false);
        }else{
            setShowTempersForFilter(true);
        }
    }
   
    return <div className = {props.showFilters && !props.detail?'lista':'listaHiding'}>
        <ul className="filters">
            <Filter  filters = {filters}  handleOnClick={handleOnClick} name = 'By creator' id= 'byCreator'></Filter>
            <Filter  filters = {filters}   handleOnClick={handleOnClick} name = 'Min weight' id= 'byMinWeight'></Filter>
            <Filter  filters = {filters}  handleOnClick={handleOnClick} name = 'Max weight' id= 'byMaxWeight'></Filter>
            <Filter  filters = {filters}  handleOnClick={handleOnClick} name = 'Alphabetically A-Z' id= 'alphabeticallyFromA'></Filter>
            <Filter  filters = {filters}  handleOnClick={handleOnClick} name = 'Alphabetically Z-A' id= 'alphabeticallyFromZ'></Filter>
            <FilterByTemper handleOnClick={handleOnClick} name = 'By Temper' id = 'byTemper' showTempers = {showTempers} tempers = {tempers} filters = {filters} showTempersForFilter = {showTempersForFilter} setShowTempersForFilter = {setShowTempersForFilter}></FilterByTemper>
            {filters.includes('byTemper')?<button className= 'showFilterTempers' onClick={()=>{setShowTempersForFilter(true)}}>Filtered by tempers</button>:<></>}
        </ul>
    </div>
}
