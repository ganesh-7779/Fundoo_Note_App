// const { error } = require("winston");
const labelModel = require("../models/label.model");

class LabelService {
  /**
   * @param {labelInput}  : labelInput will come from the controller body.
   * @description   : createLabel will takes the data from controller and send it to models
   */
  createLabel = async (labelInput, error) => {
    try {
      const label = await labelModel.createLabel(labelInput);
      if (!label) {
        return error;
      }
      // console.log(label);
      return label;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to get all labels
   * @returns data else returns error
   */
  getAllLabel = async (userID) => {
    try {
      const allLabel = await labelModel.getAllLabel(userID);
      if (!allLabel) {
        return null;
      }
      return allLabel;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description function written to get label by ID
   * @param {*} a valid labelId is expected
   * @returns data else returns error
   */
  getLabelById = async (labelInfo) => {
    try {
      const getlabel = await labelModel.getLabelById(labelInfo);
      if (!getlabel) {
        return null + " label not found";
      }
      // console.log(label);
      return getlabel;
    } catch (error) {
      return error;
    }
  };

  /**
   * @description   : updateLabel will takes the data from controller and send it to models
   * @param {*} a valid labelId is expected
   * @param {*} a valid labelData is expected
   * @returns
   */
  updateLabel = async (labelInput) => {
    try {
      const updatedlabel = await labelModel.updateLabel(labelInput);
      if (!updatedlabel) {
        return null;
      }
      // console.log(label);
      return updatedlabel;
    } catch (error) {
      return error;
    }
  };

  /**
   * @param {id}  : id will come from the controller body.
   * @description   : createLabel will takes the data from controller and send it to models
   */
  deleteById = async (id) => {
    try {
      return await labelModel.deleteById(id);
    } catch (err) {
      return err;
    }
  };

  /**
   * @param {noteInfo}  : noteInfo will come from the controller body.
   * @description   : addNoteIdtoLabel will takes the data from controller and send it to models
   */
  async addNoteIdtoLabel (noteInfo, id) {
    try {
      return await labelModel.addNoteIdtoLabel(noteInfo, id);
    } catch (err) {
      return err;
    }
  }
}

module.exports = new LabelService();
