import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {breedsReducer} from './reducer'

let store = createStore(breedsReducer, applyMiddleware(thunk));

export default store;