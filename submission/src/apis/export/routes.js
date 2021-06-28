module.exports = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.exportPlaylist,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];
