/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('authentications', {
    refreshToken: {
      type: 'TEXT',
      primaryKey: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications')
};
