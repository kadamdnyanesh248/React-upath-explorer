import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import '../App.css';

import Dashboard  from '../components/Dashboard.js';

const WebLayout = () => (
  <div className="skin-blue fixed sidebar-mini">    
    <Route path="/"           exact strict component={ Dashboard } /> 
  </div>
);


function Routes() {
  return (
    <div>
      <Router>
        {/* <Header /> */}
        <div className="">
          <Switch>
            <Route path="/" component={ WebLayout } />
          </Switch>
        </div>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default Routes;