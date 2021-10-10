/******************************************************************
 * @file         notes.controller.js
 * @description  Class belong to use for taking the request from the client and
 *               gives the response and validating whether the input is correct or not.
 * @author       Ganesh
 * ***************************************************************/
// const { error } = require("../logger/logger");
const noteService = require("../service/note.service");
class Note {
  /**
     * @description createNote function is for create notes into the database
     * @param {*} req valid req body is expected
     * @param {*} res for valid and invalid responce to client
     * @returns response
     */
  createNote = (req, res) => {
    try {
      if ((!req.body.title) || (!req.body.description)) {
        return res.status(400).send({
          success: false,
          message: "Please fill details..! Note can not be empty"
        });
      };
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      console.log(note);
      noteService.createNote(note, (err, data) => {
        if (err) {
          return res.status(500).json({
            message: "failed to post note",
            success: false
          });
        } else {
          return res.status(201).send({
            message: "Successfully inserted note",
            success: true,
            data: data
          });
        }
      });
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false
      });
    }
  };

  /**
  * @description function written to get all the notes from the database
  * @param {*} req nothing to pass in req.body
  * @param {*} res should be success true
  * @returns response status 200
  */
  getAllNotes = (req, res) => {
    try {
      const userId = { id: req.user.dataForToken.id };
      console.log((userId) + "  controller");
      noteService.serGetAllNotes((userId), (error, userNotes) => {
        if (error) {
          res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
          });
        } else {
          res.status(200).send({
            success: true,
            message: "Here is your all Notes",
            notes: userNotes
          });
        }
      });
    } catch (error) {
      return error;
    }
  }

  getById = (req, res) => {
    const note = req.params.noteID;
    console.log(note);
    try {
      const id = { userId: req.user.dataForToken.id, noteID: req.params.noteID };
      console.log(id);

      noteService.getById((id), (error, note) => {
        if (error) {
          res.status(500).send({
            message: error.message || "Some error occurred while retrieving note."
          });
        } else {
          res.status(200).send({
            success: true,
            message: "Here is your Note",
            notes: note
          });
        }
      });
    } catch (error) {
      return error;
    }
  }

  updateNote = (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteID: req.params.noteID, title: req.body.title, description: req.body.description };

      noteService.serUpdateNote((id), (error, data) => {
        if (error) {
          // logger.error("failed to update note");
          return res.status(400).json({
            message: "failed to update note",
            success: false
          });
        } else {
          // logger.info("Successfully inserted note");
          return res.status(201).send({
            message: "Successfully update note",
            success: true,
            data: data
          });
        }
      });
    } catch {
    //  logger.error("Internal server error");
      return res.status(500).json({
        message: "Error occured",
        success: false
      });
    }
  }
}

module.exports = new Note();
