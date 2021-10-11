const mongoose = require("mongoose");
const { error } = require("winston");

const LabelSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },

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
    createLabel = async (labelInput) => {
      try {
        const noteLabel = new ModelForLabel({
          labelName: labelInput.labelName,
          userId: labelInput.userId
        });
        const addLabel = await noteLabel.save();
        if (addLabel) {
          return addLabel;
        } else {
          return error;
        }
      } catch (error) {
      }
    }
}
module.exports = new LabelModel();
