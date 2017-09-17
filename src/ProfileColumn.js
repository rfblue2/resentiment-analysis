import React, { Component } from 'react';
import Profile from './people/Profile';
import Feed from './feed/Feed';
import ArticleTile from './feed/ArticleTile';

import './ProfileColumn.css'

class ProfileColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      personIsLoading: false,
      personNotFound: false,
      person: null,
      itemsIsLoading: false,
      items: [],
      chooser: false,
      choices: []
    }
  }

  showProfileList() {
    const names = this.props.repo.getNames(this.state.name)
    names.then(ns => {
      var elems = [];
      console.log(elems);
      for (var n in ns) {
        elems.push((<li className="choice" key={n} onClick={this.clickPerson.bind(this)}>
          <img className="personImg" src={ns[n]['img']} alt={n}/>
          <div className="personName">{ns[n]['names']}</div>
          <div className="personId">{ns[n]['userId']}</div>
        </li>));
      }
      this.setState({
        choices: elems
      });
    });
  }

  clickPerson() {
    console.log(JSON.stringify(this))

    this.setState({
      choices: []
    });

  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e.target.url.value);
    const name = e.target.url.value;
    this.setState({
      name: name,
      personIsLoading: true,
      personNotFound: false,
      person: null,
      itemsIsLoading: true,
      items: [],
      chooser: true,
    });
    this.showProfileList();
    this.props.repo.getProfile(name).then(person => {
      this.setState({
        personIsLoading: false,
        person: person,
      });

      // Load posts one at a time
      this.props.repo.getPosts(person, newPost => {
        this.setState(state => {
          state.items = state.items.concat([<ArticleTile article={newPost} key={newPost.title}/>]);
          return state;
        });
      }, () => {
        this.setState({
          itemsIsLoading: false,
        })
      });
    }).catch(e => {
      console.error(e);
      this.setState({
        personIsLoading: false,
        personNotFound: true,
        itemsIsLoading: false,
      });
    });
  }

  render() {
    return (
        <div className="profileColumn">
          <form onSubmit={this.onSubmit.bind(this)} >
            <input type="text" className="input" name="url" placeholder="Enter a person's name..." />
          </form>
          <Profile notFound={this.state.personNotFound} isLoading={this.state.personIsLoading} person={this.state.person} />
          <Feed isLoading={this.state.itemsIsLoading} items={this.state.items} />
          <ul>
            {this.state.choices}
          </ul>
        </div>
    );
  }
}

export default ProfileColumn;
