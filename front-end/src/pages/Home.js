import React, {useState} from 'react';
import '../styling/Home.css'
import Logo from '../images/logo.png';

export default function Home() {
    const [email, setEmail] = useState('');
    const addEmail = e => {
        if (email.includes('@')) alert('Added to mailing list!')
        else {
            alert('Invalid email!')
            e.preventDefault();
        }
    }

    return (
        <div id='home'>
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <content>
                <div className='section-container'>
                    <div className='section'>
                        <h3>What is Node Buster?</h3>
                        <p>Node Buster is the web’s newest Crash Game. We are an online gambling platform accepting cryptocurrency and running our own Crash Games. We are fairly new and are currently trying to establish a user base and welcome new players.</p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>How does it work?</h3>
                        <p>Simply place a bet and watch it multiply by the second. You may cash out your winnings whenever you want, but beware you could lose it all in a heartbeat if the game goes bust.</p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>History of Node Buster</h3>
                        <p>Founded in 2021 by its founder, JonKali9. Node Buster did not have the funds which other sites had the pleasure of starting with. As the founder created the prototype and began the site with a mere $1,000.</p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>How can I join?</h3>
                        <p>In order to make sure that our user base remains manageable, and in order to make sure that we can sufficiently listen to each one of them, Node Buster has decided to adopt an invite only policy. Each month we will be allowing a select number of individuals to join the site and no more. So keep your eyes open and we hope to see you soon.</p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Node Busters mission</h3>
                        <p>As a company, Node Buster stands for three things. Privacy online, the decentralized web (web3) as well as investing in reusable energy. We stand for these three things and hope that Node Buster reflects that.</p>
                    </div>
                </div>

                <form onSubmit={addEmail} id='mailing'>
                    <h2>Interested in Joining?</h2>
                    <p>Join our mailing list!</p>
                    <input placeholder='Enter Email' onChange={e => setEmail(e.target.value)} /> <br />
                    <button>Submit</button>
                </form>
            </content>
        </div>
    )
}
