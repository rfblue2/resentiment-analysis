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
      <a className="articleTile" onClick={this.articleClick}>
        <img src={this.props.article.img} alt={this.props.article.title}/>
        <div className="articleRight">
          <div className="title">{this.props.article.title}</div>
          <div className="articleChart">
            <Chart data={this.props.article.sentiment}/>
          </div>
        </div>
      </a>
    );
  };
}

export default ArticleTile;