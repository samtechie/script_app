const express = require("express");

const ScriptController = require("../controllers/scripts");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();


router.post("", checkAuth, ScriptController.createScript);


router.put("/:id", checkAuth, ScriptController.updateScript);

router.get("", ScriptController.getScripts);

router.get("/:id", ScriptController.getScript);


router.delete("/:id", checkAuth,ScriptController.deleteScript );


module.exports = router;
