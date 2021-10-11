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
        //  console.log(labelInput);
        const label = await labelService.createLabel(labelInput);
        // console.log(label);
        if (!label) {
          return res.status(400).send({ success: false, message: "Unable to create label" });
        }
        logger.info("label Created Successfully");
        return res.status(201).send({ success: true, message: "Label Created..!", data: label });
      } catch (error) {
        res.status(500).send({ success: false, message: "error occorred" });
      }
    }
}
module.exports = new LabelController();
