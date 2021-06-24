/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('songs', {
    owner: {
      type: 'VARCHAR(10)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('songs');
};
