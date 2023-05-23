const express = require("express");
const { sendResponse } = require("../helper/helper");
const teacherModel = require("../models/teacherModel");
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
  let { Name, course, contact  } = req.body;
  let errArr = [];

  if (!Name) {
    errArr.push('require : Name')
  }
  if (!course) {
    errArr.push('require : course')
  }
  if (!contact) {
    errArr.push('require : contact')
  }

  if (errArr.length > 0) {
    res
       .send(sendResponse(false, errArr, null, "Required All Fields"))
       .status(400)
       return;
  }
  else{
    let obj = { Name, course, contact };
    let teacher = new TeacherModel(obj)
    await teacher.save();
    if(!teacher) {
      res
        .send(sendResponse(false, null, "Internal Server Error"))
        .status(400)
    }
    else{
      res
      .send(sendResponse(true, teacher, "Saved succesfully"))
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
