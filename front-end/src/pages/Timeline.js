import React, {useState} from 'react';
import '../styling/Our-Mission.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particles from 'react-particles-js';
import ParticlesConfig from '../particlesConfig';

export default function Timeline() {
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
        let currentScrollPos = window.pageYOffset;
        if (window.scrollY < 200) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-5rem';
    }

    return (
        <div id='our-mission'>
            <Navbar />
            <Particles id='particles' params={ParticlesConfig} />
            <header id='particles-js'>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <h1>Timeline:</h1>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Founding of Node Buster</h3>
                        <p>Founded in 2021 by its founder, JonKali. The site was announced on the 17th of July and gained its first initial fans. Soon after began the search for a team and investors...</p>
                    </div>
                </div>

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