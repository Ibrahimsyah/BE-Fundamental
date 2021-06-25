module.exports = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.addCollaborator,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];
