/*************************************************************************************
 * @file         label.controller.js
 * @description  Class belong to use for taking the request from the client and
 *               gives the response and validating whether the input is correct or not.
 * @author       Ganesh
 * ************************************************************************************/
const labelService = require("../service/label.service");
const logger = require("../logger/logger");
const validation = require("../helper/user.validation.js");

class LabelController {
  /**
   * @description function written to create label into database
   * @param {*} a valid req body is expected
   * @param {*} res should be 200 status code for label added suuccefully
   */
  createLabel = async (req, res) => {
    try {
      const labelInput = {
        userId: req.user.dataForToken.id,
        labelName: req.body.labelName
      };
      const labelValidation = validation.labelValidation.validate(req.body);
      if (labelValidation.error) {
        logger.error(labelValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid label input"
        });
        return;
      }
      // console.log(labelInput);
      const label = await labelService.createLabel(labelInput);
      // console.log(label);
      if (!label) {
        return res
          .status(404)
          .send({ success: false, message: "Unable to create label" });
      }
      logger.info("label Created Successfully");
      return res
        .status(201)
        .send({ success: true, message: "Label Created..!", data: label });
    } catch (error) {
      res.status(500).send({ success: false, message: "error occorred" });
    }
  };

  /**
   * @description function written to get all labels
   * @param {*} req will take userId from middeleware by decoding token
   * @param {*} res should have all note of user
   */
  getAllLabel = async (req, res) => {
    const userId = { id: req.user.dataForToken.id };

    const label = await labelService.getAllLabel(userId);
    if (!label) {
      return res.status(404).send({
        success: false,
        message: "Unable to retrieve all label"
      });
    }
    logger.info("All Label Retrieved..!");
    return res
      .status(200)
      .send({ success: true, message: "All Label Retrieved..!", data: label });
  };

  /**
   * @description function written with redis to get label by ID
   * @param {*} req will take userId from middeleware by decoding token
   *             and label id from params
   * @param {*} res should have label of particular id
   */
  getLabelById = async (req, res) => {
    try {
      const labelInput = {
        userId: req.user.dataForToken.id,
        labelID: req.params.labelID
      };
      const labelValidation =
        validation.getlabelValidation.validate(labelInput);
      if (labelValidation.error) {
        logger.error(labelValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid label and user id"
        });
        return;
      }
      const label = await labelService.getLabelById(labelInput);
      return res
        .status(200)
        .send({ success: true, message: "Label Got..!", data: label });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "error occorred" });
    }
  };
  /**
   * @description function written to update label
   * @param {*} a valid req body is expected
   * @param {*} res shoul have update label of user
   */

  updateLabel = async (req, res) => {
    try {
      const labelInput = {
        userId: req.user.dataForToken.id,
        labelName: req.body.labelName,
        labelID: req.params.labelID
      };
      const labelValidation = validation.labelValidation.validate(req.body);
      if (labelValidation.error) {
        logger.error(labelValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid label input"
        });
        return;
      }
      // console.log(labelInput);
      const label = await labelService.updateLabel(labelInput);
      // console.log(label);
      if (!label) {
        return res
          .status(404)
          .send({ success: false, message: "label Not Found" });
      }
      logger.info("label Updated Successfully");
      return res
        .status(200)
        .send({ success: true, message: "Label Updated..!", data: label });
    } catch (error) {
      res.status(500).send({ success: false, message: "error occorred" });
    }
  };

  /**
   * @description function written to delete label by ID
   * @param {*} req will take userId from middeleware by decoding token
   *             and label id from params
   * @param {*} res should have null data and status code 204
   */
  deleteById = async (req, res) => {
    try {
      const id = {
        userId: req.user.dataForToken.id,
        labelID: req.params.labelID
      };
      console.log(id);
      const labelValidation = validation.getlabelValidation.validate(id);
      if (labelValidation.error) {
        logger.error(labelValidation.error);
        res.status(422).send({
          success: false,
          message: "invalid label and user id"
        });
        return;
      }
      const data = await labelService.deleteById(id);
      console.log(data);
      // if (!data) {
      //   return res.status(404).json({
      //     message: "label not found",
      //     success: true
      //   });
      // }
      return res.status(200).json({
        message: "label Delete succesfully",
        success: true
      });
    } catch (err) {
      return res.status(500).json({
        message: "label not Delete",
        success: false,
        data: err
      });
    }
  };

  /**
   * @description function written to Add note id into label
   */
  addNoteIdtoLabel = async (noteInfo, id) => {
    try {
      await labelService.addNoteIdtoLabel(noteInfo, id);
      return;
    } catch (err) {
      return err;
    }
  };
}
module.exports = new LabelController();
