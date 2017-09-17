import facebook

class GraphApiClient(object):

    def __init__(self):
        # Parameters of your app and the id of the profile you want to mess with.
        CLIENT_ID         = '1968558973431462'
        CLIENT_SECRET     = '203532c16814dbcc944d920be5469db5'
        VERSION = '2.10'
        USER_ACCESS_TOKEN = 'EAACEdEose0cBABTnLqN396XlFWrr1A6CokLxCA1nzKwVmDzZCf72yvV3UzPBLAgPpRydYNkuiHmGX6TZAb4UzY7xr3JZC8laFZBQXOl77LAsT1hOgn4DPgsCKZCldoJWK3IUhfTYZA6Xmi5PHZC3cPJx2m91EGq0MiEU8MO6pZAFf8wCvM4kmBOQmEPTmJvI541IDOZCTXCEOkZC4klyhlf6PsohDSambM6wAZD'

        self.graph = facebook.GraphAPI(USER_ACCESS_TOKEN, VERSION)

    def search(self, name):
        users = self.graph.search(type='user',q=name)
        return users['data']
