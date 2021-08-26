import React, {useState, useEffect} from 'react';
import './Admin.css';
import { useCookies } from "react-cookie";
import Logo from '../images/logo';
import Pfp from '../images/pfp';

export default function Admin() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isAdmin, setIsAdmin] = useState(false);
    const [selected, setSelected] = useState('');

    const [users, setUsers] = useState({});
    const [userSearch, setUserSearch] = useState('');
    const [invites, setInvites] = useState({});
    const [inviteKey, setInviteKey] = useState('');
    const [maxInvites, setMaxInvites] = useState('');
    const [games, setGames] = useState({})
    const [emailTitle, setEmailTitle] = useState('');
    const [emailContent, setEmailContent] = useState('');

    const sendEmail = (title, content) => {
        fetch('/api/mail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: emailTitle,
                content: emailContent
            })
        })
        .then(res => {
            if (res.ok) alert('Sent Emails!');
            else alert('Error sending Emails!');
        })
    }

    // Send request to server to see if user is admin
    useEffect(() => {
        // Check if User is Admin
        fetch('/api/user/isAdmin')
        .then(res => {
            if (res.ok) setIsAdmin(true)
        })
    }, [])

    useEffect(() => {
        if (isAdmin) {
            // Grab all user info
            fetch('/api/users')
            .then(resp => resp.json())
            .then(resp => {
                setUsers(resp);
            })
            // Grab all Invites
            fetch('/api/invites')
            .then(resp => resp.json())
            .then(resp => {
                setInvites(resp);
            })
            // Grab all Games
            fetch('/api/games')
            .then(resp => resp.json())
            .then(resp => {
                setGames(resp);
            })
        }
    }, [isAdmin, selected])

    return (
        <div id='admin'>
            <header>
                <img src={Logo} />
            </header>
            {isAdmin ? <div id='admin-body'>
                <div id='left'>
                    <button onClick={() => setSelected('invites')}>Invite Keys</button>
                    <button onClick={() => setSelected('users')}>Users</button>
                    <button onClick={() => setSelected('games')}>Games</button>
                    <button onClick={() => setSelected('emails')}>Emails</button>
                </div>

                <div id='right'>
                    {/*Invite Keys*/}
                    {selected === 'invites' ? <div id='invites'>
                        <h2>Invite Keys:</h2>
                        <div id='new-key'>
                            <input onChange={e => setInviteKey(e.target.value)} placeholder='Invite Key' />
                            <input onChange={e => setMaxInvites(e.target.value)} placeholder='Invites' type='number' />
                            <button onClick={() => {
                                fetch('/api/invites', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        key: inviteKey,
                                        maxUses: maxInvites
                                    })
                                })
                            }}>Add Key</button>
                        </div>
                        <div id='keys'>
                            {
                                invites.map(invite => {
                                    console.log(invite);
                                    return (
                                    <div className='key'>
                                        <h3>https://nodebuster.com/register/{invite.invite}</h3>
                                        <p>Invite Code: {invite.invite}</p>
                                        <p>Uses: {invite.uses}/{invite.maxUses}</p>
                                    </div>)
                                })
                            }
                        </div>
                    </div> : null}

                    {/*Users*/}
                    {selected === 'users' ? <div id='users'>
                        <h2>Users:</h2>
                        <input onChange={e => setUserSearch(e.target.value)} placeholder='Search for User' />
                        <div id='users-container'>
                            {
                                userSearch ? 
                                users.filter(user => user.username.includes(userSearch)).map(user => {
                                    return (
                                    <div className='user'>
                                        <img src={Pfp} />
                                        <h3>{user.username}</h3>
                                        <p>{user.email}</p>
                                        <p>Balance: ${user.balance}</p>
                                        <p>Last Played: {user.lastPlayed}</p>
                                    </div>)
                                }) : 
                                users.map(user => {
                                    return (
                                    <div className='user'>
                                        <img src={Pfp} />
                                        <h3>{user.username}</h3>
                                        <p>{user.email}</p>
                                        <p>Balance: ${user.balance}</p>
                                        <p>Last Played: {user.lastPlayed}</p>
                                    </div>)
                                })
                            }
                        </div>
                    </div> : null}

                    {/*Games*/}
                    {selected === 'games' ? <div id='games'>
                        <h2>Games:</h2>
                        <div id='games-container'>
                            {
                                games.map(game => (
                                <div className='game'>
                                    <h3>Game #{game.id}</h3>
                                    <p>Busted At: {game.bustedAt}x</p>
                                    <p>Participated: {game.players} users</p>
                                    <p>Total Bet: ${game.totalBets}</p>
                                    <p>Total Earned: ${game.playerProfit}</p>
                                    <p id='profit'>Game Profit: ${game.gameProfit}</p>
                                </div>))
                            }
                        </div>
                    </div> : null}

                    {/*Emails*/}
                    {selected === 'emails' ? <div id='emails'>
                        <h2>Emails:</h2>
                        <input onChange={e => setEmailTitle(e.target.value)} placeholder='Title' />
                        <textarea onChange={e => setEmailContent(e.target.value)} placeholder='Content of Email' />
                        <button onClick={sendEmail}>Send Email</button>
                    </div> : null}
                </div>

            </div> : <div id='user-body'>
                <h1>401:</h1>
                <p>Unauthorized!</p>
            </div>}
        </div>
    )
}
