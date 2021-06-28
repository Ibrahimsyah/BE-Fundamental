exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(12)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(15)',
      references: 'playlists(id)',
    },
    user_id: {
      type: 'VARCHAR(10)',
      references: 'users(id)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
