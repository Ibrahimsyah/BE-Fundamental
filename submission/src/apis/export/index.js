const ExportHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'export',
  version: '1.0',
  register: async (server, {exportService, playlistService, validator}) => {
    const handler = new ExportHandler(exportService, playlistService, validator);
    server.route(routes(handler));
  },
};
