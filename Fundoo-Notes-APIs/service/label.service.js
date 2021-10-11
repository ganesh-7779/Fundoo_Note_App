
// const { error } = require("winston");
const labelModel = require("../models/label.model");

class LabelService {
    createLabel = async (labelInput, error) => {
      try {
        const label = await labelModel.createLabel(labelInput);
        if (!label) { return error; }
        // console.log(label);
        return label;
      } catch (error) {
        return error;
      }
    }

    getAllLabel = async (userID, error) => {
      try {
        const allLabel = await labelModel.getAllLabel(userID, error);
        if (!allLabel) { return error; }
        return allLabel;
      } catch { return error; }
    }

    getLabelById = async (labelInfo, error) => {
      try {
        const label = await labelModel.getLabelById(labelInfo, error);
        if (!label) { return error; }
        return label;
      } catch { return error; }
    }

    updateLabel = async (labelInput, error) => {
      try {
        const updatedlabel = await labelModel.updateLabel(labelInput);
        if (!updatedlabel) { return error; }
        // console.log(label);
        return updatedlabel;
      } catch (error) {
        return error;
      }
    }
}

module.exports = new LabelService();
