const express = require("express");
const { user } = require("pg/lib/defaults");
const {
  getUser,
  createUser,
  getUserWhithId,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

let users = [];

router.get("/", getUser);

router.post("/", createUser);

router.get("/:id", getUserWhithId);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
