const { Schema, model } = require("mongoose");


const eventosSchema = new Schema(
  {
    title: String,
    description: String,
    consecuencues: String,
    unique: true,
  },
);

const Eventos = model("Eventos", eventosSchema);

module.exports = Eventos;