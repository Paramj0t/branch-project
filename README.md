# branch-project (Customer Support)

1) Agent Authentication.
![Image 1](https://github.com/Paramj0t/branch-project/blob/master/img1.png)  

2) All the tickets.
![Image 1](https://github.com/Paramj0t/branch-project/blob/master/img2.png)  

3) Agent Solving issue of customer.
![Image 3](https://github.com/Paramj0t/branch-project/blob/master/img3.png)

4) Agent Closing tikcet after issue is resolved.
![Image 4](https://github.com/Paramj0t/branch-project/blob/master/img4.png)

Customer Support is a website where agents can solve issues of customers.

This project was created using React, Node.js, Express, MongoDB, and Material-UI. Firebase was used to handle authentication.

## Features

- Ticket Number, User Name, Customer Query, Time at which ticket is created and status will be displayed to the agent.
- Agent can chat with the customer on clicking the ticket.
- Agent can close the ticket after the query is resolved.
- Authentication is provided with help of firebase.
- The application can be connected to android App using APIs.

## Run it locally

1. Clone the repo on your system.
2. Go into branch-frontend run - npm install.
3. Go into branch-backend run - npm install.
4. Provide your credentials of mongoDB, firebase and Pusher as mention in .env_samples in your .env file.
5. Go into branch-backend run - node server.js to run the backend of the application.
6. Go into branch-frontend run - npm start to run the frontend and then view http://localhost:3000/login.
