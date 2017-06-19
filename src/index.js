import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import registerServiceWorker from './tasks/registerServiceWorker';
import './css/index.css';
import 'processing-js'

class Index extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App} />
      </Router>
    );
  }
}



ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
