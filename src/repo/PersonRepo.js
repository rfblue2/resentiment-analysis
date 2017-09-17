function genRand(n) {
  return Array.apply(null, new Array(n)).map(function(item, index){
    return Math.floor(Math.random() * 100);
  });
}

const mockPosts = {
  "www.1.com": {
    title: "test article",
    source: "test source",
    img: "http://via.placeholder.com/100x150",
    gender: "m",
    most_pos: "most positive comment",
    most_neg: "most negative comment",
    sentiment: genRand(24)
  },
  "www.2.com": {
    title: "test article 2",
    source: "test source2",
    img: "http://via.placeholder.com/200x200",
    gender: "f",
    most_pos: "most positive comment",
    most_neg: "most negative comment",
    sentiment: genRand(30)
  },
  "www.3.com": {
    title: "test article 3",
    source: "test source2",
    img: "http://via.placeholder.com/200x250",
    gender: "f",
    most_pos: "most positive comment",
    most_neg: "most negative comment",
    sentiment: genRand(34)
  },
  "www.4.com": {
    title: "test article 4",
    source: "test source2",
    img: "http://via.placeholder.com/300x200",
    gender: "m",
    most_pos: "most positive comment",
    most_neg: "most negative comment",
    sentiment: genRand(29)
  }
};

class PostStream {
  constructor(profile, postCb, doneCb) {
    this.profile = profile;
    this.postCb = postCb;
    this.doneCb = doneCb;
  }

  loop() {
    fetch('localhost:5000/query/?fbid=' + this.profile.id).then(res => {
      const json = res.json();
      if (json.length > 0) {
        json.forEach(this.postCb);
        this.loop();
      } else {
        this.doneCb();
      }
    });
  }

  start() {
    fetch('localhost:5000/profile/?fbid=' + this.profile.id).then(() => {
      this.loop();
    });
  }
}

class ArticleRepo {
  constructor(useMocks = true) {
    this.useMocks = useMocks;
  }

  // get name/id/imgs of possible profiles given query name
  getNames(name) {
    if (this.useMocks) {
      const mockResults = {
        "Alex": {
          name: "Alex",
          userId: "alex",
          img: "http://via.placeholder.com/100x100",
          sentiment: [],
        },
        "Casey": {
          name: "Casey",
          userId: "casey",
          img: "http://via.placeholder.com/100x100",
          sentiment: [],
        }
      };
      return Promise.resolve(mockResults);
    }
    return fetch('http://localhost:5000/searchname?name=' + name, {
        mode: 'cors'
      }).then(res => {
        return res.json();
      }).catch(e => {
        console.log(e);
      });

    // TODO
  }

  getPosts(profile, postCb, doneCb) {
    if (this.useMocks) {
      for (let post of Object.values(mockPosts)) {
        setTimeout(() => postCb(post), Math.random() * 1000);
      }
      setTimeout(doneCb, 1000);
      return;
    }

    new PostStream(profile, postCb, doneCb).start();
  }

}

export default ArticleRepo;