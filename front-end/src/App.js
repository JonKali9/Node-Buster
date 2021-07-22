import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styling/General.css';
import './styling/Navbar.css';
import './styling/Footer.css';

// Import Pages
import Home from './pages/Home';
import OurMission from './pages/Our-Mission';
import Timeline from './pages/Timeline';
import Play from './pages/Play'
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/our-mission' component={OurMission} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path='/play' component={Play} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
