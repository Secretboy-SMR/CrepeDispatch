from mitmproxy import http


class Redirect:
    hosts = (
        "mihoyo",
        "yuanshen",
        "hoyoverse",
    )

    def __init__(self):
        pass

    def request(self, flow: http.HTTPFlow) -> None:
        if any(host in flow.request.host for host in self.hosts):
            flow.request.data.host = "localhost"
            flow.request.scheme = "http"
            flow.request.port = 80


addons = [Redirect()]