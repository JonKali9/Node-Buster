import React, {useState} from 'react';
import '../styling/Our-Mission.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

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
        else document.getElementById('navbar').style.top='-10rem';
    }

    return (
        <div id='our-mission'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <h1>Our Mission:</h1>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Node Buster's Mission</h3>
                        <p>
                            Our mission here at Node Buster is to provide you, the user, the exclusive and prestigious playing experience you deserve. 
                            Being an invite only platform allows us to cater to our already existing users, and make sure they have an optimal playing experience.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Our Values</h3>
                        <p>
                            Here at Node Buster we have three core values. <br />
                            - Web3 and the Decentralized Web. <br />
                            - Privacy on the Web. <br />
                            - Investing in Renewable Energy for the planet. <br />
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Web3 and the Decentralized Web</h3>
                        <p>
                            Anyone who has been on the web long enough will know just how much it has evolved. 
                            From the first iteration of the statuc web, to the more modern and resposive web2, and finally to the optimal web3 which encourages Decentralization.
                            Node Buster is an active participant of web3 and will do all it can to support it.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Online Privacy</h3>
                        <p>
                            Many of you will consider privacy on the web to be human right, well here at Node Buster we agree.
                            Which is why we promise to keep 0 logs of user activity, any and all data stored will be anonymous,
                            and only stored if it is essential. Meaning that logs of games will be stored, and how many users participated,
                            but who participated, when they participated will never be logged.
                            That is a Node Buster guarantee.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Renewable Energy</h3>
                        <p>
                            The Earth is our planet, that applies to each and every one of us.
                            Which is why establishing an economically viable alternative to the destructive energy production we use today is so criticial to our survival.
                            Node Buster will do whatever is can to support the innovation of Renewable Energy and will give
                            users an option to donate a percentage of their winnings to this goal too.
                        </p>
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