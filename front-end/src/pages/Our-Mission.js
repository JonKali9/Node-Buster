import React, {useState} from 'react';
import '../styling/Our-Mission.css'
import Logo from '../images/logo';
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
        if (window.scrollY < 80) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-13rem';
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
                            Our mission here at Node Buster is to provide you, the user, the exclusive and prestigious playing experience you deserve. <br/>
                            Being an invite only platform allows us to cater to our userbase, allowing us to make sure they have an optimal playing experience.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Our Values</h3>
                        <p>
                            Here at Node Buster we have three core values, which are the heart of our company and platform: <br />
                            - Renewable Energy, and fighting Climate Change<br />
                            - Privacy on the Web<br />
                            - Web 3.0 and Decentralization<br />
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Fighting Climate Change</h3>
                        <p>
                            The Earth is our planet, that applies to each and every one of us. <br/>
                            We wish to help fight the current climate crisis, by donating the money users lose to a good cause.
                            We hope we can truly make a difference, and maybe even change the stigma surrounding the gambling community!
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Privacy on the Web</h3>
                        <p>
                            Many of you will consider privacy to be human right, and we agree! <br/>
                            In a technological age, it is crucial for privacy to be protected online!
                            Which is why we promise to keep 0 logs of individual user activity, with any and all data stored being anonymous.
                            That is a Node Buster guarantee!
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Web 3.0 and Decentralization</h3>
                        <p>
                            A relatively new concept which gives back power to the people. <br/>
                            Web 3.0 and blockchain technology would give people full access to their wealth and finances,
                            by stopping governments from having control over banking.
                            It is something that the Node Buster team very much supports and believes in, and
                            is willing to do whatever it can to support the concept.
                        </p>
                    </div>
                </div>

                <form onSubmit={addEmail} id='mailing'>
                    <h2>Want to keep updated?</h2>
                    <p>Join our mailing list!</p>
                    <input placeholder='Enter Email' onChange={e => setEmail(e.target.value)} /> <br />
                    <button>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}