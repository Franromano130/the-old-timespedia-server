const cloudinary =  require ("cloudinary").v2;
const router = express.Router();
const User = require("../models/User.model.js");
const Character = require("../models/Character.model.js");
const Publicaciones = require("../models/Publicaciones.model.js");
const Eventos = require("../models/Eventos.model.js");

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js")
const capitalize = require("../utils/capitalize.js");
const uploader = require("../middlewares/uploader.js");



router.get("/insert-data", isLoggedIn, isAdmin, async (req, res, next) => {
    const {charaId} = req.params
    console.log("Probando", charaId)

    const {title, description, url, afiliation, rol} = req.body
    const {_id} = req.session.user;
    if (req.file === undefined) {
        next("No hay imagen");
      }
      try {
        const response = await Games.create({
          title: title,
          description: description,
          url: req.file.path, 
          afiliation: afiliation,
          rol: rol,
          creator: _id,
        });
    
        res.json("");
      } catch (error) {
        next(error);
      }
});

router.get("/personajes/list-characters", isLoggedIn, (req, res, next) => {
    Character.find()
    .select({ title: 1, description: 1, afiliation: 1})
    .then((response) => {
        console.log(response);
        res.json("")
    })
    .catch((error) => {
        next(error);
    });
})
router.get("/personajes/list-characters/:personajeId", isLoggedIn, async (req, res, next) => {
    try{

        const response = await Character.findById(req.params.charaId)
        response.title = capitalize (response.title);
        res.json("")
    } catch (error) {
        next(error);
    }
});

router.get("/personajes/edit-characters/:personajesId", isLoggedIn, (req, res, next) => {
       const {charaId} = req.params;
        Character.findById(charaId)
        .then((character) =>{
            res.json("", {character})
        })
        .catch((err) => {
            next(err)
        })
});

router.post ("/personajes/edit-characters/:personajesId/edit", isLoggedIn,  (req, res, next) => {
    const { charaId } = req.params;
    console.log("PROBANDO", charaId);
  
    const { title, description, url, afiliation, rol } = req.body;
    console.log(req.body);
  
    Games.findByIdAndUpdate(charaId, {
      title,
      description,
      url,
      afiliation,
      rol,
    })
  
      .then(() => {
        res.json("");
      })
      .catch((err) => next(err));
});
    
router.post ("/personajes/edit-characters/:personajesId/delete", isLoggedIn, (req, res, next) => {
    const { charaId } = req.params;
  console.log("TEST");
  Character.findByIdAndDelete(character)
    .then(() => {
      res.json("");
    })
    .catch((error) => {
      next(error);
    });
})

module.exports = router;
