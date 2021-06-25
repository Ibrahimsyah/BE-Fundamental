module.exports = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.addCollaborator,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborator,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];
