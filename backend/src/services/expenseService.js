const Expense = require("../models/Expense");



// Add Expense
const addExpense = async (expenseData) => {

    const expense = await Expense.create(expenseData);

    return expense;
};



// Get All Expenses (Paginated)
const getAllExpenses = async (page, limit) => {

    const skip = (page - 1) * limit;

    const expenses = await Expense.find()
        .populate("user", "name email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalExpenses = await Expense.countDocuments();

    return {
        totalExpenses,
        currentPage: page,
        totalPages: Math.ceil(totalExpenses / limit),
        expenses
    };
};



// Get Expense By ID
const getExpenseById = async (id) => {

    const expense = await Expense.findById(id)
        .populate("user", "name email");

    if (!expense) {
        throw new Error("Expense not found");
    }

    return expense;
};



// Update Expense By ID
const updateExpenseById = async (id, updateData) => {

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedExpense) {
        throw new Error("Expense not found");
    }

    return updatedExpense;
};



// Delete Expense By ID
const deleteExpenseById = async (id) => {

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
        throw new Error("Expense not found");
    }

    return deletedExpense;
};



// Filter By Type
const getExpensesByType = async (type) => {

    const expenses = await Expense.find({ type });

    return expenses;
};



// Filter By Title
const getExpensesByTitle = async (title) => {

    const expenses = await Expense.find({
        title: {
            $regex: title,
            $options: "i"
        }
    });

    return expenses;
};



// Filter By Category
const getExpensesByCategory = async (category) => {

    const expenses = await Expense.find({ category });

    return expenses;
};
const getExpensesBySession =
async (sessionId) => {

  const expenses =
  await Expense.find({

    session: sessionId

  })

  .sort({ createdAt: -1 });




  return expenses;

};


module.exports = {
    addExpense,
    getAllExpenses,
    getExpenseById,
    updateExpenseById,
    deleteExpenseById,
    getExpensesBySession,
    getExpensesByType,
    getExpensesByTitle,
    getExpensesByCategory
};