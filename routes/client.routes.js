const { Router } = require("express");
const {
  getClientById,
  addClient,
  deleteClient,
  updateClient,
  getClients,
} = require("../controllers/client.controller");

const router = Router();

router.post("/", addClient);
router.get("/", getClients);
router.get("/:id", getClientById);
router.delete("/", deleteClient);
router.put("/", updateClient);

module.exports = router;
