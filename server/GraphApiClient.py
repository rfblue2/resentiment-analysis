import facebook
import web
from urlparse import parse_qs

class GraphApiClient(object):

    def __init__(self):
        # Parameters of your app and the id of the profile you want to mess with.
        CLIENT_ID         = '1968558973431462'
        CLIENT_SECRET     = '203532c16814dbcc944d920be5469db5'
        VERSION = '2.10'
        USER_ACCESS_TOKEN = 'EAACEdEose0cBABTnLqN396XlFWrr1A6CokLxCA1nzKwVmDzZCf72yvV3UzPBLAgPpRydYNkuiHmGX6TZAb4UzY7xr3JZC8laFZBQXOl77LAsT1hOgn4DPgsCKZCldoJWK3IUhfTYZA6Xmi5PHZC3cPJx2m91EGq0MiEU8MO6pZAFf8wCvM4kmBOQmEPTmJvI541IDOZCTXCEOkZC4klyhlf6PsohDSambM6wAZD'

        post_login_url = "http://0.0.0.0:3000/"

        user_data = web.input(code=None)

        if not user_data.code:
            dialog_url = ( "http://www.facebook.com/dialog/oauth?" +
                                       "client_id=" + CLIENT_ID +
                                       "&redirect_uri=" + post_login_url +
                                       "&scope=publish_stream" )

            return "<script>top.location.href='" + dialog_url + "'</script>"
        else:
            graph = GraphAPI()
            response = graph.get(
                path='oauth/access_token',
                client_id=CLIENT_ID,
                client_secret=CLIENT_SECRET,
                redirect_uri=post_login_url,
                code=code
            )
            data = parse_qs(response)
            self.graph = GraphAPI(data['access_token'][0], VERSION)

        # self.graph = facebook.GraphAPI(USER_ACCESS_TOKEN, VERSION)

    def search(self, name):
        users = self.graph.search(type='user',q=name)
        return users['data']
