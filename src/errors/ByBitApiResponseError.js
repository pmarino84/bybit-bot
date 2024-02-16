const CustomError = require("./CustomError");

class ByBitApiResponseError extends CustomError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}
module.exports = ByBitApiResponseError;
