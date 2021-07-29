import React, {useState, useEffect} from 'react';
import Logo from '../images/logo';
import './Game.css';
import Rocket from '../images/rocket';
import Explosion from '../images/explosion';

export default function Game() {
    // Initial Variables
    const [selection, setSelection] = useState('');
    const [selectionContent, setSelectionContent] = useState(null);

    const [bet, setBet] = useState('');
    const [multipliedBet, setMultipliedBet] = useState('');
    const [profit, setProfit] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cashedOut, setCashedOut] = useState(false);

    const [status, setStatus] = useState({});
    const [balance, setBalance] = useState(50);

    // Interval which checks game status
    useEffect(() => {
        const timer = setInterval(() => {
            fetch('/api/status')
            .then(res => res.json())
            .then(res => setStatus(res));
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
            setBalance(balance - Number(bet));
            setIsPlaying(true);
            fetch('/api/place-bet');
        }
    }
    // Function to cancel bet
    const cancelBet = () => {
        setBalance(balance + Number(bet));
        setIsPlaying(false);
        fetch('/api/cancel-bet');
    }
    // Function to cash out
    const cashOut = () => {
        setBalance(balance + Number(multipliedBet));
        setCashedOut(true);
        setIsPlaying(false);
        fetch('/api/cash-out');
    }

    // Updates the selection content
    useEffect(() => {
        if (selection === 'stats') {
            setSelectionContent(<>
                <h2>Stats:</h2>
            </>)
        } else if (selection === 'chat') {
            setSelectionContent(<>
                <h2>Chat:</h2>
            </>)
        } else if (selection === 'vc') {
            setSelectionContent(<>
                <h2>Voice Chat:</h2>
            </>)
        }
    }, [selection]);

    //Actual Page
    return (
        <div id='game'>
            {/* Header */}
            <header>
                <div id='left'>
                    <img id='logo' alt='logo' src={Logo} />
                </div>
                <div id='right'>
                    <p>Donated to Saving the Earth: $0</p>
                    <p>Balance: ${balance.toFixed(2)}</p>
                </div>
            </header>
            {/* Left */}            <div id='game-left'>
                <div id='visuals'>
                    {status.status === 'waiting' ? <>
                        <h2>Game starting in {status.info} seconds.</h2>
                    </> : null}
                    {status.status === 'playing' ? <>
                        <img src={Rocket} alt='Rocket Launch' />
                    </> : null}
                    {status.status === 'crashed' ? <>
                        <img src={Explosion} alt='Rocket Launch' />
                    </> : null}
                </div>
                <div id='multiplier'>
                    {status.status === 'waiting' ? <>
                        <h1>1.00x</h1>
                    </> : null}
                    {status.status === 'playing' ? <>
                        <h1>{status.info}x</h1>
                    </> : null}
                    {status.status === 'crashed' ? <>
                        <h1 style={{color:'rgb(199, 69, 69)'}}>Busted at {status.info}x</h1>
                    </> : null}
                </div>
            </div>
            {/* Right */}      
            <div id='game-right'>
                <div id='betting'>
                    {/* Bar */}      
                    <div id='bar'>
                        {status.status === 'waiting' ? <>
                            <input placeholder='Enter Bet' value={bet ? `$ ${bet}` : ''} onKeyDown={e => {
                                if (bet.length < 8) {
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
                        <p>{profit>=0 ? `+ $${profit.toFixed(2)}` : `- $${(-profit).toFixed(2)}`}</p>
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
                </div>

                {/* Etc */}
                <div id='etc'>
                    <div id='selection'>
                        <h2 onClick={e => setSelection('stats')} >Stats</h2>
                        <h2 onClick={e => setSelection('chat')} >Chat</h2>
                        <h2 onClick={e => setSelection('vc')} >Voice Chat</h2>
                    </div>
                    <div id='etc-main'>
                        {selectionContent}
                    </div>
                </div>
            </div>
        </div>
    )
}
