require('dotenv').config();
const hapi = require('@hapi/hapi');

// Notes
const notes = require('./api/notes');
const NotesService = require('./services/pg/NotesService');
const NotesValidator = require('./validator/notes');


// Users
const users = require('./api/users');
const usersService = require('./services/pg/UsersService');
const UsersValidator = require('./validator/users');


const init = async () => {
  const notesService = new NotesService();

  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.register({
    plugin: users,
    options: {
      service: usersService,
      validator: UsersValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
