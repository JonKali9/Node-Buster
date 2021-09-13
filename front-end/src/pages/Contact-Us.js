import React, {useState} from 'react';
import '../styling/Contact-Us.css'
import Logo from '../images/logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function ContactUs() {
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
        if (window.scrollY < 80) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-13rem';
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
                            We believe that sites should prioritize communication with users,
                            which is why we have setup several ways in which you may contact us!
                            Below you may find an anonymous form, which will allow you to send us a message. <br/>
                            You may also send us an email at nodebuster@gmail.com, as well as DM us on of our socials,
                            and even chat with us on Discord! Links can be found at the bottom of the page!
                            We hope to hear from you!
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
            </div>
            <Footer />
        </div>
    )
}