function genRand(n) {
  return Array.apply(null, new Array(n)).map(function(item, index){
    return Math.floor(Math.random() * 100);
  });
}

const mockPosts = {
  sheryl: [
    {
      title: "Today would have been my husband Dave's 50th birthday. Dave was one of the most generous people I’ve ever known. He gave his time, advice, and support to so many people that, to this day, I’m still hearing new stories about how he changed people’s lives. He set the standard for generosity for many others – and I strive every day to live up to his example and teach our children to follow in his footsteps.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(24)
    },
    {
      title: "I just woke up to the terrible news out of Las Vegas. Death is an inevitable part of life and happens for so many reasons that we can’t avoid. But for people to be killed so senselessly, for lives to be lost so unnecessarily, is devastating for all of these families and for all of us.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(30)
    },
    {
      title: "One out of every five children reports being bullied at school. That's one too many. Today on the start of National Bullying Prevention Month, I'm grateful for all that my mother-in-law Paula Goldberg does to stop kids from being bullied at school. Paula founded PACER's National Bullying Prevention Center (NBPC) in Minnesota in 2006 as part of the PACER Center – the non-profit organization she started after she worked as a teacher and saw how parents of children with disabilities needed more help.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(34)
    },
    {
      title: "Wishing Ida Epstein – my sister's amazing grandmother-in-law – a happy 101st birthday!!! Ida's joy is as deep as her life is long – and she is going strong.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(29)
    }
  ],
  zuck: [
    {
      title: "It's hard to imagine the loss from the shooting in Las Vegas. It's hard to imagine why we don't make it much harder for anyone to do this. Our community has activated Safety Check so you can check on anyone who was in the area or mark yourself safe.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(24)
    },
    {
      title: "Last year at Oculus Connect I demoed a social virtual reality experience we called Facebook Spaces. Since then, I've really enjoyed this interview series Slate does in VR using Spaces. Here they interview Wyclef and \"visit\" Haiti. Even if you don't watch the whole thing, it's worth seeing the first couple of minutes and hearing his reaction when they first teleport to Haiti.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(30)
    },
    {
      title: "Tonight concludes Yom Kippur, the holiest day of the year for Jews when we reflect on the past year and ask forgiveness for our mistakes. For those I hurt this year, I ask forgiveness and I will try to be better. For the ways my work was used to divide people rather than bring us together, I ask forgiveness and I will work to do better. May we all be better in the year ahead, and may you all be inscribed in the book of life.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(34)
    },
    {
      title: "Today we're launching a way to make it easier to donate blood in India. In an emergency, people often reach out to their community on Facebook -- asking for donors, organizing donation groups and checking local blood banks. Every week across India, there are thousands of posts from people seeking blood donations. Like many countries, India doesn't always have enough donors to provide everyone with reliable access to safe blood.",
      most_pos: "most positive comment",
      most_neg: "most negative comment",
      sentiment: genRand(29)
    }
  ],
};

class PostStream {
  constructor(profile, postCb, doneCb) {
    this.profile = profile;
    this.postCb = postCb;
    this.doneCb = doneCb;
  }

  loop() {
    fetch('http://localhost:5000/query/?fbid=' + this.profile.userId).then(res => {
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
    fetch('http://localhost:5000/profile/?fbid=' + this.profile.userId).then(() => {
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
    if (true || this.useMocks) {
      const mockResults = {
        "Sheryl": {
          name: "Sheryl Sandberg",
          userId: "sheryl",
          img: "https://i.imgur.com/RiDN6G4.jpg",
          sentiment: [],
        },
        "Casey": {
          name: "Mark Zuckerberg",
          userId: "zuck",
          img: "https://i.imgur.com/2GfiImW.jpg",
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
      for (let post of mockPosts[profile.userId]) {
        setTimeout(() => postCb(post), Math.random() * 1000);
      }
      setTimeout(doneCb, 1000);
      return;
    }

    new PostStream(profile, postCb, doneCb).start();
  }

}

export default ArticleRepo;