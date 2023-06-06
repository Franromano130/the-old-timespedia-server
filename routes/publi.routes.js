const router = express.Router();
const cloudinary = require("cloudinary").v2;

const User = require("../models/User.model.js");
const Character = require("../models/Character.model.js");
const Publicaciones = require("../models/Publicaciones.model.js");
const Eventos = require("../models/Eventos.model.js");

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");
const capitalize = require("../utils/capitalize.js");
const uploader = require("../middlewares/uploader.js");





module.exports = router;