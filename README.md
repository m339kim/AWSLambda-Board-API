# Online Forum API
## Overview
<img width="1128" alt="Screen Shot 2022-05-16 at 8 03 49 PM" src="https://user-images.githubusercontent.com/55883282/168701496-4afb17ff-09e9-4e05-92ae-da73caf49442.png">
The Online Forum API is a REST API created using AWS Lambda that allows users to easily create, edit, view or delete an online post on an Online Forum. The data or commands users send are stored on an online database, so that the information can be accessed via internect connection.

## Tools Utilized
This RESTful API is fully written in JavaScript. It is built using AWS API Gateway and AWS Lambda, with a MongoDB backend server; enabling information to be stored persistently in an online database. A Mongoose layer was installed and added to the API to configure the database connection. For testing purposes, a Google Chrome Extension Talend API Tester and the API testing environment on AWS was used. Further demonstrations will be in this documentation! <br />

## How does it operate?
There are essentially four actions the user can take: Create a post, Edit a post, View a post (either view all posts or view a specific one), and Delete a post. 
1. Create a post
   * `case: 'POST'`
First, let's create a post. To do so, we must fill out the required information, which in this case is the name of the author, the content of the post, and the user-spcified password of the post. These information need to be in the Request Body, in JSON format. So, for instance, if we wish to add a post Minjae created that says Hello World! with the password minjae123, the following needs to be sent to be sent as the Request Body:
``` 
{
  "name": "Minjae",
  "content": "Hello World!",
  "password": "minjae123"
}
```


2. Edit a post 
   * `case: 'PUT'`
To edit a post, we *need* a user-specified password for that post. For testing this method, 
3. View a post (View all post or a Specific post)
   * `case: 'GET'`
When we wish to view all of the posts, then we can use the GET method to access them. The run results of the method is:
<img width="899" alt="Screen Shot 2022-05-16 at 9 00 18 PM" src="https://user-images.githubusercontent.com/55883282/168707332-b1fdfe46-44e4-481b-a2b3-b5f10a0a5ace.png">
Now, if we wish to view a specific post, then we can add a forward slash (/) and a Post # to the MongoDB URL. Say we wish to view tagging information of Post #3. Then, we will get the following run results:
<img width="899" alt="Screen Shot 2022-05-16 at 9 11 20 PM" src="https://user-images.githubusercontent.com/55883282/168707339-bccd8666-6c29-4264-964c-fef5e51983b1.png"> 
<br />

4. Delete a post.
   * `case: 'DELETE'`

## Overcoming obstacles
