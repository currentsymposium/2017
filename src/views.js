import React, { Component } from 'react';
import {EmailForm} from './components.js'
import organizerData from './json/organizers.json'
import partnerData from './json/partners.json'
import workshopData from './json/workshops.json'

// 1
class Home extends Component {
  render() {
    return (
      <h1>Home</h1>
    );
  }
}

// 2
class About extends Component {
  render() {
    return (
      <div>
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
  render() {
    if (this.props.overview) {
      return (
        <div>
          CURRENT is a multidisciplinary, intersectional, music and electronic art symposium working with female identified and non-binary artists in Vancouver and the Pacific Northwest. The first iteration of the project will be a 3-day, music and arts showcase featuring events, panels, youth mentorships, and workshops, which will take place July 28th-30th 2017 in Vancouver, Canada. The goals of this symposium are to foster and disseminate Feminist Electronic Art histories and artists, the teaching of skill sets, cross-pollination of ideas between diverse geographies, and intergenerational knowledge sharing. By offering public, free, all ages, panels and workshops, we wish to cultivate growth within the local community, and create a more equal landscape within the growing Electronic Arts ecology.
        </div>
      );
    } else {
      return (
        <div className="about-container">
          <div className="about-child">
            CURRENT is a multidisciplinary, intersectional, music and electronic art symposium working with female identified and non-binary artists in Vancouver and the Pacific Northwest. The first iteration of the project will be a 3-day, music and arts showcase featuring events, panels, youth mentorships, and workshops, which will take place July 28th-30th 2017 in Vancouver, Canada. The goals of this symposium are to foster and disseminate Feminist Electronic Art histories and artists, the teaching of skill sets, cross-pollination of ideas between diverse geographies, and intergenerational knowledge sharing. By offering public, free, all ages, panels and workshops, we wish to cultivate growth within the local community, and create a more equal landscape within the growing Electronic Arts ecology.
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
      <div>{organizerSpecs}</div>
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
      <div>
        {partnerSpecs}
      </div>
    );
  }
}

// 6
class Artists extends Component {
  render() {
    return (
      <div>
        <h1>Artists</h1>
      </div>
    );
  }
}

// 7
class Volunteers extends Component {
  render() {
    return (
      <h1>Volunteers</h1>
    );
  }
}

// 8
class PanelsWorkshops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: workshopData
    }
  }
  render() {
    const workshops = this.state.data.workshops.map((workshop, index) =>
      <div key={index}>
        <h2>{workshop.name}</h2>
        <h3>{workshop.hosts.length === 0 ? "TBA" : workshop.hosts.join(', ')}</h3>
        {workshop.description.map((para, index) => <p>{para}</p>)}
      </div>
    );
    const panels = this.state.data.panels.map((panel, index) =>
      <div key={index}>
        <h2>{panel.name}</h2>
        <h3>{panel.hosts.length === 0 ? "TBA" : panel.hosts.join(', ')}</h3>
        {panel.description.map((para, index) => <p key={index}>{para}</p>)}
      </div>
    );
    return (
      <div className="panels-workshops-container">
        <div className="panel-workshop-child">
          <h1 className="panel-workshop-header">Workshops</h1>
          {workshops}
        </div>
        <div className="panel-workshop-child">
          <h1 className="panel-workshop-header">Panels</h1>
          {panels}
        </div>
      </div>
    );
  }
}

// 9
class Contact extends Component {
  render() {
    return (
      <EmailForm />
    );
  }
}

// export
export {Home, About, Current, Organizers, Partners, Artists, Volunteers, PanelsWorkshops, Contact}
