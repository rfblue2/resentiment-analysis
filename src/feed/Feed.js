import React, { Component } from 'react'
import ArticleTile from './ArticleTile'
import './Feed.css'

class Feed extends Component {
  // Construct a single feed column
  FeedView(articles, filter) {
    const newsTiles = articles
      .filter(filter)
      .map(a => <ArticleTile article={a} key={a.id} />);
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
        {this.FeedView(this.props.articles, maleFilter)}
        {this.FeedView(this.props.articles, femaleFilter)}
      </div>
    );
  }
}

export default Feed;
