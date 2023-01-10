# Barty Case - Documentation

This document describes how to deploy the Barty Case application.

## Prerequisites

- MongoDB Atlas account
- Node.js (>= LTS)
- Git & Github account

## Installation

- Install Node.js

```bash
nvm install node
```

- Clone the repository

```bash
git clone https://github.com/dgnydn/barty-case.git
```

- Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

- Create a `.env` file in the root directory and add the following environment variables

```bash
DATABASE_URL=<your-mongodb-uri>
SECRET=<your-very-secret-secret-word>
```

- Run the application

```bash
npm run dev
```

or

```bash
pnpm dev
```

## Deployment

- Create a new repository on Github

- Add the remote repository

```bash
git remote add origin <your-github-repository-url>
```

- Push the code to the remote repository

```bash
git push -u origin master
```

- Create a new Vercel project
- Connect the Vercel project to the Github repository
- Push!

# API Documentation

You can access to API documentation by visiting the `/swagger` or `/api/swagger` routes.

# Postman Import

You can import the Postman collection from `./postman.json` file.

# License

MIT License

If you have any questions, please contact me at [dogan1aydin@gmail.com](mailto:dogan1aydin@gmail.com?subject=[GitHub]%20Barty%20Case%20-%20Documentation&body=Hi%20Doğan%2C%0A%0A)
