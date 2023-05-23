const express = require("express");
const { sendResponse } = require("../helper/helper");
const instituteModel = require("../models/instituteModel");
const route = express.Router();

route.get("/", async (req, res) => {
  try{
    const result = await teacherModel.find();
    if(!result) {
      res
      .send(sendResponse(false, null, "No Data Found")).status(404);
    }
    else{
      res
      .send(sendResponse(true, result)).status(200);
    }
  }
  catch(e) {
    console.log(e);
    res.send(sendResponse(false, null, "Internal Server Error")).status(400);
  }

});
route.get("/:id", (req, res) => {
  res.send("Get Single Student Data");
});
route.post("/", async (req, res) => {
  let { Name, address, shortName, tel } = req.body;
  let errArr = [];

  if (!Name) {
    errArr.push('require : Name')
  }
  if (!address) {
    errArr.push('require : address')
  }
  if (!tel) {
    errArr.push('require : tel')
  }

  if (errArr.length > 0) {
    res
       .send(sendResponse(false, errArr, null, "Required All Fields"))
       .status(400)
       return;
  }
  else{
    let obj = { Name, address, tel };
    let institute = new instituteModel(obj)
    await institute.save();
    if(!institute) {
      res
        .send(sendResponse(false, null, "Internal Server Error"))
        .status(400)
    }
    else{
      res
      .send(sendResponse(true, institute, "Saved succesfully"))
      .status(200)
    }
  }


});
route.put("/:id", (req, res) => {
  res.send("Edit Student Data");
});
route.delete("/:id", (req, res) => {
  res.send("Delete Student");
});

module.exports = route;
