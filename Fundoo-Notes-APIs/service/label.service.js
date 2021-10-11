
const labelModel = require("../models/label.model");

class LabelService {
    createLabel = async (labelInput) => {
      try {
        const label = await labelModel.createLabel(labelInput);
        if (!label) {
          return null;
        }
        // console.log(label);
        return label;
      } catch (error) {
        return error;
      }
    }
}
module.exports = new LabelService();
