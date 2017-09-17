
class ArticleRepo {

  genRand(n) {
    return Array.apply(null, new Array(n)).map(function(item, index){
      return Math.floor(Math.random() * 100);
    });
  }

  // get name/id/imgs of possible profiles given query name
  getNames(name) {
    const mockResults = {
      "Alex": {
        name: "Alex",
        id: "alex",
        img: "http://via.placeholder.com/100x100"
      },
      "Casey": {
        name: "Casey",
        id: "casey",
        img: "http://via.placeholder.com/100x100"
      }
    }
    return Promise.resolve(mockResults);
  }

  getProfile(name) {
    const mockProfiles = {
      "Alex": {
        name: "Alex",
        img: "http://via.placeholder.com/100x100",
        gender: "m",
        most_pos: "most positive alex comment",
        most_neg: "most negative alex comment",
        sentiment: this.genRand(30)
      },
      "Casey": {
        name: "Casey",
        img: "http://via.placeholder.com/100x100",
        gender: "f",
        most_pos: "most positive casey comment",
        most_neg: "most negative casey comment",
        sentiment: this.genRand(30)
      }
    };
    if (name in mockProfiles) {
      return Promise.resolve(mockProfiles[name]);
    } else {
      return Promise.reject();
    }
  }

  getPosts(profile) {
    const mockPosts = {
      "www.1.com": {
        title: "test article",
        source: "test source",
        img: "http://via.placeholder.com/100x150",
        gender: "m",
        most_pos: "most positive comment",
        most_neg: "most negative comment",
        sentiment: this.genRand(24)
      },
      "www.2.com": {
        title: "test article 2",
        source: "test source2",
        img: "http://via.placeholder.com/200x200",
        gender: "f",
        most_pos: "most positive comment",
        most_neg: "most negative comment",
        sentiment: this.genRand(30)
      },
      "www.3.com": {
        title: "test article 3",
        source: "test source2",
        img: "http://via.placeholder.com/200x250",
        gender: "f",
        most_pos: "most positive comment",
        most_neg: "most negative comment",
        sentiment: this.genRand(34)
      },
      "www.4.com": {
        title: "test article 4",
        source: "test source2",
        img: "http://via.placeholder.com/300x200",
        gender: "m",
        most_pos: "most positive comment",
        most_neg: "most negative comment",
        sentiment: this.genRand(29)
      }
    };
    return Promise.resolve(Object.values(mockPosts));
  }

}

export default ArticleRepo;