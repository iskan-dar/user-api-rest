## users_api
---
This REST API is implemented using NodeJS Express PostgreSQL and Sequelize ORM.

#### Endpoints for testing CRUD operations
`'/api/v1/users'` - (GET) get all users;
`'/api/v1/users'` - (POST) create a new user;
`'/api/v1/users/:id'` - (GET) get user by id;
`'/api/v1/users/:id'` - (PUT) update/replace an existing user or create if doesn't exist;
`'/api/v1/users/:id'` - (PATCH) update a field or some fields of an existing user;
`'/api/v1/users/:id'` - (DELETE) delete an existing user by specified id;
---

#### To run project locally, please, install all dependencies with `npm install` command
#### Do not forget to create dotenv file according to .envSample

#### Commands to create, seed and delete the database
- `npm run create:db` to create database;
- `npm run create:tables` to create tables;
- `npm run seed:tables` to seed tables;
- `npm run delete:db` to delete database;

#### Have a look at my projects
- `Crossy Road CV` https://iskan-dar.github.io/crossy-road-threejs-reactjs/
- `Fun Ai` https://fun-ai.herokuapp.com/
- `Galactic miniatures` https://github.com/iskan-dar/galactic_miniatures
