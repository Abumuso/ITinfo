const { Router } = require("express");
const {
  addSynonim,
  getSynonimById,
  getSynonims,
  deleteSynonim,
  updateSynonim,
} = require("../controllers/synonim.controllersjs");

const router = Router();

router.post("/", addSynonim);
router.get("/", getSynonims);
router.get("/:id", getSynonimById);
router.delete("/", deleteSynonim);
router.put("/", updateSynonim);

module.exports = router;
