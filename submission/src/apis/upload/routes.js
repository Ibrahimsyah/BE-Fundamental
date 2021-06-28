const path = require('path');

module.exports = (handler) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    handler: handler.uploadImage,
    options: {
      payload: {
        maxBytes: 1000 * 500,
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/images/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../../../upload/images'),
      },
    },
  },
];
