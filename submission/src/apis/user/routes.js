module.exports = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.addUser,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getAllSongs,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getSongById,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.editSongById,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteSongById,
  },
];
