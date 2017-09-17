import requests
import re
from bs4 import BeautifulSoup

POST_ID_REGEX = re.compile(r'"top_level_post_id":"(\d+)"')

class FacebookClient(object):
    def __init__(self):
        self.session = requests.Session()
        r = self.session.post('https://mbasic.facebook.com/login.php', data={
            'email': 'zach.bot@zacharyliu.com',
            'pass': '3iLZzq41ekxu',
        })
        print(r)

    # returns list of name/ id/ img urls
    def search_name(self, name):
        url = 'https://mbasic.facebook.com/search/?query=%s' % name.replace(' ', '+')
        print(url)

        data = self.session.get(url).text
        soup = BeautifulSoup(data)

        items = soup.select('.bl')
        profiles = {}
        for elem in items[0].table:
            img_elem = elem.select('.bm')
            text_elem = elem.select('.bo')
            profile_name = text_elem[0].a.get_text()
            profile_id = text_elem[0].a['href'].split('?')[0][1:]
            profile_img = img_elem[0].img['src']
            profiles[profile_id] = {}
            profiles[profile_id]['name'] = profile_name
            profiles[profile_id]['img'] = profile_img
        print(profiles)
        return profiles


    def get_posts(self, user_id):
        url = 'https://mbasic.facebook.com/profile.php?id=%s&v=timeline' % user_id

        while url is not None:
            print(url)

            data = self.session.get(url).text
            soup = BeautifulSoup(data)

            for elem in soup.select('[data-ft]'):
                if 'data-ft' in elem.attrs:
                    result = POST_ID_REGEX.search(elem.attrs['data-ft'])
                    if result is not None:
                        post_id = result.group(1)
                        yield post_id

            next_a = soup.find_all('a', text='Show more')
            if len(next_a) > 0:
                url = 'https://mbasic.facebook.com' + next_a[-1].attrs['href']
            else:
                url = None

    def get_comments(self, user_id, post_id, limit=500):
        def get_url(offset):
            return 'https://mbasic.facebook.com/story.php?story_fbid=%s&id=%s&p=%s' % (post_id, user_id, offset)

        comments = []
        offset = 0
        should_continue = True

        while should_continue and len(comments) < limit:
            data = self.session.get(get_url(offset)).text
            soup = BeautifulSoup(data)

            should_continue = False
            for elem in soup.select('[href^="/comment/replies"]'):
                should_continue = True
                try:
                    comment = elem.parent.parent.next.nextSibling.text
                    print(comment)
                    comments.append(comment)
                except AttributeError:
                    pass

            offset += 10

        return comments

# c = FacebookClient()
# for post_id in c.get_posts('4'):
#     print(post_id)
#     print(c.get_comments('4', post_id))
