import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
import requests
import json
import sys

# http://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/
 
class TwitterClient(object):
    '''
    Generic Twitter Class for sentiment analysis.
    '''
    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console

        consumer_key = ''
        consumer_secret = ''
        access_token = ''
        access_token_secret = ''

        try:
            with open(".env.json") as f:
                d = json.load(f)
                consumer_key = d["twitter"]["consumer_key"]
                consumer_secret = d["twitter"]["consumer_secret"]
                access_token = d["twitter"]["access_token"]
                access_token_secret = d["twitter"]["access_token_secret"]
        except:
            print("Error: reading access tokens from .env.json failed")


        self.dict = self.read_dict("word_dict.txt")
        self.inference_server = "http://localhost:8000/"

        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            # set access token and secret
            self.auth.set_access_token(access_token, access_token_secret)
            # create tweepy API object to fetch tweets
            self.api = tweepy.API(self.auth)
        except:
            print("Error: authentication failed")

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

    def clean_tweet(self, tweet):
        '''
        Utility function to clean tweet text by removing links, special characters
        using simple regex statements.
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def get_tweet_sentiment(self, tweet):
        '''
        Utility function to classify sentiment of passed tweet
        using paddlepaddle sentiment method
        '''
        # get indices of words in tweet 
        words = self.clean_tweet(tweet).split(" ")
        idxs = [int(self.dict[word.lower()]) for word in words if word.lower() in self.dict]
        invroot2 = 0.7071067819
        score = 0.0
        if (len(idxs) > 0):
            data_dict = {"word": idxs}
            r = requests.post(self.inference_server, json=data_dict)
            inferred_obj = json.loads(r.text)
            print(inferred_obj)
            x = inferred_obj["data"][0][0]
            y = inferred_obj["data"][0][1]
            score = invroot2 * (x - y)
        return score

    def get_tweets(self, query, count = 10):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []
 
        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q = query, count = count)
 
            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}
 
                # saving text of tweet
                parsed_tweet['text'] = tweet.text
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)
 
                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)
 
            # return parsed tweets
            return tweets
 
        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))

def main():
    # creating object of TwitterClient Class
    api = TwitterClient()
    # calling function to get tweets
    tweets = api.get_tweets(query = sys.argv[1], count = 20)

    for tweet in tweets:
        print(tweet['text'])
        print(tweet['sentiment'])
 
if __name__ == "__main__":
    # calling main function
    main()

