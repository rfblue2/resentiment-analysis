import React, { Component } from 'react'
import './ArticleTile.css'

// represents a single article tile
class ArticleTile extends Component {
  render() {
    return (
      <div className="articleTile">
        <img src={this.props.article.img} alt={this.props.article.title}/>
        <div className="articleRight">
          <div className="title">{this.props.article.title}</div>
          <div className="articleChart">YOLO</div>
        </div>
      </div>
    );
  };
}

export default ArticleTile;