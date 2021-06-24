module.exports = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuth,
  },
  // {
  //   method: 'GET',
  //   path: '/authentications',
  //   handler: handler.getAllSongs,
  // },
  // {
  //   method: 'GET',
  //   path: '/authentications/{id}',
  //   handler: handler.getSongById,
  // },
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
