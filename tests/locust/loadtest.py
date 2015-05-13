# Run with:
# $ locust -f loadtest.py --host=http://amos-proj1.elasticbeanstalk.com
# Go to: http://localhost:8089/

from locust import HttpLocust, TaskSet, task


class WebsiteTasks(TaskSet):
    @task(1)
    def index(self):
        self.client.get("/")

    @task(1)
    def register(self):
        self.client.get("/register")

    @task(1)
    def login(self):
        self.client.get("/login")

    @task(1)
    def logout(self):
        self.client.get("/logout")



class WebsiteUser(HttpLocust):
    task_set = WebsiteTasks
    min_wait = 5000
    max_wait = 15000
