exports.up = (pgm) => {
  pgm.createTable('song_playlists', {
    song_id: {
      type: 'VARCHAR(10)',
      references: 'songs(id)',
    },
    playlist_id: {
      type: 'VARCHAR(15)',
      references: 'playlists(id)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('song_playlists');
};
