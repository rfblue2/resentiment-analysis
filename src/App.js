import React, { Component } from 'react'
import './App.css';
import PersonRepo from './repo/PersonRepo'
import ProfileColumn from './ProfileColumn';

class App extends Component {
  constructor(props) {
    super(props);
    this.repo = new PersonRepo();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Resent(i)ment Analysis</h2>
        </div>
        <div className="container">
          <h2>Welcome</h2>

          <div className="profileColumns">
            <ProfileColumn repo={this.repo} />
            <ProfileColumn repo={this.repo} />
          </div>

        </div>
      </div>
    );
  }
}

export default App;
