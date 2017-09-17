import React, { Component } from 'react'
import Chart from './feed/Chart'
import './ArticleInfo.css'

class ArticleInfo extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.article.title}</h1>
        <Chart data={this.props.article.sentiment}/>
        <div class="comments">
          <div class="comment">
            Most Positive Comment <br/>
            {this.props.article.most_pos}
          </div>
          <div class="comment">
            Most Negative Comment <br/>
            {this.props.article.most_neg}
          </div>
        </div>
      </div>
    );
  }

}

export default ArticleInfo