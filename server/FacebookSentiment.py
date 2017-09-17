import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
import requests
import json
import sys

# http://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/
 
class FacebookSentiment(object):
    '''
    Generic Facebook Class for sentiment analysis.
    '''
    def __init__(self):
        '''
        Class constructor or initialization method.
        '''

        self.dict = self.read_dict("word_dict.txt")
        self.inference_server = "http://localhost:8000/"

    def read_dict(self, path):
        '''
        Reads the dictionary file from the given path and returns it as a
        python dict
        '''
        try:
            with open(path) as f:
                d = {}
                for line in f:
                    tokens = line.split()
                    d[tokens[0]] = tokens[1]
                return d
        except:
            print("Error: reading dictionary failed")

    def strip_comment_to_word_list(self, comment):
        '''
        Utility function to clean tweet text by removing links, special characters
        using simple regex statements.
        '''
        return re.sub("(@[A-Za-z0-9]+)|([^'0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", comment).lower().split()

    def get_comment_sentiment(self, comment):
        '''
        Utility function to classify sentiment of passed comment
        using paddlepaddle sentiment method
        '''
        # get indices of words in comment 
        words = self.strip_comment_to_word_list(comment)
        idxs = [int(self.dict[word.lower()]) for word in words if word.lower() in self.dict]
        score = 0.0
        if (len(idxs) > 0):
            data_dict = {"word": idxs}
            r = requests.post(self.inference_server, json=data_dict)
            inferred_obj = json.loads(r.text)
            print(inferred_obj)
            x = inferred_obj["data"][0][0]
            y = inferred_obj["data"][0][1]
            score = x - y
        return score
