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
  it("whenGiven_LoginInfo_CorrectUserShould_LoggedInSuccessfully", (done) => {
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

  it("WhenGiven_LoginInfoPasswordWrong_ShouldReturn_UnableToLoging", (done) => {
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
  it("WhenGiven_LoginInfoEmaiWrong_ShouldReturn_UnableToLoging", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(data.userLogin.wrongEmail)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Unable to login. Please enter correct info");
        done();
      });
  });
  it("WhenGivenPass_DoesNotMatch_withRegex_ShouldReturnStatus(422)", (done) => {
    chai
      .request(server)
      .post("/login")
      .send(data.userLogin.wrongPassER)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});

/*
 * Tase case for forget password APIs
 */

describe("Forget Password API Test Case", () => {
  it("ForgetPassword_WithValidEmail_ShouldReturn_EmailSent", (done) => {
    const user = data.userLogin.validEmail;
    chai
      .request(server)
      .post("/forgotPassword")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Email reset link sent succesfully");
        done();
      });
  });
  it("ForgetPassword_WithInValidEmail_ShouldReturn_error", (done) => {
    const user = data.userLogin.invalidEmail;
    chai
      .request(server)
      .post("/forgotPassword")
      .send(user)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

describe("Reset Password API", () => {
  it("givenResetDetails_whenproper_shouldReturn_ResetPasswordSuccessfully", (done) => {
    const resetPassword = data.userLogin.validDetails;
    console.log(resetPassword);
    chai
      .request(server)
      .put("/resetPassword")
      .send(resetPassword)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givenResetDetails_whenproper_shouldReturn_ResetPasswordSuccessfully", (done) => {
    const resetPassword = data.userLogin.InvalidDetails;
    console.log(resetPassword);
    chai
      .request(server)
      .put("/resetPassword")
      .send(resetPassword)
      .end((error, res) => {
        res.should.have.status(422);
        done();
      });
  });
});