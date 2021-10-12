/*************************************************************************************
 * @file         label.controller.js
 * @description  Class belong to use for taking the request from the client and
 *               gives the response and validating whether the input is correct or not.
 * @author       Ganesh
 * ************************************************************************************/
const labelService = require("../service/label.service");
const logger = require("../logger/logger");

class LabelController {
  createLabel = async (req, res) => {
    try {
      const labelInput = {
        userId: req.user.dataForToken.id,
        labelName: req.body.labelName
      };
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

  getLabelById = async (req, res) => {
    try {
      const labelInput = {
        userId: req.user.dataForToken.id,
        labelID: req.params.labelID
      };
      const label = await labelService.getLabelById(labelInput);
      return res
        .status(200)
        .send({ success: true, message: "Label Got..!", data: label });
    } catch (error) {
      return res.status(500).send({ success: false, message: "error occorred" });
    }
  }

  updateLabel = async (req, res) => {
    try {
      const labelInput = {
        userId: req.user.dataForToken.id,
        labelName: req.body.labelName,
        labelID: req.params.labelID
      };
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
  }

  deleteById= async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, labelID: req.params.labelID };
      console.log(id);
      const data = await labelService.deleteById(id);
      console.log(data);
      if (!data) {
        return res.status(404).json({
          message: "label not found",
          success: true
        });
      }
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
  }
}
module.exports = new LabelController();
