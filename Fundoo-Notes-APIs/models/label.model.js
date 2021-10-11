const mongoose = require("mongoose");

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
    createLabel = async (labelInput, error) => {
      try {
        const noteLabel = new ModelForLabel({
          labelName: labelInput.labelName,
          userId: labelInput.userId
        });
        const addLabel = await noteLabel.save();
        if (addLabel) { return addLabel; }
        return error;
      } catch (error) {
      }
    }

    getAllLabel = async (userId, error) => {
      try {
        const allLebel = await ModelForLabel.find({ userId: userId.id });
        if (!allLebel) { return error; }
        return allLebel;
      } catch (error) {
      }
    }

    getLabelById = async (labelInfo, error) => {
      try {
        const lebel = await ModelForLabel.find({ $and: [{ _id: labelInfo.labelID }, { userId: labelInfo.userId }] });
        if (!lebel) { return error; }
        return lebel;
      } catch (error) { return error; }
    }

    updateLabel = async (labelInput, error) => {
      try {
        const updatedLabel = await ModelForLabel.findByIdAndUpdate(labelInput.labelID, { labelName: labelInput.labelName }, { new: true });
        if (!updatedLabel) { return error; }
        // console.log(updatedLabel);
        return updatedLabel;
      } catch (error) { return error; }
    }
}
module.exports = new LabelModel();
