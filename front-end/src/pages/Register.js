import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../styling/Register.css'
import Logo from '../images/logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function Register(props) {
    window.onscroll = () => {
        if (window.scrollY < 80) document.getElementById('navbar').style.top='0rem';
        else document.getElementById('navbar').style.top='-13rem';
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invite, setInvite] = useState('');

    useEffect(() => {
        if (props.match.params.invite) setInvite(props.match.params.invite);
    }, [])

    const register = e => {
        e.preventDefault();
        if (username && email && password && invite) {
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    invite
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
                if (res.status === 201) window.location.replace('/login');
            });
        } else {
            alert('Please answer all fields')
        }
    }

    return (
        <div id='register'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <form onSubmit={register}>
                    <h1>Register</h1>
                    <label>Username:</label>
                    <input onChange={e => {setUsername(e.target.value)}} />
                    <label>Email:</label>
                    <input onChange={e => {setEmail(e.target.value)}} />
                    <label>Password:</label>
                    <input onChange={e => {setPassword(e.target.value)}} type='password' />
                    <label>Invite Key:</label>
                    {
                        props.match.params.invite ?
                        <input value={props.match.params.invite} disabled /> :
                        <input onChange={e => {setInvite(e.target.value)}} /> 
                    }
                    <button>Register</button>
                    <p>Already got an account? <Link to='/login'>Login</Link>.</p>
                </form>
            </div>
            <Footer />
        </div>
    )
}