
/******************************************************************
 * @module       Model
 * @file         testNotes.js
 * @description  Test cases for create notes APIs
 * @author       Ganesh
********************************************************************/
/* eslint-disable node/handle-callback-err */
/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const noteDB = require("./note.json");
const faker = require("faker");
const server = require("../server");

chai.should();
chai.use(chaiHttp);
// test case for create Note API
describe("Create Notes API", () => {
  it("when_Token_Is_valid", (done) => {
    const token = noteDB.notes.validToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("when_Token_Is_Invalid", (done) => {
    const token = noteDB.notes.invalidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// test case for get all Note API
describe("Get All Notes API", () => {
  it("when_Token_Is_valid", (done) => {
    const token = noteDB.notes.validToken;
    chai
      .request(server)
      .get("/getAllNotes")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("when_Token_Is_Invalid", (done) => {
    const token = noteDB.notes.invalidToken;
    chai
      .request(server)
      .get("/getAllNotes")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// test case for get Note by id API
describe("Get Note By ID API", () => {
  it("when_TokenAndID_isValid_Should_returnNote", (done) => {
    const token = noteDB.getById.token;
    chai.request(server)
      .get("/getByID/6162daed1efba999528a46f2")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("when_ID_isInValid_ShouldNot_returnNote", (done) => {
    const token = noteDB.getById.token;
    chai.request(server)
      .get("/getByID/6162daed1efba999528a462")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
  it("when_Token_isInValid_ShouldNot_returnNote", (done) => {
    const token = noteDB.getById.Intoken;
    chai.request(server)
      .get("/getByID/6162daed1efba999528a46f2")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe("Get Note By ID API", () => {
});
