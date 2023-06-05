const { Schema, model } = require("mongoose");


const characterSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    afiliation: String,
    rol: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref:"User",
    }
  },
);

const Character = model("Character", characterSchema);

module.exports = Character;