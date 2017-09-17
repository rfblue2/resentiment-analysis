import React, { Component } from 'react'
import './App.css';
import Profile from './people/Profile'
import PersonRepo from './repo/PersonRepo'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: "Casey",
      name2: "Alex",
    }
  }

  onSubmit1(e) {
    e.preventDefault();
    console.log(e.target.url.value);
    this.setState({
      name1: e.target.url.value
    })
  }

  onSubmit2(e) {
    e.preventDefault();
    console.log(e.target.url.value);
    this.setState({
      name2: e.target.url.value
    })
  }

  render() {
    const repo = new PersonRepo();
    return (
      <div className="App">
        <div className="App-header">
          <h2>News Sentiment Analysis</h2>
        </div>
        <div className="container">
          <h2>Welcome</h2>

          <div className="profileColumns">
            <div className="profileColumn">
              <form onSubmit={this.onSubmit1.bind(this)} >
                <input type="text" className="input" name="url" placeholder="Enter a person's name..." />
              </form>
              <Profile person={repo.getProfile(this.state.name1)} />
            </div>

            <div className="profileColumn">
              <form onSubmit={this.onSubmit2.bind(this)} >
                <input type="text" className="input" name="url" placeholder="Enter a person's name..." />
              </form>
              <Profile person={repo.getProfile(this.state.name2)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
