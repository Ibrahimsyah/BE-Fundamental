const PlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0',
  register: async (server, {service, validator, cachingService}) => {
    const handler = new PlaylistHandler(service, validator, cachingService);
    server.route(routes(handler));
  },
};
