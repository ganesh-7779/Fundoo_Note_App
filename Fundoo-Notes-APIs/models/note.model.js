/*************************************************************************
 * @purpose         :This file belong to database schema and logical operation
 *                   for data update remove find etc
 * @file            :note.model.js
 * @author          :Ganesh
*************************************************************************/
const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },

  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true
}
);

const NoteRegister = mongoose.model("NoteRegister", noteSchema);
class Model {
    /**
   * @description this function is for crete note collection and save it in DB
   * @param {*} info  should be for note creation in DB
   * @returns saved data or if error returns error
   */
    createNote = (info, callback) => {
      const note = new NoteRegister({
        userId: info.userId,
        title: info.title,
        description: info.description
      });
      note.save((error, data) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    /**
     * @description getAllNotes function written to get all notes from database
     * @returns retrieved notes or if error returns error
     */
    getAllNotesDB = async (userId, callback) => {
      await NoteRegister.find({ userId: userId.id }, (error, notes) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, notes);
        }
      }).clone().catch(function (err) { console.log(err); });
    }

    getById = async (id, callback) => {
      await NoteRegister.find({ $and: [{ _id: id.noteID }, { userId: id.userId }] }, (error, note) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, note);
        }
      }).clone().catch(function (err) { console.log(err); });
    }

    modUpdateNote = async (id, callback) => {
      // console.log(id);
      await NoteRegister.findByIdAndUpdate(id.noteID, { title: id.title, description: id.description }, (error, note) => {
        if (error) {
          return callback(error, null);
        } else {
          // console.log(note);
          return callback(null, note);
        }
      }).clone().catch(function (err) { console.log(err); });
    }
}

module.exports = new Model();
