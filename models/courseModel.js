const mongoose =require("mongoose");

const courseSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    fees: {
        type: String,
        required: true,
    },
    shortname: {
        type: String,
        required: true,
    },

});

const courseModel = mongoose.model("course",courseSchema);

module.exports = courseModel;