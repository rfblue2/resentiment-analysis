from flask import Flask, request, Response
from json import loads, dumps
from sent_resp import *
from pymongo import MongoClient

app = Flask(__name__)

#-------------------BEGIN TEST------------------------------

class TwitterClient:
    def __init__(self):
        pass

    def get_comments(self, url):
        print(url)
        return [(url, "")]

class PaddleClient:
    def __init__(self):
        pass

    def extract_numbers(self, cmt_text):
        return []

    def rate(self, nums):
        return 0

#-------------------END TEST----------------------------------

def json_ok(json_str):
    return json_str, 200, {"Content-Type": "application/json"}

twitter_client = TwitterClient()
paddle_client = PaddleClient()
mongo_client = MongoClient()
mongodb = mongo_client["news-sentiment"]
        
@app.route("/search/", methods = ["POST"])
def search_handler():
    
    if request.method == "POST":
        strings = loads(request.data)
        elems = {}
        for news_url in strings:
            entry = mongodb.entries.find_one({"url": news_url});
            if entry is None:
                comments = twitter_client.get_comments(news_url)
                cmts = {}
                for cmt in comments:
                    numbers = paddle_client.extract_numbers(cmt[1])
                    sent_val = paddle_client.rate(numbers)
                    
                    cmts[cmt] = sent_val

                elems[news_url] = SentimentElement(news_url, cmts)
                mongodb.entries.insert_one(elems[news_url].mongodb_entry)
            else:
                elems[news_url] = parse_mongodb_entry(entry)
    
        resp = SentimentResponse(elems)

        return json_ok(resp.json_str)
    else:
        raise TypeError("Wrong Method")

@app.route("/query/", methods = ["GET"])
def query_handler():
    
    if request.method == "GET":
        pass
    else:
        raise TypeError("Wrong Method")

if __name__ == '__main__':
   app.run(debug = True)
