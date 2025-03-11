const express = require("express");
const plantas_controller = require("../controllers/plantas.controller");
const router = express.Router();

const canView = require("../util/canView");
const is_auth = require("../util/is_auth");

router.get("/agregar", is_auth, plantas_controller.get_agregar);
router.get("/add", is_auth, plantas_controller.get_agregar);
router.post("/agregar", is_auth, plantas_controller.post_agregar);

router.get("/:id", is_auth, canView, plantas_controller.get_root);
router.get("/", is_auth, canView, plantas_controller.get_root);

module.exports = router;
