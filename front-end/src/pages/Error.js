import React, {useState} from 'react';
import '../styling/Error.css'
import Logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function Error() {
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
        if (window.scrollY < 200) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-13rem';
    }

    return (
        <div id='error'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <h1>404</h1>
                <h2>Page not found :(</h2>

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