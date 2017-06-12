import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import currentLogo from './images/current-logo.png';
import solPhoto from './images/soledad_munoz.jpg';
import bgProcessing from './processing/background.pde'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let viewPath = this.props.location.pathname.substr(1);
    this.state = {
      inIntro: this.props.location.pathname === "/" ? true : false,
      view: viewPath === "" ? "Home" : viewPath.charAt(0).toUpperCase() + viewPath.slice(1)
    };
    this.toggleIntro = this.toggleIntro.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.bringHome = this.bringHome.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let viewPath = nextProps.location.pathname.substr(1);
    this.setState({view: viewPath === "" ? "Home" : viewPath.charAt(0).toUpperCase() + viewPath.slice(1)});
  }
  toggleIntro() {
    this.setState({
      inIntro: false
    });
  }
  toggleView(value) {
    this.setState({view: value, inIntro: false});
  }
  bringHome() {
    this.setState({view: "Home"})
  }
  render() {
    const availableViews = ['About', 'Artists', 'Organizers', 'Collaborators', 'Workshops', 'Panels', 'Contact'];
    const viewButtons = availableViews.map((view, index) => <ViewButton key={index} view={view} currentView={this.state.view} toggleView={this.toggleView}/>);
    return (
      <Router>
        <div className="app">
          <div className={this.state.inIntro === true ? "app-intro": "app-intro fade-out"} onClick={this.toggleIntro} >
            <img src={currentLogo} className="app-logo intro" alt="logo" />
            <canvas className="processing-intro" data-processing-sources={bgProcessing} />
          </div>
          <div className={this.state.inIntro === true ? "app-main" : "app-main fade-in"}>
            <div className="app-header">
              <Link to="/">
                <img src={currentLogo} onClick={this.bringHome} className="app-logo main" alt="logo" />
              </Link>
              <div className="button-container">{viewButtons}</div>
            </div>
            <div className="content-container">
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/artists" component={Artists}/>
              <Route exact path="/organizers" component={Organizers}/>
              <Route exact path="/collaborators" component={Collaborators}/>
              <Route exact path="/workshops" component={Workshops}/>
              <Route exact path="/panels" component={Panels}/>
              <Route exact path="/contact" component={Contact}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

// Widgets
class ViewButton extends Component {
  constructor(props) {
    super(props);
    this.state = {active: this.props.currentView === this.props.view ? true : false};
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({active: nextProps.currentView === this.props.view ? true : false});
  }
  handleClick() {
    this.props.toggleView(this.props.view)
  }
  render() {
    return (
      <Link to={'/' + this.props.view.toLowerCase()} className='view-link'>
        <div className={this.state.active ? "view-button active-button" : "view-button"} onClick={this.handleClick}>
          {this.props.view}
        </div>
      </Link>
    );
  }
}

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _gotcha: "",
      email: "",
      name: "",
      _subject: "",
      message: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  clearState() {
    this.setState({
      _gotcha: "",
      email: "",
      name: "",
      _subject: "",
      message: ""
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = {};
    for (var key in this.state) {
      if (this.state[key] !== "") {
        formData[key] = this.state[key];
      }
    }
    formData["_format"] = "plain";

    // TODO fix this so that it sends email fields in appropriate order
    // let keys = Object.keys(this.state);
    // keys.forEach(function(key) {
    //   if (this.state[key] !== "") {
    //     formData[key] = this.state[key];
    //   }
    // });
    fetch(`https://formspree.io/mattasaminew@gmail.com`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }})
    .then( response => response.json() )
    .then( json => console.log(json) )
    .catch( error => console.log(error) );
    this.clearState();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Your name" value={this.state.name} onChange={this.handleInputChange} /><br/>
        <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleInputChange} /><br/>
        <input type="text" name="_subject" placeholder="Your subject" value={this.state._subject} onChange={this.handleInputChange} /><br/>
        <textarea name="message" placeholder="Your message" value={this.state.message} onChange={this.handleInputChange} /><br/>
        <input type="text" name="_gotcha" value={this.state._gotcha} onChange={this.handleInputChange} style={{display: "none"}} />
        <input type="hidden" name="_format" value="plain" onChange={this.handleInputChange} />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

// views
class Home extends Component {
  render() {
    return (
      <h1>Home</h1>
    );
  }
}
class About extends Component {
  render() {
    return (
      <div>
      <h1>About</h1>
        <p>CURRENT is a multidisciplinary, intersectional, music and electronic art festival working with female identified and non-binary artists in Vancouver and the Pacific Northwest. This 3-day, multi-venue, music and arts showcase featuring events, panels, youth mentorships, and workshops will take place July 28-30, 2017. We are offering public, free and all ages panels and workshops. Panels include: “Event Planning: Mobilizing Femme Artists and better Allyship” and “Intergenerational Knowledge Sharing in the Electronic Arts”. Workshops include “Intro to Modular Synthesis with Women’s Beat League” and “Intersessions: DJ Workshop”. These workshops and panels will be broadcasted live and made available online.</p>
        <p>A key focus of the project is to cultivate growth within the local community through building cross border relations, allowing young local artists to connect with music collectives and artists from outside of Canada with the intention of increasing global opportunities for local artists. In order to achieve this, on top of our focus on artists within the Vancouver community including a strong presence from Vancouver based collective Genero and local DJ education facilitators “Intersessions”, we intend to involve some artists and educators from two femme/non-binary artist collectives outside of Vancouver: “TUF” a Seattle collective with a strong multidisciplinary focus within the digital realms and “Women’s Beat League” in Portland who actively facilitates education and performance with a focus on Modular Synthesis. Although the focus of the project is on showcasing and creating opportunities for Vancouver artists we feel that it is important and enriching for those local artists to connect and learn from artists both from and outside of their local community.</p>
        <p>To assist with our commitment to encourage youth involvement in the events,  part of our strategy focuses around working with Facilitators at SFU, Emily Carr, UBC and Nimbus to promote student participation within the events through both workshops and volunteer opportunities.</p>
      </div>
    );
  }
}
class Artists extends Component {
  render() {
    return (
      <div>
        <h1>Artists</h1>
        <img src={solPhoto} className="artist-photo" alt="artist" />
      </div>
    );
  }
}
class Organizers extends Component {
  render() {
    return (
      <h1>Organizers</h1>
    );
  }
}
class Collaborators extends Component {
  render() {
    return (
      <h1>Collaborators</h1>
    );
  }
}
class Workshops extends Component {
  render() {
    return (
      <div>
        <h1>Workshops</h1>
        <ul>
          <li>Intersessions: DJ workshop for femme-identified and non-binary people (all ages)</li>
          <li>Intro to Modular Synthesis with Women’s Beat League (all ages)**</li>
          <li>Intro to Synth Building in Arduino with Kiran Bhumber (all ages)</li>
          <li>Intro to Live-Coding and Algoraves with Norah Norway (all ages)</li>
        </ul>
      </div>
    );
  }
}
class Panels extends Component {
  render() {
    return (
      <h1>Panels</h1>
    );
  }
}
class Contact extends Component {
  render() {
    return (
      <EmailForm />
    );
  }
}

export default App;
