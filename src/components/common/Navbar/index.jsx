import React from 'react'

export default function() {
    return (
        <nav className='navbar'>
            <a href='https://www.oecd.org/sti/ind/inter-country-input-output-tables.htm'>
                <img className="logo" src="./src/assets/oecd-logo-1030x995.png" />
            </a>
            <div className='navbar-etc'>
                <a className='navbar-etc-element'>CROSS-COUNTRY-SECTOR LINKAGES</a>
                <a className='navbar-etc-element'>COUNTRY PROFILES</a>
                <a className='navbar-etc-element'>EMPLOYMENT & GVC</a>
                <a className='navbar-etc-element'>CO2 & GVC</a>
                <a className='navbar-etc-element'>ABOUT</a>
            </div>
        </nav>
    )
}