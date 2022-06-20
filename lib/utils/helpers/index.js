const moment = require("moment");
const crypto = require("crypto");
const ForbiddenError = require("../errors/ForbiddenError");
const InvalidResourceError = require("../errors/InvalidResourceError");
const NotAcceptableError = require("../errors/NotAcceptableError");
const ServerError = require("../errors/ServerError");
const ServiceUnavailableError = require("../errors/ServiceUnavailableError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const InvalidPayloadError = require("../errors/InvalidPayloadError");

/**
 * @class Helper
 */
class Helper {
  /**
   *
   * @returns {String} - a random id
   */
  generateUniqueId() {
    return (
      moment().format("YYYYMMDDHHmm") +
      "" +
      crypto.randomBytes(10).toString("hex")
    );
  }

  /**
   *
   * @param {object} error - The error object
   * @returns {Object} - The an error instance
   * @memberof Helper
   */
  handleError(error) {
    console.log(error);
    const errordata = error.response.data.error;
    // console.log(error)

    switch (error.response.status) {
      case 401:
        throw new UnauthorizedError({ message: error.response.data });
      case 403:
        throw new ForbiddenError({ message: error.response.data });
      case 404:
        throw new InvalidResourceError({ message: error.response.data });
      case 406:
        throw new NotAcceptableError({ message: error.response.data });
      case 422:
        Object.keys(errordata).forEach((key) => {
          throw new InvalidPayloadError({ message: errordata[key] });
        });
        break;
      case 503:
        throw new ServiceUnavailableError({ message: error.response.data });
      default:
        throw new ServerError({ message: error.response.data });
    }
  }
}

module.exports = Helper;
