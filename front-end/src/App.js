import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styling/General.css';
import './styling/Navbar.css';
import './styling/Footer.css';

// Import Pages
import Game from './game/Game';
import Home from './pages/Home';
import Admin from './game/Admin';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/User';
import OurMission from './pages/Our-Mission';
import ContactUs from "./pages/Contact-Us";
import Play from './pages/Play'
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/demo' component={Game} />
          <Route exact path='/' component={Home} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/:invite' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/user/:username' component={User} />
          <Route exact path='/our-mission' component={OurMission} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/play' component={Play} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
