const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos deben estar llenos" });
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ errorMessage: "Usuario ya registrado" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    res.json("Usuario creado");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res
        .status(400)
        .json({ errorMessage: "Usuario no registrado con ese correo" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Contraseña no valida" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(req.payload);

  res.json({ payload: req.payload });
});

module.exports = router;
