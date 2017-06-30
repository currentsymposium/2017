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
  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      setTimeout(() => {
        this.props.offSuccess();
      }, 1500)
    }
    if (nextProps.fail) {
      setTimeout(() => {
        this.props.offFail();
      }, 1500)
    }
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
    keys.forEach((key) => {
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
      headers: {'Content-Type': 'application/json'}
    })
    .then( response => response.json() )
    .then( json => {
      this.clearState();
      if (json.hasOwnProperty('success')) {
        this.props.onSuccess();
      } else {
        this.props.onFail();
      }
    })
    .catch( error => {
      console.log(error);
      this.clearState();
      this.props.onFail();
    });
  }
  render() {
    return (
      <form className="email-form" onSubmit={this.handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange} />
        <input className="form-input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
        <input className="form-input" type="text" name="_subject" placeholder="Subject" value={this.state._subject} onChange={this.handleInputChange} />
        <textarea className="form-text" name="message" placeholder="Message" value={this.state.message} onChange={this.handleInputChange} />
        <input type="text" name="_gotcha" value={this.state._gotcha} onChange={this.handleInputChange} style={{display: "none"}} />
        <input type="hidden" name="_format" value="plain" onChange={this.handleInputChange} />
        <input className="form-button" type="submit" value="Send" />
      </form>
    );
  }
}

export {ViewButton, DropdownMenu, EmailForm}
