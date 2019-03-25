module.exports = {
  /**
   * @param {number} nDays
   * @returns {Date} Returns a date `nDays` after
   */
  generateDate: nDays => {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * nDays);
  }
};
