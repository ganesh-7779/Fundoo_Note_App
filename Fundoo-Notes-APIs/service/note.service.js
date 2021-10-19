/* eslint-disable array-callback-return */

/* eslint-disable eqeqeq */
/***********************************************************************************************
 * @description   : It is work as a service logic  between models and controller
 * @file          : note.service.js
 * @author        : Ganesh
 *************************************************************************************************/
// const { error } = require("../logger/logger");
// const { object } = require("joi");
// const { array } = require("joi");
const noteModel = require("../models/note.model");

class Service {
  /*
   * @description : this function is written to send data models
   * @param       : A valid notes data is expected from service
   * @returns     : if note get reated in DB return data else error
   */
  createNote = (note, callback) => {
    noteModel.createNote(note, (err, data) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
   * @description this function is written to trigger or call the models function
   * @returns error if it has error else data
   */
  serGetAllNotes = (userId, callback) => {
    noteModel.getAllNotesDB(userId, (error, notes) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, notes);
      }
    });
  };

  /**
   * @description @getById this function written for get notes using note id and userid
   * @param {*} req shoild contain note id and userID
   * @param {*} res
   * @returns response
   */
  getById = (noteId, callback) => {
    console.log(noteId);
    noteModel.getById(noteId, (error, note) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, note);
      }
    });
  };

  /**
   * @description serUpdateNote this function written for update notes using ID note id
   * @param {*} req shoild contain note id and title an description of note
   * @param {*} res
   * @returns response
   */
  serUpdateNote = (noteId, callback) => {
    //  console.log(noteId);
    noteModel.modUpdateNote(noteId, (error, note) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, note);
      }
    });
  };

  /**
   * @description serDeleteById this function written for Delete notes using note id
   * @param {*} req params shoild contain note id
   * @param {*} res
   * @returns response
   */
  serDeleteById = (noteId, callback) => {
    console.log(noteId);
    noteModel.modDeleteByID(noteId, (error, note) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, note);
      }
    });
  };

  /**
   * @description function written to add label to note
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */
  addLabeltoNote = async (noteInfo, id) => {
    try {
      return await noteModel.addLabeltoNote(noteInfo, id);
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to delete label from note
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */
  deleteLabel = async (id) => {
    try {
      const data = await noteModel.deleteLabel(id);
      return data;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to share note by userID
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */

  shareNote = async (noteInfo, collaborator) => {
    try {
      return await noteModel.shareNote(noteInfo, collaborator);
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to check collaborator exists or not
   * @param {*} a valid noteInfo is expected
   * @param {*} a valid collaborator is expected
   * @returns
   */
  collaboratorAdded = async (noteInfo, collaborator) => {
    // console.log(collaborator);
    const data = await noteModel.getByIdForColl(noteInfo, collaborator);
    // console.log(data);
    console.log(JSON.stringify(data.collaborator));
    console.log(JSON.stringify(collaborator.collabUI));

    for (let i = 0; i < data.collaborator.length; i++) {
      if (JSON.stringify(data.collaborator[i]) === JSON.stringify(collaborator.collabUI)) {
        return true;
      }
    }
    return false;
  }
}

module.exports = new Service();
