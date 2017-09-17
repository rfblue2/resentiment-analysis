from flask import Flask, request, Response
from json import loads, dumps
from sent_resp import SentimentResponse, SentimentElement

app = Flask(__name__)

#-------------------BEGIN TEST------------------------------

class TwitterClient:
    def __init__(self):
        pass

    def get_comments(self, url):
        print(url)
        return url

class PaddleClient:
    def __init__(self):
        pass

#-------------------END TEST----------------------------------

def json_ok(json_str):
    return json_str, 200, {"Content-Type": "application/json"}

twitter_client = None
paddle_client = None

def init():
    if twitter_client is None:
        twitter_client = TwitterClient()

    if paddle_client is None:
        paddle_client = PaddleClient()
        
@app.route("/search/", methods = ["POST"])
def search_handler():
    init()
        
    if request.method == "POST":
        strings = loads(request.data)
        elems = {}
        for url in strings:
            comments = twitter_client.get_comments(url)
            cmts = {}
            for cmt in comments:
                numbers = paddle_client.extract_numbers(cmt[1])
                sent_val = paddle_client.rate(numbers)

                cmts[cmt] = sent_val
                
            elems[url] = SentimentElement(cmts)
        resp = SentimentResponse(elems)

        return json_ok(resp.json_str)
    else:
        raise TypeError("Wrong Method")

@app.route("/query/", methods = ["GET"])
def query_handler():
    init()
    
    if request.method == "GET":
        pass
    else:
        raise TypeError("Wrong Method")
