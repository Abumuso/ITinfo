const { Router } = require("express");

const categoryRouter = require("./category.routes");
const descriptionRouter = require("./description.routes");
const dictionaryRouter = require("./dictionary.routes");
const synonimRouter = require("./synonim.routes");
const authorRouter = require("./author.routes");

const router = Router();

router.use("/api/category", categoryRouter);
router.use("/api/description", descriptionRouter);
router.use("/api/dictionary", dictionaryRouter);
router.use("/api/synonim", synonimRouter);
router.use("/api/author", authorRouter);

module.exports = router;
