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
  it("whenGivenDetails_CorrectUserShuold_RegisterSuccessfully", (done) => {
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

  it("whenGivenDetails_HaveDuplicateUser_ShuoldReturnUserExist", (done) => {
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

  it("whenGivenDetail_WithoutEmail_ShouldReturn_EmailRequired", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.withoutEmail)
      .end((err, res) => {
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("whenGivenDetail_WithoutFirstName_ShouldReturn_FirstNameRequired", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.withoutFn)
      .end((err, res) => {
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("whenGivenDetail_WithoutLastName_ShouldReturn_LastNameRequired", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.withoutLn)
      .end((err, res) => {
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("WhenGivenEmail_DoesNotMatch_withRegex_ShouldReturnStatus(422)", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.WrongEmail)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("WhenGivenFirstName_DoesNotMatch_withRegex_ShouldReturnStatus(422)", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.WrongFn)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("WhenGivenLastName_DoesNotMatch_withRegex_ShouldReturnStatus(422)", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.WrongLn)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("WhenGivenPassword_DoesNotMatch_withRegex_ShouldReturnStatus(422)", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(data.registration.WrongPass)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});

// login test case
