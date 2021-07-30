import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styling/General.css';
import './styling/Navbar.css';
import './styling/Footer.css';

// Import Pages
import Game from './game/Game';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import OurMission from './pages/Our-Mission';
import ContactUs from "./pages/Contact-Us";
import Timeline from './pages/Timeline';
import Play from './pages/Play'
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/game' component={Game} />
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/our-mission' component={OurMission} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path='/play' component={Play} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
