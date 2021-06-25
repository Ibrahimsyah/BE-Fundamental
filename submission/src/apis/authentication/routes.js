module.exports = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuth,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuth,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuth,
  },
];
