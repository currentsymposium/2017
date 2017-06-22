import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import bgProcessing from './processing/bg.pde'
import './css/App.css';
import { Home, About, Current, Organizers, Partners, Participants, PanelsWorkshops, Contact } from './views.js';
import {ViewButton} from './components.js'

class App extends Component {
  constructor(props) {
    super(props);
    let path = this.props.location.pathname;
    const viewState = this.routeViewParser(path);
    this.state = {
      inIntro: this.props.location.pathname === "/" ? true : false,
      view: viewState
    };
    this.toggleIntro = this.toggleIntro.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.bringHome = this.bringHome.bind(this);
  }
  routeViewParser(routePath) {
    let viewPath = routePath.substr(1);
    if (viewPath === "") {
      return "Home"
    } else if (viewPath === "panels+workshops") {
      return "Panels + Workshops"
    } else {
      return viewPath.charAt(0).toUpperCase() + viewPath.slice(1)
    }
  }
  componentWillReceiveProps(nextProps) {
    let viewPath = nextProps.location.pathname.substr(1);
    this.setState({view: viewPath === "" ? "Home" : viewPath.charAt(0).toUpperCase() + viewPath.slice(1)});
  }
  toggleIntro(event) {
    event.preventDefault();
    this.setState({
      inIntro: false
    });
  }
  toggleView(value) {
    this.setState({view: value, inIntro: false});
  }
  dummyEvent() {

  }
  bringHome() {
    this.setState({view: "Home"})
  }
  render() {
    const availableViews = ['Participants', 'Panels + Workshops', 'Contact'];
    const viewButtons = availableViews.map((view, index) => <ViewButton key={index} view={view} currentView={this.state.view} toggleView={this.toggleView} dropdown={false}/>);
    const dropdownViews = ['Current', 'Organizers', 'Partners'].map((view, index) => <ViewButton key={index} view={view} currentView={this.state.view} toggleView={this.toggleView} dropdown={false} childOfDrop={true}/>)
    return (
      <Router>
        <div className="app">
          <div className={this.state.inIntro === true ? "app-intro": "app-intro fade-out"} onClick={this.toggleIntro} >
            <img src="https://s3.ca-central-1.amazonaws.com/current-symposium/current-logo.png" className="app-logo intro" alt="logo" />
          </div>
          <div className={this.state.inIntro === true ? "app-main" : "app-main fade-in"}>
            <div className="app-header" onClick={this.dummyEvent}>
              <Link to="/" className="logo-link">
                <img src="https://s3.ca-central-1.amazonaws.com/current-symposium/current-logo.png" onClick={this.bringHome} className="app-logo main" alt="logo" />
              </Link>
              <div className="button-container">
                <ViewButton view="About" currentView={this.state.view} toggleView={this.toggleView} dropdown={true} dropdownViews={dropdownViews}/>
                {viewButtons}
              </div>
            </div>
            <div className={this.state.view === "Home" ? "content-container remove-background" : "content-container"} onClick={this.dummyEvent} onScroll={this.simClick}>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/current" component={Current}/>
              <Route exact path="/organizers" component={Organizers}/>
              <Route exact path="/partners" component={Partners}/>
              <Route exact path="/participants" component={Participants}/>
              <Route exact path="/panels+workshops" component={PanelsWorkshops}/>
              <Route exact path="/contact" component={Contact}/>
            </div>
          </div>
          <canvas className="processing-bg" data-processing-sources={bgProcessing} />
        </div>
      </Router>
    );
  }
}

export default App;
