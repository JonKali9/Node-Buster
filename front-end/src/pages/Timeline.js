import React, {useState} from 'react';
import '../styling/Our-Mission.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

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
                <h1>Timeline:</h1>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Idea behind Node Buster is Spawned</h3>
                        <p>
                            During one especially boring day in class, the initial idea for Node Buster
                            was spawned, an online invite only, anonymous
                            Crash Game. He began sketching the basis of the site and begins expanding
                            on the initial idea.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Nodebuster.com is Launched!</h3>
                        <p>
                            On the 20th of July, 2021, nodebuster.com was launched and announced!
                            The site had been in production for the past couple weeks, and
                            although the site only included the text on the homepage, work on
                            a prototype for the Crash Game was well underway.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Nodebuster begins the Search for Employees and Investors</h3>
                        <p>
                            With the site public and the idea fully developed,
                            Node Buster began looking for the first employees to join Node Buster
                            and help with the development  of the site. The search for initial funding
                            also began.
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