import React, {useState} from "react";

function Nav() {
    return(
        <div className='nav_bar'>
            <h1 id = 'nav-title'>Day Logger</h1>
            <a href='/logday'>Log Day</a>
            <a href='/edit'>Edit Questions</a>
            <a href='/data'>View Data</a>
            <a href = '/profile'>
                <img
                    className='profile_picture'
                    src='defaultProfile.png'
                    alt='profile'/>
            </a>
        </div>
    );

}

export default Nav;