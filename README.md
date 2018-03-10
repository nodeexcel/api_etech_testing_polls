For any issues contact @arun.etech on slack

#### PATH - 144 - /public_html/inhouse_applications/api_etech_testing_polls
#### Start APP - 
```
npm install 
npm start
```
#### Start With PM2 : pm2 start app.js --name api_etech_testing_polls

## Api's for poll management system


##### 1. Add User
https://secure-refuge-14993.herokuapp.com/add_user?username=admin&password=admin&role=admin

Response : 
User Already exists
{"error":1,"message":"Account Already Exists!"}

User created 
{"error":0,"data":{"username":"admin","password":"admin","role":"admin","id":"576d03da647a7ae24332fe48"}}

##### 2. Login
https://secure-refuge-14993.herokuapp.com/login?username=admin&password=admin

Response : 
Success login
{"error":0,"data":{"username":"admin","password":"admin","role":"admin","_id":"576bc39508d7faee3abf9306","__v":0}}

Fail login
{"error":1,"data":"user not exists"}

##### 3. List Users
https://secure-refuge-14993.herokuapp.com/list_users

Response : 
{"error":0,"data":[{"username":"admin","password":"admin","role":"admin","_id":"576bc39508d7faee3abf9306","__v":0},{"username":"guest","password":"guest","role":"guest","_id":"576bc6f7aa9e68513b55d410","__v":0},{"username":"admian","password":"admin","role":"admin","_id":"576d03da647a7ae24332fe48","__v":0}]}

##### 4. Add New Poll
https://secure-refuge-14993.herokuapp.com/add_poll?title=first%20polll&options=opt1____opt2____opt3____opt4

Response : 
{"error":0,"data":{"title":"first polll","options":[{"option":"opt1","vote":0},{"option":"opt2","vote":0},{"option":"opt3","vote":0},{"option":"opt4","vote":0}],"id":"5770d42ca2dde3b0239044b2"}}

##### 5. List All Polls
https://secure-refuge-14993.herokuapp.com/list_polls

##### 6. List a Poll
https://secure-refuge-14993.herokuapp.com/list_poll?id=5a740779fbe2df0012c0b10e

##### 7. Vote Api
https://secure-refuge-14993.herokuapp.com/do_vote?id=577212fdd1bba33c17b5b64e&option_text=nodejs
##### set headers for above api: 
access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ

##### 8. Add New Option to a poll
https://secure-refuge-14993.herokuapp.com/add_new_option?id=577212fdd1bba33c17b5b64e&option_text=arunkumar

##### 9 Delete poll option
https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=577212fdd1bba33c17b5b64e&option_text=java

##### 10. Update Poll Title
https://secure-refuge-14993.herokuapp.com/update_poll_title?id=577212fdd1bba33c17b5b64e&title=newtitle

##### 11. Delete Poll
https://secure-refuge-14993.herokuapp.com/delete_poll?id=577212fdd1bba33c17b5b64e


# deployment on heroku:


#### Install heroku and signup on heroku official site.
#### heroku login email: ashutosh_m@excellencetechnologies.in

##### commands: 

```
heroku login
git clone https://github.com/nodeexcel/api_etech_testing_polls.git 
cd api_etech_testing_polls
npm install    //(install all modules)
heroku create
git push heroku master
heroku ps:scale web=1
heroku open

for checking the logs errors run command: heroku logs --tail
```

## for updating the code:

make changes in code and push on https://github.com/nodeexcel/api_etech_testing_polls.git

#### then commands:
```
heroku login
cd api_etech_testing_polls
git pull origin master
git push heroku master
heroku restart

```

##### heroku link: https://secure-refuge-14993.herokuapp.com/