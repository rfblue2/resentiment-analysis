import React, { Component } from 'react'
import ArticleTile from './ArticleTile'
import PersonRepo from '../repo/PersonRepo'
import './Feed.css'

class Feed extends Component {
  // Construct a single feed column
  render() {
    const repo = new PersonRepo();
    const fullArticles = repo.getPosts(this.props.name);
    const newsTiles = fullArticles
      .map(a => <ArticleTile article={a} key={a.title} />);
    return (
      <div className="feedView">
        <h3>Feed</h3>
        <ul>
          {newsTiles}
        </ul>
      </div>
    );
  }
}

export default Feed;
