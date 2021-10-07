/******************************************************************
 * @file         notes.controller.js
 * @description  Class belong to use for taking the request from the client and
 *               gives the response and validating whether the input is correct or not.
 * @author       Ganesh
 * ***************************************************************/
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
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
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
}

module.exports = new Note();
