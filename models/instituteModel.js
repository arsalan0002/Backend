const mongoose =require("mongoose");

const instituteSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
    },
    tel: {
        type: String,
        required: true,
    },

});

const instituteModel = mongoose.model("institute",instituteSchema);

module.exports = instituteModel;