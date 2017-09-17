import React, { Component } from 'react'
import './App.css';
import Profile from './people/Profile'
import Feed from './feed/Feed';
import PersonRepo from './repo/PersonRepo'
import ArticleTile from './feed/ArticleTile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: "Casey",
      person1: null,
      person1notfound: false,
      name2: "Alex",
      person2: null,
    };
    this.repo = new PersonRepo();
  }

  onSubmit1(e) {
    e.preventDefault();
    console.log(e.target.url.value);
    const name = e.target.url.value;
    this.setState({
      name1: name,
      person1isLoading: true,
      person1notfound: false,
      person1: null,
      items1loading: true,
      items1: null,
    });
    this.repo.getProfile(name).then(person => {
      this.setState({
        person1isLoading: false,
        person1: person,
      });
      this.repo.getPosts(person).then(articles => {
        this.setState({
          items1loading: false,
          items1: articles.map(a => <ArticleTile article={a} key={a.title}/>),
        });
      }).catch(e => {
        console.error(e);
        this.setState({
          items1loading: false,
        })
      });
    }).catch(e => {
      console.error(e);
      this.setState({
        isLoading: false,
        person1notfound: true,
      });
    });
  }

  onSubmit2(e) {
    e.preventDefault();
    console.log(e.target.url.value);
    const name = e.target.url.value;
    this.setState({
      name2: name,
      person2: this.repo.getProfile(name),
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>News Sentiment Analysis</h2>
        </div>
        <div className="container">
          <h2>Welcome</h2>

          <div className="profileColumns">
            <div className="profileColumn">
              <form onSubmit={this.onSubmit1.bind(this)} >
                <input type="text" className="input" name="url" placeholder="Enter a person's name..." />
              </form>
              <Profile notFound={this.state.person1notfound} isLoading={this.state.person1isLoading} person={this.state.person1} />
              <Feed isLoading={this.state.items1loading} items={this.state.items1} />
            </div>

            <div className="profileColumn">
              <form onSubmit={this.onSubmit2.bind(this)} >
                <input type="text" className="input" name="url" placeholder="Enter a person's name..." />
              </form>
              <Profile isLoading={this.state.person2isLoading} person={this.state.person2} />
              <Feed isLoading={this.state.items2loading} items={this.state.items2} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
