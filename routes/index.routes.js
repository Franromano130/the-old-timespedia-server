const router = require("express").Router();
const cloudinary = require('cloudinary').v2
const { updateLocals} = require("../middlewares/auth.middlewares.js")

router.use(updateLocals)

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const profileRouter = require("./profile.routes.js")
router.use("/profile", profileRouter)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const mainRoutes = require ("./mainpage.routes.js")
router.use("/mainpage", mainRoutes)

module.exports = router;
