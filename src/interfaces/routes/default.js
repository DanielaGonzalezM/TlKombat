const { Router } = require("express");

const {
    defaultGet, othersGet
} = require("../controllers/defaultController");

const router = Router();

router.get("/", defaultGet);

router.get("/*", othersGet);
module.exports = router