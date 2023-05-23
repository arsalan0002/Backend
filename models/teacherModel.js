const mongoose =require("mongoose");

const teacherSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    course: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    }

});

const teacherModel = mongoose.model("teacher",teacherSchema);

module.exports = teacherModel;