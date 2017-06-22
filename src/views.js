import React, { Component } from 'react';
import {EmailForm} from './components.js'
import aboutData from './json/about.json'
import organizerData from './json/organizers.json'
import partnerData from './json/partners.json'
import workshopData from './json/workshops.json'
import participantData from './json/participants.json'

// 1
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {linkHover: false};
    this.onLinkHover = this.onLinkHover.bind(this);
    this.offLinkHover = this.offLinkHover.bind(this);
  }
  onLinkHover() {
    this.setState({linkHover: true});
  }
  offLinkHover() {
    this.setState({linkHover: false});

  }
  render() {
    return (
      <div className="home-container">
        <div className="home-poster-container" onMouseEnter={this.onLinkHover} onMouseLeave={this.offLinkHover}>
          <img className="home-poster" src="https://s3.ca-central-1.amazonaws.com/current-symposium/background.png" alt="poster" />
        </div>
      </div>
    );
  }
}

// 2
class About extends Component {
  render() {
    return (
      <div className="about-container">
        <Current overview={true}/>
        <h2>Organizers</h2>
        <Organizers />
        <h2>Partners</h2>
        <Partners overview={true}/>
      </div>
    );
  }
}

// 3
class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: aboutData
    };
  }
  render() {
    if (this.props.overview) {
      return (
        <div>
          {this.state.data[0]}
        </div>
      );
    } else {
      return (
        <div className="current-container">
          <div className="current-child">
            {this.state.data[0]}
          </div>
        </div>
      );
    }
  }
}

// 4
class Organizers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: organizerData
    };
  }
  render() {
    const organizerSpecs = this.state.data.map((organizer, index) =>
      <div key={index} className="organizer-spec">
        <img src={organizer.photo_url} className="organizer-photo" alt="organizers"/>
        <div className="organizer-description">
          <span className="organizer-name">{organizer.name}</span> {organizer.description}
        </div>
      </div>
    );
    return (
      <div className="organizer-container">
        {organizerSpecs}
      </div>
    );
  }
}

// 5
class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: partnerData
    };
  }
  render() {
    const partnerSpecs = this.state.data.map((partner, index) =>
      <div key={index} className="partner-spec">
        <img src={partner.logo_url} className="partner-logo" alt="partner logo"/>
        <div className="partner-description">
          <span className="partner-name">{partner.name}</span> {partner.description}
        </div>
      </div>
    );
    return (
      <div className="partner-container">
        {partnerSpecs}
      </div>
    );
  }
}

// 6
class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: participantData
    };
  }
  render() {
    const participantSpecs = this.state.data.map((participant, index) =>
      <div key={index} className="participant-spec">
        <h2>{participant.name}</h2>
      </div>
    );
    return (
      <div className="participant-container">
        {participantSpecs}
      </div>
    );
  }
}

// 7
class PanelsWorkshops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: workshopData
    }
  }
  render() {
    const workshops = this.state.data.workshops.map((workshop, index) =>
      <div key={index} className="workshop-spec">
        <h2>{workshop.name}</h2>
        <h3>{workshop.date}</h3>
        <div className='panel-description'>
          {workshop.description.map((para, index) => <p key={index}>{para}</p>)}
        </div>
      </div>
    );
    const panels = this.state.data.panels.map((panel, index) =>
      <div key={index} className="panel-spec">
        <h2>{panel.name}</h2>
        <h3>{panel.date}</h3>
        <div className='panel-description'>
        {panel.description.map((para, index) => <p key={index}>{para}</p>)}
        </div>
      </div>
    );
    return (
      <div className="panels-workshops-container">
        <div className="panel-child">
          <h1 className="panel-header">Panels</h1>
          <div className="panel-spec-container">
            {panels}
          </div>
        </div>
        <div className="workshop-child">
          <h1 className="workshop-header">Workshops</h1>
          <div className="workshop-spec-container">
            {workshops}
          </div>
        </div>
      </div>
    );
  }
}

// 8
class Contact extends Component {
  render() {
    return (
      <div className="contact-container">
        <EmailForm />
      </div>
    );
  }
}

// export
export {Home, About, Current, Organizers, Partners, Participants, PanelsWorkshops, Contact}
