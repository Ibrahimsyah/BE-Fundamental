module.exports = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.addSong,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getAllSongs,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongById,
  },
];
