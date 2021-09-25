import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styling/User.css'
import Logo from '../images/logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function User(props) {
    window.onscroll = () => {
        if (window.scrollY < 60) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-14rem';
    }

    const userParam = props.match.params.username;
    const userInfo = {
        username: 'Admin',
        email: 'jonkali9@protonmail.com',
        userId: 7,
        balance: 1250,
        donated: 452.18,
        joinDate: '16/07/2021',
        lastOnline: '18/09/2021'
    }

    return (
        <div id='user'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                {
                    userInfo.username ?
                    <div id='info'>
                        <h1>{userInfo.username}</h1>
                        <p>{userInfo.email}</p>

                        <div id='stats'>
                            <p>User #{userInfo.userId}</p>
                            <p>Balance: ${userInfo.balance}</p>
                            <p>Donated: ${userInfo.donated}</p>
                            <p>Joined on {userInfo.joinDate}</p>
                            <p>Last online {userInfo.lastOnline}</p>
                        </div>
                    </div> : 
                    <div>
                        <h2>No results for {userParam}.</h2>
                    </div>
                }
            </div>
            <p style={{opacity:'0%'}}>tesf</p>
            <Footer/>
        </div>
    )
}