exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      primaryKey: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
};
