module.exports = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.addUser,
  },
];
