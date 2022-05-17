# Online Forum API
## Overview
<img width="1128" alt="Screen Shot 2022-05-16 at 8 03 49 PM" src="https://user-images.githubusercontent.com/55883282/168701496-4afb17ff-09e9-4e05-92ae-da73caf49442.png">
The Online Forum API is a REST API created using AWS Lambda that allows users to easily create, edit, view or delete an online post on an Online Forum. The data or commands users send are stored on an online database, so that the information can be accessed via internect connection.

## Tools Utilized
This RESTful API is fully written in JavaScript. It is built using AWS API Gateway and AWS Lambda, with a MongoDB backend server; enabling information to be stored persistently in an online database. A Mongoose layer was installed and added to the API to configure the database connection. For testing purposes, a Google Chrome Extension Talend API Tester and the API testing environment on AWS was used. Further demonstrations will be in this documentation! <br />

## How does it operate?
There are essentially four actions the user can take: Create a post, Edit a post, View a post (either view all posts or view a specific one), and Delete a post. 
1. Create a post
`case: 'POST'`<br />
First, let's create a post. To do so, we must fill out the required information, which in this case is the name of the author, the content of the post, and the user-spcified password of the post. These information need to be in the Request Body, in JSON format. So, for instance, if we wish to add a post Minjae created that says Hello World! with the password minjae123, the following needs to be sent to be sent as the Request Body:
``` 
{
  "name": "Minjae",
  "content": "Hello World!",
  "password": "minjae123"
}
```
<img width="1244" alt="Screen Shot 2022-05-16 at 9 19 57 PM" src="https://user-images.githubusercontent.com/55883282/168708737-71b7efc4-cd0a-4009-bca2-263f728f5a19.png">
We can see that the post has beed added to the MongoDB database:
<img width="789" alt="Screen Shot 2022-05-16 at 9 28 59 PM" src="https://user-images.githubusercontent.com/55883282/168708933-e3b7c457-0aed-46e7-8896-011d1e7c57bf.png">
<br />As simple as that!

2. Edit a post 
`case: 'PUT'`<br />
To edit a post, we *need* a user-specified password for that post. We send this password as a Header along with the updated post information in the Request Body, similarly as we did to Create a post. Let's update the content body of our post to "Content updated":
<img width="934" alt="Screen Shot 2022-05-16 at 9 35 16 PM" src="https://user-images.githubusercontent.com/55883282/168710158-d47dcdf6-eba6-4b2e-aae3-51f37ef1d251.png">
<br />Success! We can see the changes in our database as well:
<img width="758" alt="Screen Shot 2022-05-16 at 9 40 42 PM" src="https://user-images.githubusercontent.com/55883282/168710463-31ca01c0-2211-45c5-ae26-1df9bdaf3067.png">
<br />

3. View a post (View all post or a Specific post)
`case: 'GET'`<br />
When we wish to view all of the posts, then we can use the GET method to access them. The run results of the method is:
<img width="896" alt="Screen Shot 2022-05-16 at 9 42 46 PM" src="https://user-images.githubusercontent.com/55883282/168710724-75a08fb4-21ae-40bb-b47a-21aba60ebbc9.png">
<br />
Now, if we wish to view a specific post, then we can add a forward slash (/) and a Post # to the MongoDB URL. Say we wish to view tagging information of Post #4. Then, we will get the following run results:
<img width="896" alt="Screen Shot 2022-05-16 at 9 43 21 PM" src="https://user-images.githubusercontent.com/55883282/168710749-af9a3f51-ac6b-4a6c-a655-c718979d89f0.png">
<br />

4. Delete a post.
`case: 'DELETE'`<br />
Now, let's delete the post we created. We currently have a total of 4 posts on our database. Deleting a post requires a password. Let's delete Post #4, which has the password "minjae123". Similar to editing posts, we will pass the password as a Header:
<img width="896" alt="Screen Shot 2022-05-16 at 9 46 47 PM" src="https://user-images.githubusercontent.com/55883282/168711533-73335e91-8244-49f9-9b00-dd8ab5cc149a.png">
<br />
Successfully deleted post! Now see our database: total number of posts has decreased from 4 to 3:
<img width="730" alt="Screen Shot 2022-05-16 at 9 47 43 PM" src="https://user-images.githubusercontent.com/55883282/168711614-57caead3-b2c9-4500-9c36-e471e74b587c.png">
