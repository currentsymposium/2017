import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
// Widgets
class ViewButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.currentView === this.props.view ? true : false,
      hover: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    if (!this.props.childOfDrop) {
      this.clearDrop = this.clearDrop.bind(this);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.currentView === this.props.view ? true : false
    });
    if (nextProps.currentView === this.props.view && nextProps.currentView === "About") {
      this.setState({hover: false});
    }
  }
  handleClick() {
    this.props.toggleView(this.props.view);
  }
  clearDrop() {
    this.setState({hover: false});
  }
  onMouseEnter() {
    this.setState({hover: true});
  }
  onMouseLeave() {
    this.setState({hover: false});
  }
  render() {
    const dropdown = this.props.dropdown && this.props.dropdownViews ? <DropdownMenu hover={this.state.hover} dropdownViews={this.props.dropdownViews} clearDrop={this.clearDrop}/> : null
    return (
      <div className="view-button-container" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <Link to={'/' + this.props.view.replace(/\s/g,'').toLowerCase()} className='view-link'>
          <div className={this.state.active ? "view-button active-button" : "view-button"} onClick={this.handleClick} >
            {this.props.view.toUpperCase()}
          </div>
        </Link>
        {dropdown}
      </div>
    );
  }
}

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }
  componentWillReceiveProps(nextProps) {
    this.setState({active: nextProps.hover});
  }
  render() {
    return (
      <div className={this.state.active ? "dropdown active" : "dropdown"} onClick={this.props.clearDrop}>
        {this.props.dropdownViews}
      </div>
    );
  }
}

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _gotcha: "",
      _format: "plain",
      email: "",
      name: "",
      _subject: "",
      message: "",
      volunteer: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }
  clearState() {
    this.setState({
      _gotcha: "",
      _format: "plain",
      name: "",
      email: "",
      _subject: "",
      message: "",
      volunteer: false
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  emailFormSorter(data) {
    var formData = {}
    const keys = ["_gotcha", "_format", "name", "email", "_subject", "message", "volunteer"];
    keys.forEach(function(key) {
      if (data[key] !== "") {
        formData[key] = data[key];
      }
    });
    return formData
  }
  handleSubmit(event) {
    event.preventDefault();
    let formData = this.emailFormSorter(this.state)

    fetch(`https://formspree.io/currentsymposium@gmail.com`, {
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
    // TODO Add a "I want to volunteer" field to form
    return (
      <form className="email-form" onSubmit={this.handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder="Your name" value={this.state.name} onChange={this.handleInputChange} />
        <input className="form-input" type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleInputChange} />
        <input className="form-input" type="text" name="_subject" placeholder="Your subject" value={this.state._subject} onChange={this.handleInputChange} />
        <textarea className="form-text" name="message" placeholder="Your message" value={this.state.message} onChange={this.handleInputChange} />
        <label className="volunteer-label"><input className="form-check" type="checkbox" name="volunteer" checked={this.state.volunteer} onChange={this.handleInputChange}/><span>&nbsp;I would like to volunteer for CURRENT</span></label>
        <input type="text" name="_gotcha" value={this.state._gotcha} onChange={this.handleInputChange} style={{display: "none"}} />
        <input type="hidden" name="_format" value="plain" onChange={this.handleInputChange} />
        <input className="form-button" type="submit" value="Send" />
      </form>
    );
  }
}

export {ViewButton, DropdownMenu, EmailForm}
