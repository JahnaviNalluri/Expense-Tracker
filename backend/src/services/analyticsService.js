const Expense = require("../models/Expense");

const ExpenseSession = require(
    "../models/ExpenseSession"
);



// Get Session Analytics
const getSessionAnalytics = async (
    sessionId
) => {

    // session details
    const session =
        await ExpenseSession.findById(
            sessionId
        );

    if (!session) {
        throw new Error("Session not found");
    }



    // total income
    const incomeResult =
        await Expense.aggregate([

            {
                $match: {
                    session: session._id,
                    type: "income"
                }
            },

            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }

        ]);



    // total expense
    const expenseResult =
        await Expense.aggregate([

            {
                $match: {
                    session: session._id,
                    type: "expense"
                }
            },

            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }

        ]);



    // category breakdown
    const categoryBreakdown =
        await Expense.aggregate([

            {
                $match: {
                    session: session._id,
                    type: "expense"
                }
            },

            {
                $group: {

                    _id: "$category",

                    spentAmount: {
                        $sum: "$amount"
                    }

                }
            }

        ]);



    // type breakdown
    const typeBreakdown =
        await Expense.aggregate([

            {
                $match: {
                    session: session._id
                }
            },

            {
                $group: {

                    _id: "$type",

                    total: {
                        $sum: "$amount"
                    }

                }
            }

        ]);



    const totalIncome =
        incomeResult[0]?.total || 0;

    const totalExpense =
        expenseResult[0]?.total || 0;

    const remainingAmount =
        totalIncome - totalExpense;



    // previous session
    const previousSession =
        await ExpenseSession.findOne({

            user: session.user,

            createdAt: {
                $lt: session.createdAt
            }

        })
        .sort({ createdAt: -1 });



    let previousSessionAnalytics = null;



    if (previousSession) {

        const prevExpense =
            await Expense.aggregate([

                {
                    $match: {
                        session: previousSession._id,
                        type: "expense"
                    }
                },

                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount"
                        }
                    }
                }

            ]);


        const prevIncome =
            await Expense.aggregate([

                {
                    $match: {
                        session: previousSession._id,
                        type: "income"
                    }
                },

                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount"
                        }
                    }
                }

            ]);


        previousSessionAnalytics = {

            sessionTitle:
                previousSession.title,

            totalIncome:
                prevIncome[0]?.total || 0,

            totalExpense:
                prevExpense[0]?.total || 0,

            remainingAmount:
                (prevIncome[0]?.total || 0)
                -
                (prevExpense[0]?.total || 0)

        };

    }



    return {

        currentSession: {

            sessionTitle: session.title,

            totalIncome,

            totalExpense,

            remainingAmount,

            categoryBreakdown,

            typeBreakdown

        },

        previousSession:
            previousSessionAnalytics

    };

};



module.exports = {
    getSessionAnalytics
};