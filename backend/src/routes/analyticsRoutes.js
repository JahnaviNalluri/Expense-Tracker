const express = require("express");

const router = express.Router();

const analyticsController = require(
    "../controllers/analyticsController"
);



// Get Session Analytics
router.get(
    "/session/:sessionId",
    analyticsController.getSessionAnalytics
);



module.exports = router;