import React, { Component } from 'react'
import Chart from '../Chart'
import PulseLoader from 'halogen/PulseLoader';

import './Profile.css'

// profile of a person (e.g. name, img, sentiment)
// props should contain a person
class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="personProfile">
        {this.props.isLoading
            ? <PulseLoader color="gray" size="20px" margin="10px" />
            : this.props.person
                ? <div>
                    <img className="personImg" src={this.props.person.img} alt={this.props.person.name}/>
                    <div className="personName">{this.props.person.name}</div>
                    <div className="personChart">
                      <Chart data={this.props.person.sentiment} ref={(e) => { this.personChart = e; }} />
                    </div>
                  </div>
                : this.props.notFound
                    ? <div className="personError">Couldn't find that person. Try again?</div>
                    : <div />}
      </div>
    )
  }
}

export default Profile;