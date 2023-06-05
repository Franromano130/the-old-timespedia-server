const { Schema, model } = require("mongoose");


const characterSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    afiliation: String,
    rol: String,
  },
);

const Character = model("Character", characterSchema);

module.exports = Character;