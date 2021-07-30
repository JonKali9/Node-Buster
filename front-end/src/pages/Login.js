import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styling/Login.css'
import Logo from '../images/logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function Login() {
    window.onscroll = () => {
        if (window.scrollY < 80) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-13rem';
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = e => {
        e.preventDefault();
        if (username && password) {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            .then(async res => {
                return {
                    status: res.status,
                    text: await res.text()
                }
            })
            .then(res => {
                alert(res.text);
                if (res.status === 200) window.location.replace('/game');
            });
        } else {
            alert('Please answer all fields')
        }
    }

    return (
        <div id='login'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <form onSubmit={login}>
                    <h1>Login</h1>
                    <label>Username:</label>
                    <input onChange={e => {setUsername(e.target.value)}} />
                    <label>Password:</label>
                    <input onChange={e => {setPassword(e.target.value)}} type='password' />
                    <button>Login</button>
                    <p>Haven't got an account? <Link to='/register'>Register</Link>.</p>
                </form>
            </div>
            <Footer />
        </div>
    )
}