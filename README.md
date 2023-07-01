# Social-Meida-App

## Technologies Used

- React
- Nodejs
- MongoDB
- Material UI
- Redux Toolkit
- JSON Web Token
- Chat Engine io

## Description

My website is a full-stack and fully responsive application built with React as the frontend framework, Node.js for the backend, and MongoDB Atlas as the remote database. 
It utilizes Material UI for stylish frontend designs, Redux for efficient state management, and JSON Web Token for secure user authentication and authorization. 
Experience seamless functionality, beautiful UI, and robust security in our comprehensive web solution.

## Features
My website enables users to upload photos, create posts, interact through likes and comments, and build friend lists.

HomePage
![Home Page](https://github.com/ayushanandmishra/Social-Meida-App/assets/107947490/43a6ccf0-cc96-4bba-88d5-be9826256ed1)

LoginPage
![Login Page](https://github.com/ayushanandmishra/Social-Meida-App/assets/107947490/0d37ad1a-e041-4190-a24f-79abc092bea5)

Redux
![redux](https://github.com/ayushanandmishra/Social-Meida-App/assets/107947490/a3d18331-dd9e-4f56-b1bd-668f69ac064b)

## Chat Feature
You can chat whoever you want on the app in real time. Your messages will be saved and can be retrived later

Chat Window
![Screenshot (259)](https://github.com/ayushanandmishra/Social-Meida-App/assets/107947490/3b54309f-c0b0-4413-85e8-87426f718183)


## Run Locally

Installling this project locally in you system might be a challenge because the database I've used is mongodb atlas which is a remote database and is accessible only through a special password. If you wish to run this project locally you will need to create your own account on mongodb atlas after which you will be provied with your own database link.
You will just need to replace my link with yours in the index.js file in the server folder on line 78.

```bash
  Replace process.env.MONGO_URL with your mongodb atlas link
```
    

