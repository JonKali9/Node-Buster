import React, {useState} from 'react';
import '../styling/Home.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function Home() {
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
        <div id='home'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <div className='alert-container'>
                    <div className='alert'>
                        <h3>Node Buster is Hiring!</h3>
                        <p>
                            Node Buster is currently in the process of building its first team. 
                            If you are interested in joining us, please contact us at nodebuster@gmail.com. We are looking for developers, designers, marketers as well as anyone with some sort of vision.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Welcome to Node Buster!</h3>
                        <p>
                            Hello and welcome to Node Buster! <br />
                            If you’re reading this then that means you’ve already come to learn of our new and modern platform, and already have a good chance of joining our welcoming and elite community.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>What is Node Buster?</h3>
                        <p>
                            Node Buster is an online crypto gambling site, it incorporates elements of the popular Crash Game, (created and popularized by bustabit).
                            Which if you are unfamiliar with, is a type of game where you place a bet, watch is get multiplied by the second, and can withdraw your winning whenever you’d like. 
                            The game however can crash at any moment and you will lose your winnings. We do however, add a unique mix of exciting visuals and exclusivity by being invite only.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>How do I play?</h3>
                        <p>
                            If you are interested in participating in one of our games, you must first deposit crypto into your Node Buster account, we have attempted to make this as simple as possible. 
                            Simply select the amount you wish to deposit, scan the QR code, and wait for the money to be deposited in your account. 
                            We are glad to announce that any money you deposit or withdraw, will NOT be taxed like other Bust games. 
                            You will be able to keep 100% of the money you place and win with Node Buster.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>How do I join?</h3>
                        <p>
                            One of Node Buster's most unique features is its invite only system. 
                            Each month, we will allow a certain number of new users to join our site using a special invite link. 
                            These users are now permanent members, and each one can invite a single friend to join them on the site and earn $10 to play with on the site. 
                            However, as of writing this, Node Buster is currently in development and not available to the public as of yet. 
                            If you are interested in us though, you may join our mailing list to receive weekly status updates, or follow us on Twitter where we actively engage with our audience.
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
