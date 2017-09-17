
class ArticleRepo {

  genRand(n) {
    return Array.apply(null, new Array(n)).map(function(item, index){
      return Math.floor(Math.random() * 100);
    });
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
    return mockProfiles[name];
  }

}

export default ArticleRepo;