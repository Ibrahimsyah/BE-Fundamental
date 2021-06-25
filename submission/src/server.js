require('dotenv').config();

const hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// APIS
const song = require('./apis/song');
const user = require('./apis/user');
const auth = require('./apis/authentications');
const playlist = require('./apis/playlist');

// Songs
const SongService = require('./services/postgresql/SongService');
const songValidator = require('./validations/songs');

// Users
const UserService = require('./services/postgresql/UserService');
const userValidator = require('./validations/users');

// Authentications
const AuthService = require('./services/postgresql/AuthService');
const authValidator = require('./validations/authentications');

// Playlists
const PlaylistService = require('./services/postgresql/PlaylistService');
const playlistValidator = require('./validations/playlist');

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

  await server.register(Jwt);
  server.auth.strategy('musicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE || 14400,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // Song Plugin
  const songService = new SongService();
  const songPlugin = {
    plugin: song,
    options: {
      service: songService,
      validator: songValidator,
    },
  };

  // User Plugin
  const userService = new UserService();
  const userPlugin = {
    plugin: user,
    options: {
      service: userService,
      validator: userValidator,
    },
  };
  // Auth Plugin
  const authService = new AuthService();
  const authPlugin = {
    plugin: auth,
    options: {
      authService: authService,
      userService: userService,
      tokenManager: tokenManager,
      validator: authValidator,
    },
  };

  // Playlist Plugin
  const playlistService = new PlaylistService();
  const playlistPlugin = {
    plugin: playlist,
    options: {
      service: playlistService,
      validator: playlistValidator,
    },
  };

  await server.register([songPlugin, userPlugin, authPlugin, playlistPlugin]);
  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

startServer();
