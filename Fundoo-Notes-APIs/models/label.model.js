const mongoose = require("mongoose");

const LabelSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },
    // noteId: { type: mongoose.Schema.Types.ObjectId, ref: "NoteRegister" },
    noteId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "NoteRegister" }]
    },

    labelName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ModelForLabel = mongoose.model("ModelForLabel", LabelSchema);

class LabelModel {
  /**
   * @description this function is for crete label collection and save it in DB
   * @param {*} info  should be for label creation in DB
   * @returns saved data or if error returns error
   */
  createLabel = async (labelInput, error) => {
    try {
      const noteLabel = new ModelForLabel({
        labelName: labelInput.labelName,
        userId: labelInput.userId
      });
      const addLabel = await noteLabel.save();
      if (addLabel) {
        return addLabel;
      }
      return error;
    } catch (error) {}
  };

  /**
   * @description function written to get all labels
   * @returns data else if returns error
   */
  getAllLabel = async (userId, error) => {
    try {
      const allLebel = await ModelForLabel.find({ userId: userId.id });
      if (!allLebel) {
        return error;
      }
      return allLebel;
    } catch (error) {}
  };

  /**
   * @param {*} id it is object id of lebel document
   * @description retrieve label by id created
   */
  getLabelById = async (id) => {
    try {
      const label = await ModelForLabel.find({ _id: id.labelID });
      if (typeof label !== "undefined" && label != null && label.length > 0) {
        console.log("items is not empty array.");
        return label;
      } else {
        return "label not found";
      }
    } catch (error) {
      return error;
    }
  };

  /**
   * @description : updating the label
   * @param {*} labelInput it is object id of lebel document
   * @returns data else returns error
   */
  updateLabel = async (labelInput, error) => {
    try {
      const updatedLabel = await ModelForLabel.findByIdAndUpdate(
        labelInput.labelID,
        { labelName: labelInput.labelName },
        { new: true }
      );
      if (!updatedLabel) {
        return error;
      }
      // console.log(updatedLabel);
      return updatedLabel;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to delete label
   * @param {*} id it is object id of lebel document
   * @returns error in the case of error occurrence
   */
  deleteById = async (id) => {
    try {
      return await ModelForLabel.findOneAndDelete(
        { $and: [{ _id: id.labelID }, { userId: id.userId }] },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to note id into label
   * @param {*} id it is object id of lebel document
   * @param {*} noteInfo it is object id of note document
   * @returns error in the case of error occurrence
   */
  async addNoteIdtoLabel (noteInfo, id) {
    try {
      const data = await ModelForLabel.findByIdAndUpdate(
        id.labelId,
        { $push: { noteId: noteInfo.noteId } },
        { new: true }
      );
      console.log(data);
    } catch (err) {
      return err;
    }
  }
}
module.exports = new LabelModel();
