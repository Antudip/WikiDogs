import React, { useState } from 'react';
import SearchBar from './searchBar/SearchBar';
import './NavBar.modules.css';
import { Link } from 'react-router-dom';
import Filters from './filters/Filters';
import { useSelector } from 'react-redux';



function NavBar() {
    let [showFilters, setShowFilters] = useState(false);
    let detail = useSelector(state => state.detail);
    return <>
        <div className='NavBar'>
            <h1 className='title'>Henry Dogs</h1>
            <div className='buttonAndSearchContainer'>
                <div className='searchBarContainer'><SearchBar></SearchBar></div>
                <div className='buttonsContainer'>
                    {!detail ? <Link to='/creationForm'>
                        <button className='creationButton'><i class="fa-solid fa-plus"></i></button>
                    </Link> :
                        <button className='hiddenButton'><i class="fa-solid fa-plus"></i></button>}
                    <button className={detail?'filterHidder filterHidderDisabled':showFilters?'turnedButton filterHidder':'filterHidder'} onClick={(e) => {
                        if (!detail) {
                            setShowFilters(!showFilters)
                            

                        }

                    }}><i className="fa-solid fa-arrow-down-wide-short"></i></button>

                    {<Filters detail = { detail} showFilters={showFilters}></Filters> }
                    {/* // : <div className='pseudoFilters'></div> */}
                </div>
            </div>
        </div>
    </>
}
export default NavBar;