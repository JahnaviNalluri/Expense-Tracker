const ExpenseSession = require(
    "../models/ExpenseSession"
);

const Expense=require("../models/Expense");

// Create Session
const createSession = async (sessionData) => {

    // deactivate old active sessions
    await ExpenseSession.updateMany(
        {
            user: sessionData.user,
            isActive: true
        },
        {
            isActive: false,
            endedAt: new Date()
        }
    );

    const session = await ExpenseSession.create(
        sessionData
    );

    return session;
};



// Get Active Session
const getActiveSession = async (userId) => {

    const session = await ExpenseSession.findOne({
        user: userId,
        isActive: true
    });

    if (!session) {
        throw new Error(
            "No active session found"
        );
    }

    return session;
};



// Get Session History
const getSessionHistory = async (
    userId,
    page,
    limit
) => {

    const skip = (page - 1) * limit;

    const sessions = await ExpenseSession.find({
        user: userId
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    const totalSessions =
        await ExpenseSession.countDocuments({
            user: userId
        });

    return {
        totalSessions,
        currentPage: page,
        totalPages: Math.ceil(
            totalSessions / limit
        ),
        sessions
    };
};



// Get Session By ID
const getSessionById = async (id) => {

    const session =
        await ExpenseSession.findById(id);

    if (!session) {
        throw new Error("Session not found");
    }

    return session;
};



// Refresh Session
const refreshSession = async (
    userId,
    newTitle
) => {

    // deactivate old session
    await ExpenseSession.updateMany(
        {
            user: userId,
            isActive: true
        },
        {
            isActive: false,
            endedAt: new Date()
        }
    );

    // create new active session
    const newSession =
        await ExpenseSession.create({
            user: userId,
            title: newTitle,
            isActive: true
        });

    return newSession;
};



// Delete Session
const deleteSession = async (id) => {

    const deletedSession =
        await ExpenseSession.findByIdAndDelete(id);

    if (!deletedSession) {
        throw new Error("Session not found");
    }

    return deletedSession;
};

const getFullSessionHistory = async (
    userId,
    page,
    limit
) => {

    const skip = (page - 1) * limit;



    const sessions =
    await ExpenseSession.find({

        user: userId

    })

    .skip(skip)

    .limit(limit)

    .sort({ createdAt: -1 });




    const totalSessions =
    await ExpenseSession.countDocuments({

        user: userId

    });




   




  const updatedSessions = [];




for (const session of sessions) {

    // get expenses for session
    const expenses =
    await Expense.find({

        session: session._id,

        user: userId

    });




    let totalIncome = 0;

    let totalExpense = 0;




    // category totals
    const categoryTotals = {};




    expenses.forEach((expense) => {

        // income
        if (expense.type === "income") {

            totalIncome += expense.amount;

        }




        // expense
        else {

            totalExpense += expense.amount;




            // category total
            if (

                categoryTotals[
                    expense.category
                ]

            ) {

                categoryTotals[
                    expense.category
                ] += expense.amount;

            }

            else {

                categoryTotals[
                    expense.category
                ] = expense.amount;

            }

        }

    });




    updatedSessions.push({

        ...session._doc,

        totalIncome,

        totalExpense,

        remainingAmount:
        totalIncome - totalExpense,

        expenseCount:
        expenses.length,

        categoryTotals

    });

}




    return {

        totalSessions,

        currentPage: page,

        totalPages: Math.ceil(
            totalSessions / limit
        ),

        sessions: updatedSessions

    };

};

module.exports = {
    createSession,
    getActiveSession,
    getSessionHistory,
    getSessionById,
    refreshSession,
    deleteSession,
    getFullSessionHistory
};