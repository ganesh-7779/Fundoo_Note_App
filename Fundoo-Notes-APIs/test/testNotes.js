
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

// get all notes API test case
describe("Create Notes API", () => {
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
