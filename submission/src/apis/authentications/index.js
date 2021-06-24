const AuthenticationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentication',
  version: '1.0',
  register: async (server, {authService, userService, tokenManager, validator}) => {
    const handler = new AuthenticationHandler(authService, userService, tokenManager, validator);
    server.route(routes(handler));
  },
};
