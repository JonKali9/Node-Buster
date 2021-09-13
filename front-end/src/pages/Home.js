import React, {useState} from 'react';
import '../styling/Home.css'
import Logo from '../images/logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Particle from '../components/Particle'

export default function Home() {
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
        <div id='home'>
            <Navbar />
            <Particle />
            <header>
                <img src={Logo} id='logo' alt='logo' />
            </header>

            <div id='content'>
                <div className='alert-container'>
                    <div className='alert'>
                        <h3>Demo Available!</h3>
                        <p>
                            We are proud to release a working demo for Node Buster! <br/>
                            We are allowing 100 lucky people to sign up and give the game a try,
                            simply use the invite code 'demo2021', and you will be able to become one of our first 100 members!
                            Let us know what you think, and we hope yo enjoy!<br />
                            <a style={{color: 'white', top: '.4rem', position: 'relative'}} target='_blank' href='https://nodebuster.com/register/demo2021' >Sign Up and Play here!</a>
                        </p>
                    </div>
                </div>
                <div className='alert-container'>
                    <div className='alert'>
                        <h3>Node Buster is Hiring!</h3>
                        <p>
                            We are looking for ambitious and dedicated people to join our cause! <br/>
                            We have multiple roles available, and are exciting to welcome our newest team member!<br/>
                            If you or anyone you know is interested, you may email us at nodebuster@gmail.com, or simply shoot us a DM via one of our socials,
                            We hope to hear from you!
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>Welcome to Node Buster!</h3>
                        <p>
                            Welcome to Node Buster! <br />
                            We are happy to welcome you to the web's newest crypto casino! <br/>
                            The fact that you have already come to learn of our platform, means that you are only
                            a few steps away from joining our platform, and becoming a part of the newest form of online gambling.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>What is Node Buster?</h3>
                        <p>
                            We are an online crypto casino, currently hosting the popular Crash Game!<br/>
                            If you are unfamiliar with the concept, it is a thrilling game full of risk and reward,
                            which has recently boomed in popularity. <br/> <br/>

                            The concept of the game is simple, place a bet, and watch it get multiplied by the second!
                            You are allowed to cash out whenever you wish and collect your earning, but be warned! The game can
                            crash at any moment, hustling you of your earnings!
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>A Note on Gambling Addiction</h3>
                        <p>
                            Here at Nodebuster, our #1 priority is to provide users with a fun and safe experience.
                            Which is why we have chosen here to address the problem of Gambling addiction, a big problem in the gambling community.
                            We wish to make clear we are not trying to cause any harm here, and encourage all users to not spend money which they can't afford to lose. <br />
                            <a style={{color: 'white', top: '.4rem', position: 'relative'}} target='_blank' href='https://www.smartrecovery.org/gambling-addiction/' >If you or anyone you know is suffering from gambling addiction, there are many resources which can help!</a> <br/> <br/>
                            Play, have fun, and be safe!
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>How do I play?</h3>
                        <p>
                            If you are interested in participating in one of our games, we have made the process of playing as easy as possible! <br/>
                            To deposit crypto into your Node Buster account, select the amount you wish to deposit, scan the QR code, 
                            and wait for the money to be deposited in your account. <br/>
                            *Unlike other casinos, any money you deposit or withdraw, will NOT be taxed.
                            You will be able to keep 100% of the money you place and win with us.
                        </p>
                    </div>
                </div>
                <div className='section-container'>
                    <div className='section'>
                        <h3>How do I join?</h3>
                        <p>
                            One of Node Buster's most unique features is its invite only system.  <br/>
                            Every week, we allow a select amount of users to join our site, using a special invite code!
                            These codes can be found on our instagram, twitter and discord! <br/>
                            The best way to join however, is to join our mailing list below, where we will keep you updated
                            with special events, upgrades to the site, as well as when we're allowing new members to join.
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
