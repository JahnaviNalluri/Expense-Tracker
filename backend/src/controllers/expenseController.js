const expenseService = require("../services/expenseService");



// Add Expense
const addExpense = async (req, res) => {

    try {

        const expense = await expenseService.addExpense(req.body);

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            data: expense
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Get All Expenses
const getAllExpenses = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const expenses = await expenseService.getAllExpenses(
            page,
            limit
        );

        res.status(200).json({
            success: true,
            data: expenses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Get Expense By ID
const getExpenseById = async (req, res) => {

    try {

        const expense = await expenseService.getExpenseById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: expense
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Update Expense By ID
const updateExpenseById = async (req, res) => {

    try {

        const updatedExpense =
            await expenseService.updateExpenseById(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpense
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Delete Expense By ID
const deleteExpenseById = async (req, res) => {

    try {

        await expenseService.deleteExpenseById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Filter By Type
const getExpensesByType = async (req, res) => {

    try {

        const expenses =
            await expenseService.getExpensesByType(
                req.params.type
            );

        res.status(200).json({
            success: true,
            data: expenses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Filter By Title
const getExpensesByTitle = async (req, res) => {

    try {

        const expenses =
            await expenseService.getExpensesByTitle(
                req.params.title
            );

        res.status(200).json({
            success: true,
            data: expenses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Filter By Category
const getExpensesByCategory = async (req, res) => {

    try {

        const expenses =
            await expenseService.getExpensesByCategory(
                req.params.category
            );

        res.status(200).json({
            success: true,
            data: expenses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getExpensesBySession =
async (req, res) => {

  try {

    const expenses =
    await expenseService
    .getExpensesBySession(

      req.params.sessionId

    );



    res.status(200).json({

      success: true,

      data: {

        expenses

      }

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpenseById,
    getExpensesBySession,
    deleteExpenseById,
    getExpensesByType,
    getExpensesByTitle,
    getExpensesByCategory
};