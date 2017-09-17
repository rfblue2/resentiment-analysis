from flask import Flask, request, jsonify, render_template
from sent_resp import *
from pymongo import MongoClient
from TwitterSentiment import TwitterClient
from FacebookClient import FacebookClient
from FacebookSentiment import FacebookSentiment

app = Flask(__name__)

def json_ok(json_str):
    return json_str, 200, {"Content-Type": "application/json"}

twitter_client = TwitterClient()
mongo_client = MongoClient()
facebook_client = FacebookClient()
fb_sentiment = FacebookSentiment()
mongodb = mongo_client["news-sentiment"]

@app.route("/", methods = ["GET"])
def root_handler():
    return "Hello world!"

@app.route("/search/", methods = ["GET"])
def search_handler():

    if request.method == "GET":
        fbid = request.args.get('fbid')
        if not fbid is None:
            postgen = facebook_client.get_posts(fbid)
            comments = [comment for post in postgen for comment in facebook_client.get_comments(fbid, post, 1)]
            return jsonify([(fb_sentiment.get_comment_sentiment(comment), comment) for comment in comments])

        news_url = request.args.get('query')
        entry = mongodb.entries.find_one({"url": news_url})
        if entry is None:
            return "not in db!"
            # comments = twitter_client.get_tweets(news_url)
            # mongodb.entries.insert_one({
            #     "url": news_url,
            #     "comments": comments,
            # })
        else:
            # comments = entry['comments']
            return "in db!"

        return jsonify(comments)
    else:
        raise TypeError("Wrong Method")

@app.route("/query/", methods = ["GET"])
def query_handler():

    if request.method == "GET":
        iterator = mongodb.entries.find()
        elems = {}
        for entry in iterator:
            elems[entry["url"]] = parse_mongodb_entry(entry)

        resp = SentimentResponse(elems)

        return jsonify(resp.json_str)
    else:
        raise TypeError("Wrong Method")

@app.route("/searchname", methods = ["GET"])
def searchName():
    if request.method == "GET":
        name = request.args['name']
        return jsonify(graph_client.search(name))
    else:
        raise TypeError("Wrong Method")

@app.route("/searchbyid", methods = ["GET"])
def searchById():
    if request.method == "GET":
        userId = request.args['userId']
        posts = facebook_client.get_posts(userId)
        comments = {}
        for post in posts:
            comments[post] = facebook_client.get_comments(userId, post)
        # TODO run sentiment analysis on comments and return that too
        return jsonify(comments)
    else:
        raise TypeError("Wrong Method")

if __name__ == '__main__':
   app.run(debug = True)
