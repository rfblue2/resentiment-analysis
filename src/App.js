import React, { Component } from 'react'
import './App.css';
import Feed from './feed/Feed';

class App extends Component {

  genRand(n) {
    return Array.apply(null, new Array(n)).map(function(item, index){
      return Math.floor(Math.random() * 100);
    });
  }

  render() {
    const mockArticles = [
      {
        id: 1,
        title: "test article",
        source: "test source",
        img: "http://via.placeholder.com/100x150",
        gender: "m",
        sentiment: this.genRand(24)
      },
      {
        id: 2,
        title: "test article 2",
        source: "test source2",
        img: "http://via.placeholder.com/200x200",
        gender: "f",
        sentiment: this.genRand(30)
      },
      {
        id: 3,
        title: "test article 3",
        source: "test source2",
        img: "http://via.placeholder.com/200x250",
        gender: "f",
        sentiment: this.genRand(34)
      },
      {
        id: 4,
        title: "test article 4",
        source: "test source2",
        img: "http://via.placeholder.com/300x200",
        gender: "m",
        sentiment: this.genRand(29)
      }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <h2>News Sentiment Analysis</h2>
        </div>
        <Feed articles={mockArticles} />
      </div>
    );
  }
}

export default App;
