const chai = require("chai");
const { generateDate } = require("../utils");

chai.should();

describe.only("generateDate", () => {
  it("should return a date in the future", () => {
    const today = new Date().getDate();
    generateDate(5)
      .getDate()
      .should.equal(today + 5);
  });
});
