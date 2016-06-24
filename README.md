# Mongo Api for testing purpose

## API Details

## 1. Add User
/add_user?username=admin&password=admin&role=admin

Response : 
User Already exists
{"error":1,"message":"Account Already Exists!"}

User created 
{"error":0,"data":{"username":"admian","password":"admin","role":"admin","id":"576d03da647a7ae24332fe48"}}

## 2. Login
/login?username=admin&password=admin

Response : 
Success login
{"error":0,"data":{"username":"admin","password":"admin","role":"admin","_id":"576bc39508d7faee3abf9306","__v":0}}

Fail login
{"error":1,"data":"user not exists"}

## 3. List Users
/list_users

Response : 
{"error":0,"data":[{"username":"admin","password":"admin","role":"admin","_id":"576bc39508d7faee3abf9306","__v":0},{"username":"guest","password":"guest","role":"guest","_id":"576bc6f7aa9e68513b55d410","__v":0},{"username":"admian","password":"admin","role":"admin","_id":"576d03da647a7ae24332fe48","__v":0}]}
