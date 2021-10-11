
/******************************************************************
 * @module       Model
 * @file         testNotes.js
 * @description  Test cases for CRUD operation APIs
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
        res.should.have.status(401);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Some error occurred while retrieving note.");
        done();
      });
  });
  it("when_Token_isInValid_Should_returnInvalidToken", (done) => {
    const token = noteDB.getById.Intoken;
    chai.request(server)
      .get("/getByID/6162daed1efba999528a46f2")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
});

// test cases for update note by id

describe("Update Note By ID API", (done) => {
  it("when_givenDetails_isValid_Should_returnUpadatedNote", (done) => {
    const token = noteDB.getById.token;
    const UpdatedNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai.request(server)
      .put("/updateNoteById/6162daed1efba999528a46f2")
      .set({ authorization: token })
      .send(UpdatedNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("when_givenToken_isInValid_Should_return_InvalidToken", (done) => {
    const token = noteDB.getById.Intoken;
    const UpdatedNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai.request(server)
      .put("/updateNoteById/6162daed1efba999528a46f2")
      .set({ authorization: token })
      .send(UpdatedNotes)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
  it("when_givenNoteID_isInValid_Should_return_failedTo_UpadateNote", (done) => {
    const token = noteDB.getById.token;
    const UpdatedNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai.request(server)
      .put("/updateNoteById/6162daed1efba999528a46f")
      .set({ authorization: token })
      .send(UpdatedNotes)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("failed to update note");
        done();
      });
  });
});

// test cases for delete note by id
describe("Delete Note By ID API", () => {
  // it("when_TokenAndID_isValid_Should_return_DeleteNote_Sucessfully", (done) => {
  //   const token = noteDB.getById.token;
  //   chai.request(server)
  //     .delete("/deleteByID/6162dea5f7dd09d189ffdf4e")
  //     .set({ authorization: token })
  //     .end((err, res) => {
  //       res.should.have.status(204);
  //       res.body.should.have.property("success").eql(true);
  //       res.body.should.have.property("message").eql("Note Deleted successfully");
  //       done();
  //     });
  // });
  it("when_ID_isInValid_ShouldNot_DeleteNote", (done) => {
    const token = noteDB.getById.token;
    chai.request(server)
      .delete("/deleteByID/6162daed1efba999528a4")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message").eql("Some error occurred while retrieving note.");
        done();
      });
  });
  it("when_Token_isInValid_Should_returnInvalidToken", (done) => {
    const token = noteDB.getById.Intoken;
    chai.request(server)
      .delete("/deleteByID/6162daed1efba999528a46f2")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        res.body.should.have.property("message").eql("Invalid Token");
        done();
      });
  });
});
