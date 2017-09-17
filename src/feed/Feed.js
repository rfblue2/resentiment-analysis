import React, { Component } from 'react'
import './Feed.css'
import PulseLoader from 'halogen/PulseLoader';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  // Construct a single feed column
  render() {
    return (
      <div className="feedView">
        <h3>Feed</h3>
        <ul>
          {this.props.items}
        </ul>
        {this.props.isLoading && <PulseLoader color="gray" size="20px" margin="10px" />}
      </div>
    );
  }
}

export default Feed;
