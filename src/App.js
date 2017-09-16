import React, { Component } from 'react'
import './App.css';
import Feed from './feed/Feed';

class App extends Component {

  render() {
    const mockArticles = [
      {
        id: 1,
        title: "test article",
        source: "test source",
        img: "http://via.placeholder.com/100x150",
        gender: "m"
      },
      {
        id: 2,
        title: "test article 2",
        source: "test source2",
        img: "http://via.placeholder.com/200x200",
        gender: "f"
      },
      {
        id: 3,
        title: "test article 3",
        source: "test source2",
        img: "http://via.placeholder.com/200x250",
        gender: "f"
      },
      {
        id: 4,
        title: "test article 4",
        source: "test source2",
        img: "http://via.placeholder.com/300x200",
        gender: "m"
      }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <h2>News Sentiment Analysis</h2>
        </div>
        <p className="App-intro">
          <Feed articles={mockArticles} />
        </p>
      </div>
    );
  }
}

export default App;
