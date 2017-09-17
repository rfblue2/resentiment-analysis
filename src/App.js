import React, { Component } from 'react'
import './App.css';
import Feed from './feed/Feed'
import ArticleRepo from './ArticleRepo'

class App extends Component {
  render() {
    const repo = new ArticleRepo();
    return (
      <div className="App">
        <div className="App-header">
          <h2>News Sentiment Analysis</h2>
        </div>
        <div className="container">
          <h2>Welcome</h2>
          <input type="text" className="input" placeholder="Enter an article URL..." />
          <Feed articles={repo.getArticleNames()} />
        </div>
      </div>
    );
  }
}

export default App;
