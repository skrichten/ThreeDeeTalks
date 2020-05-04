import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import routes from './routes';
import ScrollToTop from './components/ScrollToTop';
import MainNav from './components/MainNav';


function App() {
  return (
    <Router>
      <ScrollToTop />
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
