/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBreeds, setDetail,} from '../../store/actions';
import BreedCard from '../breed/BreedCard'
import PrePageButton from "./pagesButton/PrePageButton";
import NextPageButton from "./pagesButton/NextPageButton";
import './BreedsContainer.modules.css'
import Detail from '../detail/BreedDetails'
import { sortByCreator, sortByHeaviness, sortAlphabetically, filterByTemper } from './orders/sortFunctions'




export default function BreedsContainer() {

    const breeds = useSelector((state) => state.breeds);
    let isLoading = useSelector(state => state.loading);
    let noMatch = useSelector(state => state.noCoincidences);
    let filters = useSelector(state => state.filters);
    let temperFilters = useSelector(state => state.temperFilters);
    let detail = useSelector(state=>state.detail);
    let dispatch = useDispatch();
    let [breedID, setbreedID] = useState(false);
    let [page, setPage] = useState([0, 9]);
    let [actualPage, setActualPage] = useState(1);
    let [pages, setPages] = useState(null);
    let [pageIndeed, setPageIndeed] = useState(1);
    let [filteredBreeds, setFilteredBreeds] = useState();
    let [index, setIndex] = useState(0);
    
    
    
    useEffect(() => {
      
            dispatch(getAllBreeds());  

    },[]);
    
    
    useEffect(() => {
    
        let breedsCopy = breeds;
        let filtersCopy = filters;
        
        if (filtersCopy.length) {
            
            if (filtersCopy.includes('byCreator')) {
                breedsCopy = sortByCreator(breedsCopy, true);
            }
            if (filtersCopy.includes('byTemper')) {       
                if (temperFilters.length) {
                    breedsCopy = (filterByTemper(breedsCopy, temperFilters));   
                }  
            }
            if(filtersCopy.includes('byMinWeight')){
                breedsCopy = sortByHeaviness(breedsCopy);
            }
            if(filtersCopy.includes('byMaxWeight')){
                breedsCopy= sortByHeaviness(breedsCopy,true);
            
            }
            if(filtersCopy.includes('alphabeticallyFromZ')){
                breedsCopy = (sortAlphabetically(breedsCopy,true));
            }

            if(filtersCopy.includes('alphabeticallyFromA')){
                breedsCopy = (sortAlphabetically(breedsCopy));
            }
        setFilteredBreeds(breedsCopy);
            
        } else {
            setFilteredBreeds(breeds);
        }
        setActualPage(1);
        setPages(Math.ceil(breedsCopy.length/9));
        setPage([0, 9]);
    }, [breeds, filters, temperFilters]);
    


    const setState = (trueOrFalse, id) => {
        dispatch(setDetail(trueOrFalse));
        setbreedID(id);
    }

    const nextPage = () => {
        if (page[1] < filteredBreeds.length) {
            setPageIndeed(pageIndeed + 1)
            setPage([page[0] + 9, page[1] + 9]);
            setActualPage(actualPage+1);
        }
        
    }
    const previousPage = () => {
        if (page[0] > 0) {
            setPageIndeed(pageIndeed - 1)
            setPage([page[0] - 9, page[1] - 9]);
            setActualPage(actualPage-1);
        };
    }

    return <div className='home'>


        {detail ? <div className="detail">

            <Detail setIndex = {setIndex} index = {index} breeds = {filteredBreeds} showDetail={setState} id={breedID}></Detail>
        </div> : <></>}


        <div className='BreedsContainer'>
            {!noMatch ? isLoading ? <h1 className="loading">LOADING...</h1> :!filteredBreeds?.length?<h1 className="noMatch">NO MATCH FOR THAT BREED...</h1>: filteredBreeds?.slice(page[0], page[1]).map((breed) => {
                if (String(breed.id).length > 8) {
                    return <BreedCard showDetails={setState} name={breed.name} image={breed.image} key={breed.id} id={breed.id} />
                } else {
                    return <BreedCard showDetails={setState} name={breed.name} image={breed.image} key={breed.id} id={breed.id} fromApi={true} />
                }
            }) : <h1 className="noMatch">NO MATCH FOR THAT BREED...</h1>}
        </div>
        <div className="nextAndPreButtons">
            <PrePageButton  index = {index} setIndex = {setIndex} detail={detail} previousPage={() => {
                previousPage()
            }}></PrePageButton>
            <NextPageButton breeds = {filteredBreeds} index = {index} setIndex = {setIndex} detail={detail} nextPage={() => {
                nextPage()
            }}></NextPageButton>
        </div>
        {filteredBreeds?.length?detail?<div className="contadorDePaginas">{index+1}/{filteredBreeds.length}</div>:<div className="contadorDePaginas">{actualPage}/{pages}</div>:<></>}



    </div>

}