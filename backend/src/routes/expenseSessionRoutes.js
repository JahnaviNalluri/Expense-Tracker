const express = require("express");

const router = express.Router();

const expenseSessionController = require(
    "../controllers/expenseSessionController"
);



// Create Session
router.post(
    "/",
    expenseSessionController.createSession
);
// Refresh Session
router.post(
    "/refresh",
    expenseSessionController.refreshSession
);

router.get(

    "/full-history/:userId",

    expenseSessionController
    .getFullSessionHistory

);



// Get Active Session
router.get(
    "/active/:userId",
    expenseSessionController.getActiveSession
);



// Get Session History
router.get(
    "/history/:userId",
    expenseSessionController.getSessionHistory
);



// Get Session By ID
router.get(
    "/:id",
    expenseSessionController.getSessionById
);






// Delete Session
router.delete(
    "/:id",
    expenseSessionController.deleteSession
);



module.exports = router;