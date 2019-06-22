import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import routes from './routes';
import MainNav from './components/MainNav';


function App() {
  return (
    <Router>
      <div className="App">
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </div>
      <MainNav />
    </Router>
  );
}

export default App;
