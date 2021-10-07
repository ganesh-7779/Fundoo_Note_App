const helper = require("../helper/user.helper.js");
const noteService = require("../service/note.service");
class Note {
    createNote =(req, res) => {
      try {
        // const valid = validateNote.validate(req.body.note);
        // if(valid.error){
        //     logger.error("Invalid Note");
        //     return res.status(400).send({
        //         success:false,
        //         message:"Please enter valid note"
        //     })
        // }
        // else{
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
        const tokenData = helper.verifyToken(token);
        const note = {
          userId: tokenData.dataForToken.id,
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
    }
}

module.exports = new Note();
