import React, {useState} from 'react';
import '../styling/Contact-Us.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function ContactUs() {
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

    const [user, setUser] = useState('');
    const [content, setContent] = useState('');
    const uploadContact = e => {
        e.preventDefault();
        if (content) {
            fetch(`/api/contact-form/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user,
                    content
                })
            })
            .then(res => res.text())
            .then(res => alert(res) ? null : window.location.reload())
            .catch(err => alert(err) ? null : window.location.reload());
        } else {
            alert('Empty fields!')
        }
    }

    window.onscroll = () => {
        if (window.scrollY < 200) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-10rem';
    }

    return (
        <div id='contact-us'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <h1>Contact Us</h1>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Interested in Contacting Us?</h3>
                        <p>
                            Well you're in luck, we see communication with
                            our users as a key priority, and have hence setup
                            several different ways for you to contact us.
                            We have a twitter and a discord where we interact with our users,
                            as well as an email if you wish to be professional.
                            We also have a contact form if you wish for anonoymous communiction.
                            Whatever the case, we'll be happy to hear from you.
                        </p>
                    </div>
                </div>

                <form onSubmit={uploadContact} id='contact-form'>
                    <h2>Contact Form</h2>
                    <div id='grid'>
                        <input onChange={e => setUser(e.target.value)} placeholder='Username/Email (optional)'  />
                        <textarea onChange={e => setContent(e.target.value)} placeholder='Message' />
                        <button>Submit</button>
                    </div>
                </form>

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