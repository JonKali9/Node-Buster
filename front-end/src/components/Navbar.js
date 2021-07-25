import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <div id='navbar'>
            <Link className='navlink' to='/'>Home</Link>
            <Link className='navlink' to='/our-mission'>Our mission</Link>
            <Link className='navlink' to='/contact-us'>Contact us</Link>
            <Link className='navlink' to='/timeline'>Timeline</Link>
            <Link id='play-link' className='navlink' to='/play'>Play!</Link>
        </div>
    )
}
