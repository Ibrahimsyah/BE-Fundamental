const ClientError = require('../exceptions/ClientError');

const responseSuccessWithData = (h, data, message, statusCode = 200) => {
  const response = h.response({
    status: 'success',
    message,
    data,
  });
  response.code(statusCode);
  return response;
};

const responseSuccessNoData = (h, message, statusCode = 200) => {
  const response = h.response({
    status: 'success',
    message,
  });
  response.code(statusCode);
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


module.exports = {responseSuccessWithData, responseSuccessNoData, generateError};
