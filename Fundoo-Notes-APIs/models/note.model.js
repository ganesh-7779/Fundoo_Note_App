/*************************************************************************
 * @purpose         :This file belong to database schema and logical operation
 *                   for data update remove find etc
 * @file            :note.model.js
 * @author          :Ganesh
***********************************************************************/
const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({

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
}

module.exports = new Model();
