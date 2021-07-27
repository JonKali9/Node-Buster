import React from 'react';
import Twitter from '../images/twitter'
import Discord from '../images/discord';

export default function Footer() {
    return (
        <footer id='footer'>
            <div id='left'>
                <h3>Contact us at <span style={{textDecoration:'underline'}}>nodebuster@gmail.com</span></h3>
            </div>
            <div id='right'>
                <img src={Discord} className='app-icon' alt='twitter' onClick={() => window.open('https://discord.gg/P6cNWQScyH', '_blank')} />
                <img src={Twitter} className='app-icon' alt='twitter' onClick={() => window.open('https://twitter.com/Node_Buster', '_blank')} />
            </div>
        </footer>
    )
}
