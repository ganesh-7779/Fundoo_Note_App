/*************************************************************************
 * @purpose         :This file belong to database schema and logical operation
 *                   for data update remove find etc
 * @file            :note.model.js
 * @author          :Ganesh
 *************************************************************************/
const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },

    labelId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ModelForLabel" }]
    },

    email: {
      type: [{ type: mongoose.Schema.Types.String, ref: "Register" }]
    },

    title: {
      type: String
    },

    description: {
      type: String,
      required: true,
      minlength: 2
    }
  },
  {
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
  };

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
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * @description function written for get notes by Id from database
   * @param {*} valid notesId is expected
   * @returns notes of particular Id or if any error return error
   */
  getById = async (id, callback) => {
    await NoteRegister.find(
      { $and: [{ _id: id.noteID }, { userId: id.userId }] },
      (error, note) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, note);
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * @description serUpdateNote this function written for update notes using ID note id
   * @param {*} req shoild contain note id and title an description of note
   * @param {*} res
   * @returns response
   */
  modUpdateNote = async (id, callback) => {
    // console.log(id);
    await NoteRegister.findByIdAndUpdate(
      id.noteID,
      { title: id.title, description: id.description },
      (error, note) => {
        if (error) {
          return callback(error, null);
        } else {
          // console.log(note);
          return callback(null, note);
        }
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * @description serDeleteById this function written for Delete notes using note id
   * @param {*} req params shoild contain note id
   * @param {*} res
   * @returns response should be null
   */
  modDeleteByID = async (id, callback) => {
    await NoteRegister.findByIdAndDelete({ _id: id.noteID }, (error, note) => {
      if (error) {
        return callback(error, null);
      } else {
        console.log(note);
        return callback(null, note);
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * @description function written to add label to note
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */
  addLabeltoNote = async (noteInfo, id) => {
    const data = await NoteRegister.findOneAndUpdate(
      { $and: [{ _id: noteInfo.noteId }, { userId: noteInfo.userId }] },
      { $push: { labelId: id.labelId } },
      { new: true }
    );
    console.log(data);
  };

  /**
   * @description function written to remove label from note
   * @param {*} a valid noteId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */
  deleteLabel = async (id) => {
    try {
      const data = await NoteRegister.findByIdAndUpdate(
        id.noteID,
        { $pull: { labelId: id.labelId } },
        { new: true }
      );
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to share note by email
   * @param {*} a valid noteId is expected to find note in database
   * @param {*} a valid userId is expected to find note in data base
   * @returns
   */
  shareNote = async (noteInfo, userEmail) => {
    const data = await NoteRegister.findOneAndUpdate(
      { $and: [{ _id: noteInfo.noteID }, { userId: noteInfo.userId }] },
      { $push: { email: userEmail.email } },
      { new: true }
    );
    console.log(data);
  };
}

module.exports = new Model();
