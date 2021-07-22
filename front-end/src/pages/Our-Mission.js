import React, {useState} from 'react';
import '../styling/Our-Mission.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particles from 'react-particles-js';
import ParticlesConfig from '../particlesConfig';

export default function OurMission() {
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
                <h1>Our Mission:</h1>
                {/*<div className='section-container'>
                    <div className='section'>
                        <h3>History of Node Buster</h3>
                        <p>Founded in 2021 by its founder, JonKali9. Node Buster did not have the funds which other sites had the pleasure of starting with. As the founder created the prototype and began the site with a mere $1,000.</p>
                    </div>
                </div>*/}
                <div className='section-container'>
                    <div className='section'>
                        <h3>Node Busters mission</h3>
                        <p>As a company, Node Buster stands for three things. Privacy online, the decentralized web (web3) as well as investing in reusable energy. We stand for these three things and hope that Node Buster reflects that.</p>
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