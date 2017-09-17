from json import dumps

class SentimentElement:
    def __init__(self, url, cmts):
        self._url = url
        self._sent = []

        lowest_cmt, lowest_val = None, 2
        highest_cmt, highest_val = None, -2
        for k, v in cmts:
            self._sent.append(v)
            if v > highest_val:
                highest_cmt, highest_val = k, v
            if v < lowest_val:
                lowest_cmt, lowest_val = k, v

        if not highest_cmt is None:
            self._highest = {"url": highest_cmt[0], "text": highest_cmt[1]}
        if not lowest_cmd is None:
            self._lowest = {"url": lowest_cmt[0], "text": lowest_cmt[1]}

    @property
    def json_obj(self):
        root = {}
        root["most_positive"] = self._highest
        root["most_negative"] = self._lowest
        root["polarities"] = self._sent

        return root

    @property
    def url(self):
        return self._url

class SentimentResponse:
    def __init__(self, elems):
        self._list = {}

        for elem in elems:
            self._list[elem.url] = elem.json_obj

    @property
    def json_str(self):
        return dumps(self._list)
