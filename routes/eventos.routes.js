const cloudinary = require("cloudinary").v2;
const router = express.Router();
const User = require("../models/User.model.js");
const Character = require("../models/Character.model.js");
const Publicaciones = require("../models/Publicaciones.model.js");
const Eventos = require("../models/Eventos.model.js");

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");
const capitalize = require("../utils/capitalize.js");
const uploader = require("../middlewares/uploader.js");

router.get("/insert-data", isLoggedIn, isAdmin, async (req, res, next) => {
  const { eventId } = req.params;
  console.log("Probando", eventId);

  const { title, description, consecuences } = req.body;
  const { _id } = req.session.user;
  if (req.file === undefined) {
    next("No hay imagen");
  }
  try {
    const response = await Games.create({
      title: title,
      description: description,
      consecuences: consecuences,
      creator: _id,
    });

    res.json("");
  } catch (error) {
    next(error);
  }
});

router.get("/list-eventos", isLoggedIn, (req, res, next) => {
  Eventos.find()
    .select({ title: 1, description: 1, consecuences: 1 })
    .then((response) => {
      console.log(response);
      res.json("");
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/list-eventos/:eventoId", isLoggedIn, async (req, res, next) => {
  try {
    const response = await Eventos.findById(req.params.eventId);
    response.title = capitalize(response.title);
    res.json("");
  } catch (error) {
    next(error);
  }
});

router.get("/edit-eventos/:eventoId", isLoggedIn, (req, res, next) => {
  const { eventId } = req.params;
  Eventos.findById(eventId)
    .then((evento) => {
      res.json("", { evento });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/edit-eventos/:eventoId/edit", isLoggedIn, (req, res, next) => {
  const { eventId } = req.params;
  console.log("PROBANDO", eventId);

  const { title, description, consecuences } = req.body;
  console.log(req.body);

  Eventos.findByIdAndUpdate(eventId, {
    title,
    description,
    consecuences,
  })

    .then(() => {
      res.json("");
    })
    .catch((err) => next(err));
});

router.post("/edit-eventos/:eventoId/delete", isLoggedIn, (req, res, next) => {
  const { eventId } = req.params;
  console.log("TEST");
  Eventos.findByIdAndDelete(evento)
    .then(() => {
      res.json("");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
