module.exports = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.addSong,
  },
];
