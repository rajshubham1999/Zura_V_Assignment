
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "episodes",
    }]
}, { timestamps: true });  

module.exports = mongoose.model("projects", projectSchema);
