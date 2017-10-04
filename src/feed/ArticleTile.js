import React, { Component } from 'react'
import Chart from '../Chart'
import './ArticleTile.css'

// represents a single article tile
class ArticleTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticleModal: false,
      showArticleModalAfter: false,
      articleSizerHeight: 0,
      rect: {
        left: 0,
        top: 0,
        width: 0,
      },
    };
  }

  articleClick() {
    if (!this.state.showArticleModal) {
      let rect = this.articleWrapper.getBoundingClientRect();

      this.setState({
        showArticleModal: true,
        articleSizerHeight: rect.height,
        rect,
      });

      requestAnimationFrame(() => {
        this.setState({
          showArticleModalAfter: true,
        })
      });
    } else {
      this.setState({
        showArticleModal: false,
        showArticleModalAfter: false,
        articleSizerHeight: 0,
        rect: {
          left: 0,
          top: 0,
          width: 0,
        },
      });
    }
  }

  render() {
    return (
      <li className={"articleTile " + (this.state.showArticleModalAfter ? "articleTile_modal" : "")}>
        <div className="articleSizer" style={{
          height: this.state.articleSizerHeight,
        }} />
        <div className="articleWrapper"
             ref={(e) => { this.articleWrapper = e; }}
             style={{
               position: this.state.showArticleModal ? 'fixed' : 'static',
               left: 0,
               top: 0,
               width: this.state.showArticleModal ? '100%' : 'auto',
               height: this.state.showArticleModal ? '100%' : 'auto',
             }}
             onClick={this.articleClick.bind(this)}
        >
          <div className="articleItem"
              style={{
                position: this.state.showArticleModal ? 'absolute' : 'relative',
                left: this.state.rect.left,
                top: this.state.rect.top,
                width: this.state.showArticleModal ? this.state.rect.width : 'auto',
              }}
          >
            <div className="articleTop">
              <div className="articleTitle">{this.props.article.title.substring(0, 100)}...</div>
              <div className="articleChart">
                <Chart data={this.props.article.sentiment} ref={(e) => { this.articleChart = e; }} />
              </div>
            </div>
            <div className="articleBottom">
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
          </div>
        </div>
      </li>
    );
  };
}

export default ArticleTile;
