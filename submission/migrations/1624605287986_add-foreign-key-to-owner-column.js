/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('insert into users(id, username, password, fullname) values(\'a\', \'a\', \'a\', \'a\')');
  pgm.sql('update playlists set owner = \'a\' where owner = NULL');
  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
  pgm.sql('UPDATE playlists SET owner = NULL WHERE owner = \'a\'');
  pgm.sql('DELETE FROM users WHERE id = \'a\'');
};
