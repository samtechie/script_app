const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


const AdminController = require("../controllers/admin");

router.post("", checkAuth ,AdminController.createUser);

router.get("",checkAuth, AdminController.getUsers);

router.put("/:id",checkAuth, AdminController.updateUser);

router.get("/:id", AdminController.getUser);

router.delete("/:id",checkAuth, AdminController.deleteUser);

module.exports = router;


