import React, { Component } from 'react'
import Chart from './Chart'
import './ArticleTile.css'

// represents a single article tile
class ArticleTile extends Component {

  articleClick() {
    console.log("clicked!");
  }

  render() {
    return (
      <li className="articleTile" onClick={this.articleClick}>
        <div className="articleTitle">{this.props.article.title}</div>
        <div className="articleAuthor">Author Name</div>
        <div className="articleSource">{this.props.article.source}</div>
        <div className="articleChart">
          <Chart data={this.props.article.sentiment}/>
        </div>
      </li>
    );
  };
}

export default ArticleTile;
