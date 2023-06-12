const { Router } = require("express");
const {
  addCar,
  getCars,
  getCarById,
  deleteCar,
  updateCar,
} = require("../controllers/car.controllers");

const router = Router();

router.post("/", addCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.delete("/", deleteCar);
router.put("/", updateCar);

module.exports = router;
