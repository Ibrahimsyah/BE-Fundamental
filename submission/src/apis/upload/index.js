const UploadHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'upload',
  version: '1.0',
  register: async (server, {service, validator}) => {
    const handler = new UploadHandler(service, validator);
    server.route(routes(handler));
  },
};
