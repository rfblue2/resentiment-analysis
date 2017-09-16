import React, { Component } from 'react'
import ArticleTile from './ArticleTile'
import './Feed.css'

class Feed extends Component {
  // Construct a single feed column
  FeedView(articles, filter) {
    const newsTiles = articles
      .filter(filter)
      .map(a => <li key={a.id}><ArticleTile article={a}/></li>);
    return (
      <ul className="feedView">
        {newsTiles}
      </ul>
    );
  }

  render() {
    const maleFilter = a => a.gender === 'm';
    const femaleFilter = a => a.gender === 'f';
    return (
      <div className="feedContainer">
        <div id="feed1">
          {this.FeedView(this.props.articles, maleFilter)}
        </div>
        <div id="feed2">
          {this.FeedView(this.props.articles, femaleFilter)}
        </div>
      </div>
    );
  }
}

export default Feed