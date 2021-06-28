require('dotenv').config();

const hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// APIS
const song = require('./apis/song');
const user = require('./apis/user');
const auth = require('./apis/authentication');
const playlist = require('./apis/playlist');
const collaboration = require('./apis/collaboration');
const _export = require('./apis/export');

// Songs
const SongService = require('./services/db/postgresql/SongService');
const songValidator = require('./validations/songs');

// Users
const UserService = require('./services/db/postgresql/UserService');
const userValidator = require('./validations/users');

// Authentications
const AuthService = require('./services/db/postgresql/AuthService');
const authValidator = require('./validations/authentications');

// Playlists
const PlaylistService = require('./services/db/postgresql/PlaylistService');
const playlistValidator = require('./validations/playlists');

// Collaboration
const CollaborationService = require('./services/db/postgresql/CollaborationService');
const collaborationValidator = require('./validations/collaborations');

// Export
const exportService = require('./services/messsage_queue/rabbitmq/ProducerService');
const exportValidator = require('./validations/export');

// Tokenizer
const tokenManager = require('./tokenizers/TokenManager');

// Caching
const RedisCachingService = require('./services/caching/RedisService');

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

  // Service Initialization
  const songService = new SongService();
  const userService = new UserService();
  const authService = new AuthService();
  const playlistService = new PlaylistService();
  const collaborationService = new CollaborationService();
  const redisCachingService = new RedisCachingService();

  // Song Plugin
  const songPlugin = {
    plugin: song,
    options: {
      service: songService,
      validator: songValidator,
    },
  };

  // User Plugin
  const userPlugin = {
    plugin: user,
    options: {
      service: userService,
      validator: userValidator,
    },
  };

  // Auth Plugin
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
  const playlistPlugin = {
    plugin: playlist,
    options: {
      service: playlistService,
      validator: playlistValidator,
      cachingService: redisCachingService,
    },
  };

  // Collaboration Plugin
  const collaborationPlugin = {
    plugin: collaboration,
    options: {
      playlistService,
      collaborationService,
      collaborationValidator,
    },
  };

  // Export Plugin
  const exportPlugin = {
    plugin: _export,
    options: {
      exportService,
      playlistService: playlistService,
      validator: exportValidator,
    },
  };

  await server.register([songPlugin, userPlugin, authPlugin, playlistPlugin, collaborationPlugin, exportPlugin]);
  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

startServer();
