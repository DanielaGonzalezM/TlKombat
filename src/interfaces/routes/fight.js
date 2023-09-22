const { Router } = require("express");
const { startFight, } = require("../controllers/fightController");
const { fightValidators } = require("../middlewares/fightValidators");

const router = Router();

router.get("/", fightValidators, startFight);

module.exports = router;
