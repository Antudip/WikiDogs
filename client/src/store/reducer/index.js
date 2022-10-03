import { GET_ALL_BREEDS, SET_LOADING, GET_BREED_BY_NAME,
        NO_COINCIDENCES,REMOVE_BREED,GET_DETAILS, 
        ADD_FILTER, REMOVE_FILTER, GET_TEMPERS, SET_TEMPER_FILTERS,
         REMOVE_TEMPER_FILTERS, REMOVE_ALL_TEMPER_FILTERS, SET_ALL_BREEDS, SET_DETAIL} from "../actionNames";



const initialState = {
    breeds: [],
    details:{},
    filters:[],
    tempers:[],
    temperFilters:[],
    loading: false,
    detail:false,
    noCoincidences:false
}



export function breedsReducer(state = initialState, action){
        switch(action.type){
            case GET_ALL_BREEDS:
                return {...state, breeds: action.payload}
            case SET_LOADING:
                return {...state, loading: action.payload}
            case NO_COINCIDENCES:
                return{...state, noCoincidences:action.payload}
            
            case GET_BREED_BY_NAME:
                return {...state, breeds: action.payload}
            case REMOVE_BREED:
                return {...state, breeds: action.payload}
            case GET_DETAILS:
                return {...state, details: action.payload}
            case ADD_FILTER:
                
                    if(!state.filters.includes(action.payload)){
                        return {...state,filters: [...state.filters, action.payload]};
                    }else{
                        return {...state};
                    }
            case REMOVE_FILTER:
                    if(!action.payload){return {...state, filters:[]}}
                    const newFilters = state.filters.filter(e=>e !== action.payload);
                    return {...state, filters: newFilters}
            
            case GET_TEMPERS:
                    return {...state, tempers:action.payload};
            
            case SET_TEMPER_FILTERS:
                if(!state.temperFilters.includes(action.payload)){
                    return {...state, temperFilters: [...state.temperFilters,action.payload]}
                }else{
                    return {...state};
                }

            case REMOVE_TEMPER_FILTERS:
                return {...state, temperFilters: state.temperFilters.filter(e=>e!==action.payload)}
            
            case REMOVE_ALL_TEMPER_FILTERS:
                return {...state, temperFilters: []}

            case SET_ALL_BREEDS:
                return {...state,breeds:action.payload}
            case SET_DETAIL:
                return {...state, detail:action.payload}
            default:
                return state; 
        }
}


