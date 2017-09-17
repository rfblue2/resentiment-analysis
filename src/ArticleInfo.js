import React, { Component } from 'react'
import Chart from './feed/Chart'
import './ArticleInfo.css'

class ArticleInfo extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.article.title}</h1>
        <Chart data={this.props.article.sentiment} chartWidth="1000" chartHeight="300"/>
        <div className="comments">
          <div className="comment">
            Most Positive Comment <br/>
            {this.props.article.most_pos}
          </div>
          <div className="comment">
            Most Negative Comment <br/>
            {this.props.article.most_neg}
          </div>
        </div>
      </div>
    );
  }

}

export default ArticleInfo