const { Schema, model } = require("mongoose");



const publiSchema = new Schema( 
    {
        type :Schema.Types.ObjectID,
        ref: "personajes",
        title: String,
        description: String,
        url: String,
        author: {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
    },
    
    );

    const Publicaciones = model("Publicaciones", publiSchema);

    module.exports = Publicaciones;

