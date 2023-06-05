const { Schema, model } = require("mongoose");


const eventosSchema = new Schema(
  {
    title: String,
    description: String,
    consecuencues: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    unique: true,
  },
);

const Eventos = model("Eventos", eventosSchema);

module.exports = Eventos;