
class ArticleRepo {

  genRand(n) {
    return Array.apply(null, new Array(n)).map(function(item, index){
      return Math.floor(Math.random() * 100);
    });
  }

  getArticleNames() {
    const mockArticleNames = [
      "www.1.com", "www.2.com", "www.3.com", "www.4.com"
    ];
    return mockArticleNames;
  }

  getArticles() {
    const mockArticles = {
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
    return mockArticles;
  }

}

export default ArticleRepo;