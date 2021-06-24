require('dotenv').config();
const hapi = require('@hapi/hapi');
const song = require('./apis/song');
const user = require('./apis/user');
const auth = require('./apis/authentications');

// Songs
const SongService = require('./services/postgresql/SongService');
const songValidator = require('./validations/songs');

// Users
const UserService = require('./services/postgresql/UserService');
const userValidator = require('./validations/users');

// Authentications
const AuthService = require('./services/postgresql/AuthService');
const authValidator = require('./validations/authentications');

// Tokenizer
const tokenManager = require('./tokenizers/TokenManager');

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

  // User Plugin
  const userService = new UserService();
  await server.register({
    plugin: user,
    options: {
      service: userService,
      validator: userValidator,
    },
  });

  // Auth Plugin
  const authService = new AuthService();
  await server.register({
    plugin: auth,
    options: {
      authService: authService,
      userService: userService,
      tokenManager: tokenManager,
      validator: authValidator,
    },
  });

  // Start Server
  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

startServer();
