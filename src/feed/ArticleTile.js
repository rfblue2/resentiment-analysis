import React, { Component } from 'react'
import Chart from './Chart'
import Modal from 'react-modal'
import ArticleInfo from '../ArticleInfo'
import './ArticleTile.css'

// represents a single article tile
class ArticleTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArticleModal: false,
    };
  }

  articleClick() {
    this.setState({
      showArticleModal: true
    });
  }

  onModalClose() {
    this.setState({
      showArticleModal: false
    });
  }

  render() {
    const modalStyle = {}; // TODO pass className & style w/ css
    return (
      <li className="articleTile" onClick={this.articleClick}>
        <div className="articleTitle">{this.props.article.title}</div>
        <div className="articleAuthor">Author Name</div>
        <div className="articleSource">{this.props.article.source}</div>
        <div className="articleChart">
          <Chart data={this.props.article.sentiment}/>
        </div>
        <Modal
          isOpen={this.state.showArticleModal}
          onRequestClose={this.onModalClose.bind(this)}
          style={modalStyle}
          contentLabel="show article modal"
        >
          <ArticleInfo article={this.props.article}/>
        </Modal>
      </li>
    );
  };
}

export default ArticleTile;
