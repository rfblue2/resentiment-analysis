import React, { Component } from 'react';
import Profile from './people/Profile';
import Feed from './feed/Feed';
import ArticleTile from './feed/ArticleTile';

class ProfileColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      personIsLoading: false,
      personNotFound: false,
      person: null,
      itemsIsLoading: false,
      items: null,
      chooser: false,
    }
  }

  showProfileList() {
    if (this.state.chooser) {
      const names = this.props.repo.getNames(this.state.name)
      console.log(names)
      return names.then(ns => {
        console.log(ns);
        return ns.map(n => (<div onClick={this.clickPerson.bind(this)}>
          <img className="personImg" src={n.img} alt={n.name}/>
          <div className="personName">{n.name}</div>
          <div className="personId">{n.userId}</div>
        </div>))
      });
    }
    return ''
  }

  clickPerson() {
    console.log(this)

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
      items: null,
      chooser: true,
    });
    // this.props.repo.getProfile(name).then(person => {
    //   this.setState({
    //     personIsLoading: false,
    //     person: person,
    //     chooser: false,
    //   });
    //   this.props.repo.getPosts(person).then(articles => {
    //     this.setState({
    //       itemsIsLoading: false,
    //       items: articles.map(a => <ArticleTile article={a} key={a.title}/>),
    //       chooser: false,
    //     });
    //   }).catch(e => {
    //     console.error(e);
    //     this.setState({
    //       itemsIsLoading: false,
    //       chooser: false,
    //     })
    //   });
    // }).catch(e => {
    //   console.error(e);
    //   this.setState({
    //     personIsLoading: false,
    //     personNotFound: true,
    //     itemsIsLoading: false,
    //     chooser: false
    //   });
    // });
  }

  render() {
    return (
        <div className="profileColumn">
          <form onSubmit={this.onSubmit.bind(this)} >
            <input type="text" className="input" name="url" placeholder="Enter a person's name..." />
          </form>
          {this.showProfileList()}
          <Profile notFound={this.state.personNotFound} isLoading={this.state.personIsLoading} person={this.state.person} />
          <Feed isLoading={this.state.itemsIsLoading} items={this.state.items} />
        </div>
    );
  }
}

export default ProfileColumn;
