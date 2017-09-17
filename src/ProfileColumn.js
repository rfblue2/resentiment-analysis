import React, { Component } from 'react';
import Profile from './people/Profile';
import Feed from './feed/Feed';
import ArticleTile from './feed/ArticleTile';
import PulseLoader from 'halogen/PulseLoader';

import './ProfileColumn.css'
import './people/Profile.css'

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
      choices: []
    }
  }

  showProfileList() {
    this.setState({
      personIsLoading: true,
    });
    const names = this.props.repo.getNames(name)
    names.then(ns => {
      var elems = [];
      console.log(elems);
      for (var n in ns) {
        elems.push((<div className="personProfile" key={n} onClick={() => this.clickPerson(ns[n])}>
          <img className="personImg" src={ns[n]['img']} alt={n}/>
          <div className="personName">{ns[n]['name']}</div>
          <div className="personId">{ns[n]['userId']}</div>
        </div>));
      }
      this.setState({
        personIsLoading: false,
        choices: elems
      });
    });
  }

  clickPerson(person) {
    this.setState({
      person,
      choices: [],
      itemsIsLoading: true,
    });

    // Load posts one at a time
    this.props.repo.getPosts(person, newPost => {
      this.setState(state => {
        state.items = state.items.concat([<ArticleTile article={newPost} key={newPost.title}/>]);
        state.person = Object.assign({}, state.person, { sentiment: state.person.sentiment.concat(newPost.sentiment) });
        return state;
      });
    }, () => {
      this.setState({
        itemsIsLoading: false,
      })
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e.target.url.value);
    const name = e.target.url.value;
    this.setState({
      name: name,
      items: [],
    });
    this.showProfileList(this.state.name);
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
          {this.state.personIsLoading && <PulseLoader color="gray" size="20px" margin="10px" />}
          {this.state.choices}
          {this.state.person && <Profile person={this.state.person} />}
          <Feed isLoading={this.state.itemsIsLoading} items={this.state.items} />
        </div>
    );
  }
}

export default ProfileColumn;
