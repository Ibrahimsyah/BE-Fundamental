const CollaborationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0',
  register: async (server, {playlistService, collaborationService, validator}) => {
    const handler = new CollaborationHandler(playlistService, collaborationService, validator);
    server.route(routes(handler));
  },
};
