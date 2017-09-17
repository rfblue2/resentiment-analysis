import React, { Component } from 'react'
import ArticleTile from './ArticleTile'
import ArticleRepo from '../ArticleRepo'
import './Feed.css'

class Feed extends Component {
  // Construct a single feed column
  FeedView(articles, filter) {
    const repo = new ArticleRepo();
    const fullArticles = repo.getArticles();
    const newsTiles = articles
      .map(name => fullArticles[name])
      .filter(filter)
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
