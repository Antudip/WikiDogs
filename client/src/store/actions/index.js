import {GET_ALL_BREEDS, SET_LOADING,GET_BREED_BY_NAME,
        NO_COINCIDENCES,REMOVE_BREED, GET_DETAILS,ADD_FILTER,
        REMOVE_FILTER, GET_TEMPERS, SET_TEMPER_FILTERS, 
        REMOVE_TEMPER_FILTERS,REMOVE_ALL_TEMPER_FILTERS, SET_ALL_BREEDS, SET_DETAIL} from '../actionNames';

import axios from 'axios'


export function setLoading(value){
    return {type:SET_LOADING, payload: value};
}

export function noCoincidences(value){
    return {type: NO_COINCIDENCES, payload: value};
}
export function addFilter(filter){
    return {type: ADD_FILTER, payload:filter}
}
export function removeFilter(filter){
    if(!filter){return {type: REMOVE_FILTER}}
    return {type: REMOVE_FILTER, payload:filter}
}

export function getAllBreeds(){
    return function(dispatch){
        dispatch(setLoading(true));
        axios('/breed')
        .then(data=>{

            dispatch({type:GET_ALL_BREEDS, payload: data.data})
        
            dispatch(setLoading(false));
        })
        .catch(err=>{
            throw new Error(err);
        });
    }
}

export function setAllBreeds(payload){
    return {type: SET_ALL_BREEDS, payload}
}

export function getBreedByName(name){
    return function(dispatch){
        dispatch(setLoading(true));
        axios(`breed/?name=${name}`)
        .then(data=>{
            dispatch(noCoincidences(false));
            dispatch({type: GET_BREED_BY_NAME, payload: data.data});
            dispatch(setLoading(false));
        })
        .catch(err=>{
            
            dispatch(noCoincidences(true));
        });

    }
}

export function getDetail(id){
    return function(dispatch){
        dispatch(setLoading(true));
        axios('breed/id/'+id)
        .then(data=>{
            dispatch({type: GET_DETAILS, payload:data.data});
           
            dispatch(setLoading(false));
        });
    }
}

export function removeBreed(id){
    return function(dispatch){
        dispatch(setLoading(true));
        axios.delete('breed/id/'+id)
        .then((data)=>{
            dispatch({type: REMOVE_BREED, payload: data.data});
            dispatch(setLoading(false));

        });
     
    }
}
export function getTempers(){
    return function(dispatch){
        axios('temper/')
        .then(data=>{
            dispatch({type:GET_TEMPERS, payload:data.data});
        })
        .catch(err=>{
            console.log('error', err);
        });
    }
}
export function setTemperFilters(temper){
    return {type: SET_TEMPER_FILTERS, payload: temper};
}
export function removeTemperFilters(temper){
    if(!temper)return {type: REMOVE_ALL_TEMPER_FILTERS}
    return {type: REMOVE_TEMPER_FILTERS, payload:temper}
};

export function setDetail(setting){
    console.log(setting, SET_DETAIL)
    return {type:SET_DETAIL, payload: setting}
}