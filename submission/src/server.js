require('dotenv').config();
const hapi = require('@hapi/hapi');
const song = require('./apis/song');

const SongService = require('./services/postgresql/SongService');
const songValidator = require('./validations/songs');

const startServer = async () => {
  const server = hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Plugin initialization
  // Song Plugin
  const songService = new SongService();
  await server.register({
    plugin: song,
    options: {
      service: songService,
      validator: songValidator,
    },
  });

  // Start Server
  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

startServer();
