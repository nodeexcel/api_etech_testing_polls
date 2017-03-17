For any issues contact @arun.etech on slack

##### PATH - public_html/nodejs/etech_testing_api
##### Runs in PM2 on 144 server

## Api's for poll management system


##### 1. Add User
http://144.76.34.244:3333/add_user?username=admin&password=admin&role=admin

Response : 
User Already exists
{"error":1,"message":"Account Already Exists!"}

User created 
{"error":0,"data":{"username":"admian","password":"admin","role":"admin","id":"576d03da647a7ae24332fe48"}}

##### 2. Login
http://144.76.34.244:3333/login?username=admin&password=admin

Response : 
Success login
{"error":0,"data":{"username":"admin","password":"admin","role":"admin","_id":"576bc39508d7faee3abf9306","__v":0}}

Fail login
{"error":1,"data":"user not exists"}

##### 3. List Users
http://144.76.34.244:3333/list_users

Response : 
{"error":0,"data":[{"username":"admin","password":"admin","role":"admin","_id":"576bc39508d7faee3abf9306","__v":0},{"username":"guest","password":"guest","role":"guest","_id":"576bc6f7aa9e68513b55d410","__v":0},{"username":"admian","password":"admin","role":"admin","_id":"576d03da647a7ae24332fe48","__v":0}]}

##### 4. Add New Poll
http://144.76.34.244:3333/add_poll?title=first%20polll&options=opt1____opt2____opt3____opt4

Response : 
{"error":0,"data":{"title":"first polll","options":[{"option":"opt1","vote":0},{"option":"opt2","vote":0},{"option":"opt3","vote":0},{"option":"opt4","vote":0}],"id":"5770d42ca2dde3b0239044b2"}}

##### 5. List All Polls
http://144.76.34.244:3333/list_polls

##### 6. List a Poll
http://144.76.34.244:3333/list_poll

##### 7. Vote Api
http://144.76.34.244:3333/do_vote?id=577212fdd1bba33c17b5b64e&option_text=nodejs

##### 8. Add New Option to a poll
http://144.76.34.244:3333/add_new_option?id=577212fdd1bba33c17b5b64e&option_text=arunkumar

##### 9 Delete poll option
http://144.76.34.244:3333/delete_poll_option?id=577212fdd1bba33c17b5b64e&option_text=java

##### 10. Update Poll Title
http://144.76.34.244:3333/update_poll_title?id=577212fdd1bba33c17b5b64e&title=newtitle

##### 11. Delete Poll
http://144.76.34.244:3333/delete_poll?id=577212fdd1bba33c17b5b64e

