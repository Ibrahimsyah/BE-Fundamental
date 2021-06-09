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
];
