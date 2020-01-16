const express = require("express");
const router = express.Router();
const adminCon = require("../controllers/admin/adminControl");
const appCreate = require("../controllers/admin/appCreate")
const assCreate = require("../controllers/admin/assessment")
const authorization = require("../middleware/token");

router.post("/signup", adminCon.adminReg);
router.post("/login", adminCon.adminLogin);

router.post("/new", authorization, appCreate.ApplicantEntry);
router.get("/all", authorization, appCreate.ApplicantDisplay);
router.get("/one/:id", authorization, appCreate.ApplicantDisplayOne);
router.put("/edit/:id", authorization, appCreate.ApplicantUpdate);
router.delete("/del/:id",  authorization, appCreate.ApplicantDelete)

router.post("/test", authorization, assCreate.AssessmentEntry);
router.put("/test/:id", authorization, assCreate.AssessmentUpdate);
router.get("/all-test", authorization, assCreate.AssessmentDisplay);
router.get("/one-test/:id", authorization, assCreate.AssessmentDisplayOne);
router.delete("/del-test/:id", authorization, assCreate.AssessmentDelete);


module.exports = router;