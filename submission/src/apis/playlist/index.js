const SongHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0',
  register: async (server, {service, validator}) => {
    const handler = new SongHandler(service, validator);
    server.route(routes(handler));
  },
};
