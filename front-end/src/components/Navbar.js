import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <div id='navbar'>
            <Link className='navlink' to='/'>home</Link>
            <Link className='navlink' to='/our-mission'>our mission</Link>
            <Link className='navlink' to='/contact-us'>contact us</Link>
            <Link className='navlink' to='/timeline'>timeline</Link>
            <Link id='play-link' className='navlink' to='/play'>play!</Link>
        </div>
    )
}
