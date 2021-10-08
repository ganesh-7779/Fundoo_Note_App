/***********************************************************************************************
* @description   : It is work as a service logic  between models and controller
* @file          : note.service.js
* @author        : Ganesh
*************************************************************************************************/
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
      }
      )
      ;
    }

    /**
     * @description this function is written to trigger or call the models function
     * @returns error if it has error else data
     */
    serGetAllNotes = (callback) => {
      noteModel.getAllNotesDB((error, notes) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, notes);
        }
      });
    }
}
module.exports = new Service();
