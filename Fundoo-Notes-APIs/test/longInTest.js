/* eslint-disable eol-last */
/* eslint-disable node/handle-callback-err */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("./data.json");

chai.should();
chai.use(chaiHttp);
/*
 * Tase case for login APIs
 */

describe("Login API", () => {
  it("whenGivenLoginInfoCorrectUserShouldLoggedInSuccessfully", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(data.userLogin.loginInfo)
      .end((error, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message").eql("User logged in successfully");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

  it("WhenGivenLoginInfoPasswordWrongShouldReturnUnableToLoging", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(data.userLogin.wrongPassLI)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Unable to login. Please enter correct info");
        done();
      });
  });
});