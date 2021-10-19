/* eslint-disable comma-dangle */
/******************************************************************
 * @file         notes.controller.js
 * @description  Class belong to use for taking the request from the client and
 *               gives the response and validating whether the input is correct or not.
 * @author       Ganesh
 * ***************************************************************/
const noteService = require("../service/note.service");
const logger = require("../logger/logger");
const validation = require("../helper/user.validation");
const labelController = require("../controllers/label.controller");
const UserModel = require("../models/user.model");
const redis = require("redis");
const client = redis.createClient();
const clearRedis = require("../helper/redis");

class Note {
  /**
   * @description createNote function is for create notes into the database
   * @param {*} req valid req body is expected
   * @param {*} res for valid and invalid responce to client
   * @returns response
   */
  createNote = (req, res) => {
    try {
      if (!req.body.title || !req.body.description) {
        return res.status(400).send({
          success: false,
          message: "Please fill details..! Note can not be empty",
        });
      }
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description,
      };
      const loginValidation = validation.noteValidation.validate(req.body);
      if (loginValidation.error) {
        logger.error(loginValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid label input",
        });
        return;
      }
      console.log(note);
      noteService.createNote(note, (err, data) => {
        if (err) {
          logger.error(err);
          return res.status(401).json({
            message: "failed to post note",
            success: false,
          });
        } else {
          logger.info("Successfully inserted note");
          return res.status(201).send({
            message: "Successfully inserted note",
            success: true,
            data: data,
          });
        }
      });
    } catch {
      return res.status(500).json({
        message: "Error occured",
        success: false,
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
      console.log(userId + "  controller");
      noteService.serGetAllNotes(userId, (error, userNotes) => {
        if (error) {
          logger.error(error);
          res.status(401).send({
            message:
              error.message || "Some error occurred while retrieving notes.",
          });
        } else {
          logger.info("Here is your all Note");
          client.setex("data", 60, JSON.stringify(userNotes));
          res.status(200).send({
            success: true,
            message: "Here is your all Notes",
            notes: userNotes,
          });
        }
      });
    } catch (error) {
      return error;
    }
  };

  /**
   * @description @getById this function written for get notes using note id and userid
   * @param {*} req shoild contain note id and userID
   * @param {*} res
   * @returns response with note detailes
   */
  getById = (req, res) => {
    // const note = req.params.noteID;
    // console.log(note);
    try {
      const id = {
        userId: req.user.dataForToken.id,
        noteID: req.params.noteID,
      };
      // console.log(id);
      const noteValidation = validation.getNoteValidation.validate(id);
      if (noteValidation.error) {
        logger.error(noteValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid note input",
        });
        return;
      }
      noteService.getById(id, (error, note) => {
        if (error) {
          // logger.error(error);
          // error.message ||
          res.status(401).send({
            success: false,
            message: "Some error occurred while retrieving note.",
          });
        } else {
          logger.info("Here is your Note");
          console.log(note);
          client.setex("data", 60, JSON.stringify(note));
          res.status(200).send({
            success: true,
            message: "Here is your Note",
            notes: note,
          });
        }
      });
    } catch (error) {
      return error;
    }
  };

  /**
   * @description serUpdateNote this function written for update notes using ID note id
   * @param {*} req shoild contain note id and title an description of note
   * @param {*} res
   * @returns response should coantain updated note
   */
  updateNote = (req, res) => {
    try {
      const id = {
        userId: req.user.dataForToken.id,
        noteID: req.params.noteID,
        title: req.body.title,
        description: req.body.description,
      };
      const loginValidation = validation.noteValidation.validate(req.body);
      console.log(loginValidation);
      if (loginValidation.error) {
        logger.error(loginValidation.error);

        res.status(422).send({
          success: false,
          message: "invalid label input",
        });
        return;
      }

      noteService.serUpdateNote(id, (error, data) => {
        if (error) {
          logger.error(error);
          return res.status(400).json({
            message: "failed to update note",
            success: false,
          });
        } else {
          logger.info("Note is upadated Successfully");
          clearRedis.clearCache();
          return res.status(201).send({
            message: " Note is upadated Successfully",
            success: true,
            data: data,
          });
        }
      });
    } catch {
      logger.error("Internal server error");
      return res.status(500).json({
        message: "Error occured",
        success: false,
      });
    }
  };

  /**
   * @description serDeleteById this function written for Delete notes using note id
   * @param {*} req params shoild contain note id
   * @param {*} res
   * @returns response should contain null with data
   */
  deleteById = (req, res) => {
    const note = req.params.noteID;
    console.log(note);
    try {
      const id = {
        userId: req.user.dataForToken.id,
        noteID: req.params.noteID,
      };
      // console.log(id);
      const noteValidation = validation.getNoteValidation.validate(id);
      if (noteValidation.error) {
        logger.error(noteValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid note input",
        });
        return;
      }
      noteService.serDeleteById(id, (error, note) => {
        if (error) {
          logger.error(error);
          res
            .status(400)
            .send({ message: "Some error occurred while retrieving note." });
        } else {
          logger.info("Note Deleted successfully");
          res.status(200).json({
            success: true,
            message: "Note Deleted successfully",
            notes: note,
          });
        }
      });
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to add label to note
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expecte
   */
  addLabeltoNote = async (req, res) => {
    try {
      const noteInfo = {
        userId: req.user.dataForToken.id,
        noteID: req.params.noteID,
      };
      console.log(noteInfo);
      const id = {
        labelId: [req.body.labelId],
      };
      console.log(id);
      const noteValidation = validation.getNoteValidation.validate(noteInfo);
      if (noteValidation.error) {
        logger.error(noteValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid note input",
        });
        return;
      }
      // console.log(id);
      await noteService.addLabeltoNote(noteInfo, id);
      await labelController.addNoteIdtoLabel(noteInfo, id);

      return res.status(200).json({
        message: "label Added succesfully",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        message: "error occurs",
        success: false,
        data: err,
      });
    }
  };

  /**
   * @description function written to delete label from note
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */

  deleteLabel = async (req, res) => {
    try {
      const id = {
        labelId: req.body.labelId,
        noteID: req.params.noteID,
      };
      const noteValidation = validation.deleteLabelValidation.validate(id);
      if (noteValidation.error) {
        logger.error(noteValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid label input",
        });
        return;
      }
      await noteService.deleteLabel(id);
      res.status(200).send({
        message: "Label deleted sucessfully",
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: "internal error occurs",
        success: false,
        error: error,
      });
    }
  };

  /**
   * @description function written to share note by email to a user
   * @param {*} a valid noteId is expected
   * @param {*} a valid note is expected
   * @returns
   */
  shareNote = async (req, res) => {
    try {
      const noteInfo = { userId: req.user.dataForToken.id, noteID: req.params.noteID, };
      const collaborator = { collabUI: req.body.collabUI };

      const collabUserIdValidate = validation.shareNote.validate(req.body);
      if (collabUserIdValidate.error) {
        res.status(422).send({
          success: false,
          message: collabUserIdValidate.error.message,
        });
      }
      const CheckcollabUserExists = await UserModel.userExists(req.body);
      if (CheckcollabUserExists !== null) {
        const checkCollab = await noteService.collaboratorAdded(noteInfo, collaborator);
        if (checkCollab) {
          return res.status(400).send({
            message: "collaborator already exists",
            success: false,
          });
        } else {
          await noteService.shareNote(noteInfo, collaborator);
          return res.status(200).json({
            message: "Note share with Collaborator succesfully",
            success: true,
          });
        }
      } else {
        res.status(400).send({
          message: "invalid collaborator",
          success: false,
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "error occurs",
        success: false,
        data: err,
      });
    }
  };
}
module.exports = new Note();
