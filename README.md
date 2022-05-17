# Online Forum API
## Overview
<img width="1128" alt="Screen Shot 2022-05-16 at 8 03 49 PM" src="https://user-images.githubusercontent.com/55883282/168701496-4afb17ff-09e9-4e05-92ae-da73caf49442.png">
The Online Forum API is a REST API created using AWS Lambda that allows users to easily create, edit, view or delete an online post on an Online Forum. The data or commands users send are stored on an online database, so that the information can be accessed via internect connection.

## Tools Utilized
This RESTful API is fully written in JavaScript. It is built using AWS API Gateway and AWS Lambda, with a MongoDB backend server; enabling information to be stored persistently in an online database. A Mongoose layer was installed and added to the API to configure the database connection. For testing purposes, a Google Chrome Extension Talend API Tester was used. Further demonstrations will be in this documentation! <br />

## How does it operate?
There are essentially four actions the user can take: Create a post, Edit a post, View a post (either view all posts or view a specific one), and Delete a post. 
1. Create a post
   * `case: 'POST'`
dkfskld


2. Edit a post 
   * `case: 'PUT'`
3. View a post (View all post or a Specific post)
   * `case: 'GET'`
4. Delete a post.
   * `case: 'DELETE'`

## Overcoming obstacles
