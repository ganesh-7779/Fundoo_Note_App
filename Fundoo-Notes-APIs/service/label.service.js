
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

    getAllLabel = async (userID) => {
      try {
        const allLabel = await labelModel.getAllLabel(userID);
        if (!allLabel) { return null; }
        return allLabel;
      } catch (error) { return error; }
    }

    getLabelById = async (labelInfo) => {
      try {
        const getlabel = await labelModel.getLabelById(labelInfo);
        if (!getlabel) { return null + " label not found"; }
        // console.log(label);
        return getlabel;
      } catch (error) {
        return error;
      }
      // return await labelModel.getLabelById(labelInfo);
      // // if (!label) { return null; }
      // // return label;
    }

updateLabel = async (labelInput) => {
  try {
    const updatedlabel = await labelModel.updateLabel(labelInput);
    if (!updatedlabel) { return null; }
    // console.log(label);
    return updatedlabel;
  } catch (error) {
    return error;
  }
};

deleteById = async (id) => {
  try {
    return await labelModel.deleteById(id);
  } catch (err) {
    return err;
  }
}
}
// deleteById = async (labelInfo) => {
//   try {
//     return await labelModel.deleteById(labelInfo);
//     // if (label) { return label; }
//     // console.log(label + " service");
//     // return label;
//   } catch (error) { return error; }
// }

module.exports = new LabelService();
