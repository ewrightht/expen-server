const { Router } = require("express");
const { validEmail, createUser, loginUser, renewToken } = require("../controllers/auth_controller");
const { check } = require("express-validator");
const fieldsValidator = require("../middlewares/fields-validator");
const validJwt = require("../middlewares/valid-jwt");

const router = Router();

// api/auth/
router.post(
  "/valid-email",
  [
    check("email", "El correo que deseas usar es inválido.").isEmail(),
    fieldsValidator
  ],
  validEmail
);
router.post(
  "/new",
  [
    check("email", "Email is required").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "La contraseña debe tener al menos 5 caracteres.").isLength({ min: 5 }),
    fieldsValidator
  ],
  createUser
);
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "El campo de contraseña no puede estar vacío."),
    fieldsValidator
  ],
  loginUser
);
router.get("/renew", validJwt, renewToken);

module.exports = router;