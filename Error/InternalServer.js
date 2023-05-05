const { ERROR_INTERNAL_SERVER } = require('../utils/constants');

class InternalServer extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_INTERNAL_SERVER;
  }
}

module.exports = InternalServer;
