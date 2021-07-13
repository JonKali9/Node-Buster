import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styling/General.css';

// Import Pages
import Home from './pages/Home';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
