const { Router } = require("express");

const carRouter = require("./car.routes");
const clientRouter = require("./client.routes");
const price_typeRouter = require("./price_type.routes");
const rentRouter = require("./rent.routes");

const router = Router();

router.use("/api/car", carRouter);
router.use("/api/client", clientRouter);
router.use("/api/price_type", price_typeRouter);
router.use("/api/rent", rentRouter);

module.exports = router;
