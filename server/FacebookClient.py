import requests
import re
from bs4 import BeautifulSoup
import concurrent.futures

POST_ID_REGEX = re.compile(r'"top_level_post_id":"(\d+)"')

class FacebookClient(object):
    def __init__(self):
        self.session = requests.Session()
        r = self.session.post('https://mbasic.facebook.com/login.php', data={
            'email': 'ewilden.git@gmail.com',
            'pass': 'facebooksucks',
        })
        print(r)

    # returns list of name/ id/ img urls
    def search_name(self, name):
        url = 'https://mbasic.facebook.com/search/?query=%s' % name.replace(' ', '+')
        print(url)

        data = self.session.get(url).text
        soup = BeautifulSoup(data)

        # print(soup.prettify())
        items = soup.select('input[name="fb_dtsg"]')[0].next
        profiles = {}
        for elem in items.table:
            # print(elem.prettify())
            img_elem = elem.find('img')[0]
            text_elem = img_elem.parent.nextSibling
            profile_name = text_elem.a.get_text()
            profile_id = text_elem.a['href'].split('?')[0][1:]
            profile_img = img_elem.attr['src']
            profiles[profile_id] = {}
            profiles[profile_id]['name'] = profile_name
            profiles[profile_id]['img'] = profile_img
        print(profiles)
        return profiles


    def get_posts(self, user_id, limit=20):
        url = 'https://mbasic.facebook.com/profile.php?id=%s&v=timeline' % user_id
        count = 0

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
                        count += 1

                        if count > limit:
                            return

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
                    comments.append(comment)
                except AttributeError:
                    pass

            offset += 10

        return comments

    def get_posts_and_comments(self, user_id):
        with concurrent.futures.ThreadPoolExecutor(max_workers=200) as executor:
            future_to_post_id = {
                executor.submit(self.get_comments, user_id, post_id): post_id
                for post_id in self.get_posts(user_id)
            }
            return concurrent.futures.as_completed(future_to_post_id)

def main():
    c = FacebookClient()

    with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
        user_id = '4'
        future_to_post_id = {
            executor.submit(c.get_comments, user_id, post_id): post_id
            for post_id in c.get_posts('4')
        }
        for future in concurrent.futures.as_completed(future_to_post_id):
            post_id = future_to_post_id[future]
            try:
                data = future.result()
            except Exception as exc:
                print('%r generated an exception: %s' % (post_id, exc))
            else:
                print('%r post returned %d comments' % (post_id, len(data)))

if __name__ == "__main__":
    main()
