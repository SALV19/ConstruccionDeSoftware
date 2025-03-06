const express = require("express");
const plantas_controller = require("../controllers/plantas.controller");
const router = express.Router();

router.get("/agregar", plantas_controller.get_agregar);
router.get("/add", plantas_controller.get_agregar);
router.post("/agregar", plantas_controller.post_agregar);

router.get("/:id", plantas_controller.get_root);
router.get("/", plantas_controller.get_root);

module.exports = router;
