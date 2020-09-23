const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { check } = require("express-validator");
const auth = require("../middleswares/auth");
const isAdmin = require("../middleswares/isAdmin");

router.post(
  "/",
  [
    check("userName", "El nombre es obligatorio").not().isEmpty(),
    check("userEmail", "Agrega un email válido").isEmail(),
    check(
      "userPass",
      "El password debe contener mínimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("userRole", "El rol es obligatorio").not().isEmpty(),
  ],
  userController.newUser
);

router.get("/", auth, isAdmin, userController.getAllUsers);

router.get("/:id", auth, userController.getOneUser);

router.delete("/:id", isAdmin, userController.deleteUser);

router.put(
  "/:id",
  auth,
  [
    check(
      "userPass",
      "El password debe contener mínimo 6 caracteres"
    ).isLength({ min: 6 })
  ],
  userController.updateUser
);

router.put('/enable/:id', auth, isAdmin, userController.enableUser);

module.exports = router;
