const ClientError = require('../exceptions/ClientError');

const responseSuccessWithData = (h, message, data) => {
  const response = h.response({
    status: 'success',
    message,
    data,
  });
  response.code(201);
  return response;
};

const generateError = (error, h) => {
  if (error instanceof ClientError) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(error.statusCode);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Maaf, terjadi kegagalan pada server kami.',
  });
  response.code(500);
  console.error(error);
  return response;
};


module.exports = {responseSuccessWithData, generateError};
