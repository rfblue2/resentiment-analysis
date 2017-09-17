import React, { Component } from 'react'
import Chart from '../Chart'

import './Profile.css'

// profile of a person (e.g. name, img, sentiment)
// props should contain a person
class Profile extends Component {
  render() {
    return (
      <div className="personProfile">
        <img className="personImg" src={this.props.person.img} alt={this.props.person.name}/>
        <div className="personName">{this.props.person.name}</div>
        <div className="personChart">
          <Chart data={this.props.person.sentiment} ref={(e) => { this.personChart = e; }} />
        </div>
      </div>
    )
  }
}

export default Profile;