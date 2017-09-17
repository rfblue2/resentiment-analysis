import React, { Component } from 'react'
import './App.css';
import Feed from './feed/Feed'
import ArticleRepo from './ArticleRepo'

class App extends Component {
  onSubmit(e) {
    e.preventDefault();
    console.log(e.target.url.value);
  }

  render() {
    const repo = new ArticleRepo();
    return (
      <div className="App">
        <div className="App-header">
          <h2>News Sentiment Analysis</h2>
        </div>
        <div className="container">
          <h2>Welcome</h2>
          <form onSubmit={this.onSubmit.bind(this)} >
            <input type="text" className="input" name="url" placeholder="Enter an article URL..." />
          </form>
          <Feed articles={repo.getArticleNames()} />
        </div>
      </div>
    );
  }
}

export default App;
