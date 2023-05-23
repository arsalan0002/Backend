const express = require("express");
const { sendResponse } = require("../helper/helper");
const courseModel = require("../models/courseModel");
const route = express.Router();

route.get("/", async (req, res) => {
  try{
    const result = await courseModel.find();
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
  let { Name, duration, fees, shortName } = req.body;
  let errArr = [];

  if (!Name) {
    errArr.push('require : Name')
  }
  if (!duration) {
    errArr.push('require : duration')
  }
  if (!fees) {
    errArr.push('require : fees')
  }

  if (errArr.length > 0) {
    res
       .send(sendResponse(false, errArr, null, "Required All Fields"))
       .status(400)
       return;
  }
  else{
    let obj = { Name, duration, fees, shortName };
    let course = new courseModel(obj)
    await course.save();
    if(!course) {
      res
        .send(sendResponse(false, null, "Internal Server Error"))
        .status(400)
    }
    else{
      res
      .send(sendResponse(true, course, "Saved succesfully"))
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
