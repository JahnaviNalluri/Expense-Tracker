const express = require("express");

const router = express.Router();

const expenseController = require(
    "../controllers/expenseController"
);



// Add Expense
router.post("/", expenseController.addExpense);



// Get All Expenses
router.get("/", expenseController.getAllExpenses);
router.get(

  "/session/:sessionId",

  expenseController
  .getExpensesBySession

);


// Get Expense By ID
router.get("/:id", expenseController.getExpenseById);



// Update Expense By ID
router.put("/:id", expenseController.updateExpenseById);



// Delete Expense By ID
router.delete("/:id", expenseController.deleteExpenseById);



// Filter By Type
router.get("/type/:type",
    expenseController.getExpensesByType
);



// Filter By Title
router.get("/title/:title",
    expenseController.getExpensesByTitle
);



// Filter By Category
router.get("/category/:category",
    expenseController.getExpensesByCategory
);



module.exports = router;