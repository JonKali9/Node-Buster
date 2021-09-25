import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/logo';
import './Game.css';
import { useCookies } from "react-cookie";
import {isMobile} from 'react-device-detect';
import Arrow from '../images/arrow';

import Waiting from '../images/waiting';
import Launch from '../images/launch';
import Explosion from '../images/explosion';

export default function Game() {
    // Initial Variables
    const [bet, setBet] = useState('');
    const [multipliedBet, setMultipliedBet] = useState('');
    const [profit, setProfit] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cashedOut, setCashedOut] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [username, setUsername] = useState('');
    const [status, setStatus] = useState({});
    const [balance, setBalance] = useState(0);

    const [cookies, setCookie, removeCookie] = useCookies();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginRan, setLoginRan] = useState(false);

    const [messages, setMessages] = useState([
        {
            author: 'System',
            content: 'Chat feature is currently in development, and is not available at the moment.'
        }
    ]);
    const [messageContent, setMessageContent] = useState('');

    // Update Messages
    useEffect(() => {
        const element = document.getElementById('messages')
        if (element) element.scrollTop = element.scrollHeight - element.clientHeight;
    }, [messages])

    // Redirect if user is not logged in
    if (cookies.session) {
        if (!loginRan) {
            setLoggedIn(true);
            setLoginRan(true);
            fetch('/api/user')
            .then(res => {
                if (res.ok) return res.json()
                else window.location.replace('/login')
            })
            .then(res => {
                setUsername(res.username);
            })

        }
    } else {
        if (!loginRan) {
            window.location.replace('/login');
            setLoginRan(true);
        }
    }

    // Interval which checks game status
    useEffect(() => {
        const timer = setInterval(() => {
            fetch('/api/status')
            .then(res => res.json())
            .then(res => setStatus(res));
            fetch('/api/balance')
            .then(res => res.json())
            .then(bal => setBalance(bal));
        }, 10)

        return () => clearInterval(timer);
    });

    // Updates game info
    useEffect(() => {
        if (status.status === 'playing') {
            if (isPlaying) {
                setMultipliedBet((bet * status.info).toFixed(2));
                setProfit(multipliedBet-bet);
            } else {
                if (bet && !cashedOut) setBet('');
            }
        } else if (status.status === 'waiting') {
            setProfit(0);
            setCashedOut(false);
        } else if (status.status === 'crashed') {
            if (isPlaying) {
                //player lost money
                setIsPlaying(false);
                setProfit(-bet);
            }
        }
    }, [status])

    // Function to place bet
    const placeBet = () => {
        if (bet && bet > 0 && balance >= bet) {
            setIsPlaying(true);
            fetch(`/api/place-bet/${bet}`, {
                method: 'POST'
            });
        }
    }
    // Function to cancel bet
    const cancelBet = () => {
        setIsPlaying(false);
        fetch(`/api/cancel-bet/`, {
            method: 'POST'
        });
    }
    // Function to cash out
    const cashOut = () => {
        setCashedOut(true);
        setIsPlaying(false);
        fetch(`/api/cash-out/`, {
            method: 'POST'
        });
    }
    
    //Actual Page
    return (
        <div id='game'>
            {/* Header */}
            <header>
                <div id='left'>
                    <Link to='/'><img id='logo' alt='logo' src={Logo} /></Link>
                </div>
                <div id='right' style={window.innerWidth >= 1000 ? {'gridTemplateColumns':'1fr 3rem'} : {'gridTemplateColumns':'1fr'}}>
                    <div>
                        <p>Welcome, <span>{username}</span>. <span id='button' onClick={()=>{removeCookie('session'); setUsername(''); window.location.replace('/login')}}>Log Out</span></p>
                        <p>Balance: ${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                    </div>
                    { window.innerWidth >= 1000 ?
                        <div>
                            {
                                sidebarOpen ?
                                <img src={Arrow} onClick={()=>{setSidebarOpen(!sidebarOpen)}} style={{rotate:'-90deg'}} /> :
                                <img src={Arrow} onClick={()=>{setSidebarOpen(!sidebarOpen)}} style={{rotate:'90deg'}} />
                            }
                        </div> : null
                    }
                </div>
            </header>
            {
                isMobile ? <>
                    <h1>Node Buster is not available on Mobile.</h1>
                    <h1>An App is however currently in development.</h1>
                </> : <>
                    {username ? <>
                    {/* Left */}            
                    <div id='game-left'>
                        <div id='visuals'>
                            {status.status === 'waiting' ? <>
                                <img src={Waiting} alt='Rocket Waiting' />
                                <h2>Game starting in {status.info} seconds.</h2>
                            </> : null}
                            {status.status === 'playing' ? <>
                                <img src={Launch} alt='Rocket Launch' />
                            </> : null}
                            {status.status === 'crashed' ? <>
                                <img src={Explosion} alt='Rocket Explosion' />
                            </> : null}
                        </div>
                        <div id='multiplier'>
                            {status.status === 'waiting' ? <>
                                <h1>1.00x</h1>
                            </> : null}
                            {status.status === 'playing' ? <>
                                <h1>{typeof(status.info)==='number' ? (status.info).toFixed(2) : status.info}x</h1>
                            </> : null}
                            {status.status === 'crashed' ? <>
                                <h1 style={{color:'rgb(199, 69, 69)'}}>Busted at {status.info}x</h1>
                            </> : null}
                        </div>
                    </div>
                    {/* Right */}      
                    <div id='game-right' style={!sidebarOpen ? {gridTemplateColumns:'auto'} : null}>
                        {/*Betting*/}
                        <form id='betting' onSubmit={e => {e.preventDefault()}}>
                            {/* Bar */}      
                            <div id='bar'>
                                {status.status === 'waiting' ? <>
                                    <input placeholder='Enter Bet' value={bet ? `$ ${bet}` : ''} onKeyDown={e => {
                                        if (bet.length < 8 && status.status === 'waiting') {
                                            if ('0123456789'.includes(e.key)) {
                                                if (bet.includes('.')) {
                                                    const decimals = bet.slice(bet.lastIndexOf('.')+1, bet.length).length;
                                                    if (decimals < 2) setBet(bet + e.key);
                                                } else  setBet(bet + e.key);
                                            } else if (e.key === '.' || e.key === ',') {
                                                if (!bet.includes('.')) setBet(bet+'.');
                                            }
                                        }
                                        if (e.key === 'Backspace') setBet(bet.substring(0,bet.length-1));
                                    }} />
                                </> : <>
                                    <input placeholder='Enter Bet' value={bet ? `$ ${multipliedBet}` : ''} readOnly />
                                </>}
                                <p>{profit>=0 ? `+ $${(profit).toFixed(2)}` : `- $${(-profit).toFixed(2)}`}</p>
                            </div>
                            {/* Button */}      
                            {status.status === 'waiting' ? <>
                                {isPlaying ? <>
                                    <button id='visible' onClick={cancelBet}>Cancel Bet</button>
                                </> : <>
                                    <button id='visible' onClick={placeBet}>Bet</button>
                                </>}
                            </> : <>
                                {isPlaying ? <>
                                    {status.status === 'crashed' ? <>
                                        <button id='invisible'>Bet</button>
                                    </> : <>
                                        <button id='visible' onClick={cashOut}>Cash Out</button>
                                    </>}
                                </> : <>
                                    <button id='invisible'>Bet</button>
                                </>}
                            </>}
                        </form>
                        {/* Etc */}
                        <div id='etc' style={!sidebarOpen ? {display:'none'} : null}>
                            <h1>Chat</h1>
                            <div id='messages'>
                                {
                                    messages.map(message => {
                                        return <div className='message'>
                                            <p className='author'>{message.author}</p>
                                            <p className='content'>{message.content}</p>
                                        </div>
                                    })
                                }
                            </div>
                            <form id='send-message' onSubmit={e => {
                                setMessageContent('')
                                e.preventDefault();
                                setMessages([...messages, {
                                    author: username,
                                    content: messageContent
                                }]);
                            }}>
                                <textarea value={messageContent} onChange={e => {setMessageContent(e.target.value)}} placeholder='Type Message...' />
                                <button>Send Message</button>
                            </form>
                        </div>
                    </div>
                    </> : <>
                        <h1 style={{color:'black'}}>Loading...</h1>
                    </>}
                </>
            }
        </div>
    )
}
