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
 * Test case for Registration APIs
 */
describe("Registration API", () => {
  it("whenGivenDetailsCorrectUserShuoldRegisterSuccessfully", (done) => {
    const userDB = data.registration.user;
    chai
      .request(server)
      .post("/register")
      .send(userDB)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message").eql("User Registered successfully");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

  it("whenGivenDetailsHaveDuplicateUserShuoldReturnUserExist", (done) => {
    const userDB = data.registration.user;
    chai
      .request(server)
      .post("/register")
      .send(userDB)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("message").eql("User already exits");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("whenGivenDetailWithoutEmailShouldReturnEmailRequired", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.withoutEmail)
      .end((err, res) => {
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("whenGivenDetailWithoutFirstNameShouldReturnFirstNameRequired", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.withoutFn)
      .end((err, res) => {
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("WhenGivenEmailDoesNotMatchwithRegexShouldReturnStatus(422)", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.withoutEmail)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});
