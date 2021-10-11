
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
}
module.exports = new LabelService();
