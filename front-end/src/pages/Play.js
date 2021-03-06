import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styling/Play.css'
import Logo from '../images/logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function Play() {
    const [email, setEmail] = useState('');
    const addEmail = e => {
        e.preventDefault();
        if (email.includes('@')) {
            fetch(`/api/mailing-list/${email}`, {
                method: 'POST'
            })
            .then(res => res.text())
            .then(res => alert(res) ? null : window.location.reload())
            .catch(err => alert(err) ? null : window.location.reload());
        } else {
            alert('Invalid email!')
        }
    }

    window.onscroll = () => {
        if (document.getElementById('navbar')) {
            if (window.scrollY < 150) document.getElementById('navbar').style.top='0rem';
            else document.getElementById('navbar').style.top='-13rem';
        }
    }

    return (
        <div id='play'>
            <Navbar />
            <Particle />
            <header id='particles-js'>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <h1>COMING SOON</h1>
                <h2>Node Buster is currently in production. <br/>You can however try the demo <Link style={{color:'wheat'}} to='/demo'>here.</Link></h2>

                <form onSubmit={addEmail} id='mailing'>
                    <h2>Interested in Joining?</h2>
                    <p>Join our mailing list!</p>
                    <input placeholder='Enter Email' onChange={e => setEmail(e.target.value)} /> <br />
                    <button>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}