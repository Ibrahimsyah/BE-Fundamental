const {generateError, responseSuccessWithData, responseSuccessNoData} = require('../../utils/ResponseHandler');

class AuthenticationHandler {
  constructor(authService, userService, tokenManager, validator) {
    this._authService = authService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;
    this.postAuth = this.postAuth.bind(this);
    this.putAuth = this.putAuth.bind(this);
    this.deleteAuth = this.deleteAuth.bind(this);
  }

  async postAuth(request, h) {
    try {
      this._validator.validatePostPayload(request.payload);
      const {username, password} = request.payload;

      const id = await this._userService.verifyUserAuth(username, password);

      const accessToken = this._tokenManager.generateAccessToken(id);
      const refreshToken = this._tokenManager.generateRefreshToken(id);
      await this._authService.addRefreshToken(refreshToken);

      const response = responseSuccessWithData(h,
          {accessToken, refreshToken},
          'Authentication berhasil ditambahkan', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async putAuth(request, h) {
    try {
      this._validator.validatePutPayload(request.payload);

      const {refreshToken} = request.payload;
      await this._authService.verifyRefreshToken(refreshToken);

      const id = this._tokenManager.validateRefreshToken(refreshToken);
      const accessToken = this._tokenManager.generateAccessToken(id);
      const response = responseSuccessWithData(h,
          {accessToken},
          'Authentication berhasil diperbarui', 200);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async deleteAuth(request, h) {
    try {
      this._validator.validateDeletePayload(request.payload);
      const {refreshToken} = request.payload;

      await this._authService.verifyRefreshToken(refreshToken);
      await this._authService.deleteRefreshToken(refreshToken);
      const response = responseSuccessNoData(h, 'Refresh token berhasil dihapus', 200);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = AuthenticationHandler;
