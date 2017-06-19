import React, { Component } from 'react';
import {EmailForm} from './components.js'
import solPhoto from './images/soledad_munoz.jpg';
import organizersData from './json/organizers.json'

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
        <Current />
        <Organizers />
        <Partners />
      </div>
    );
  }
}

// 3
class Current extends Component {
  render() {
    return (
      <div>
        CURRENT is a multidisciplinary, intersectional, music and electronic art symposium working with female identified and non-binary artists in Vancouver and the Pacific Northwest. The first iteration of the project will be a 3-day, music and arts showcase featuring events, panels, youth mentorships, and workshops, which will take place July 28th-30th 2017 in Vancouver, Canada. The goals of this symposium are to foster and disseminate Feminist Electronic Art histories and artists, the teaching of skill sets, cross-pollination of ideas between diverse geographies, and intergenerational knowledge sharing. By offering public, free, all ages, panels and workshops, we wish to cultivate growth within the local community, and create a more equal landscape within the growing Electronic Arts ecology.
      </div>
    );
  }
}

// 4
class Organizers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: organizersData
    };
  }
  render() {
    const organizerSpec = this.state.data.map((organizer, index) =>
      <div key={index}>
        {organizer.name}: {organizer.bio}
      </div>
    );
    return (
      <div>{organizerSpec}</div>
    );
  }
}

// 5
class Partners extends Component {
  render() {
    return (
      <h1>Partners</h1>
    );
  }
}

// 6
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
  render() {
    return (
      <div>
        <h1>Workshops</h1>
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
