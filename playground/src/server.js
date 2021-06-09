const hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/pg/NotesService');
const NotesValidator = require('./validator/notes');
require('dotenv').config();

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

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
