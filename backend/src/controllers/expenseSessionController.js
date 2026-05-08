const expenseSessionService = require(
    "../services/expenseSessionService"
);



// Create Session
const createSession = async (
    req,
    res
) => {

    try {

        const session =
            await expenseSessionService.createSession(
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Session created successfully",
            data: session
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Get Active Session
const getActiveSession = async (
    req,
    res
) => {

    try {

        const session =
            await expenseSessionService.getActiveSession(
                req.params.userId
            );

        res.status(200).json({
            success: true,
            data: session
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Get Session History
const getSessionHistory = async (
    req,
    res
) => {

    try {

        const page =
            parseInt(req.query.page) || 1;

        const limit =
            parseInt(req.query.limit) || 5;

        const sessions =
            await expenseSessionService.getSessionHistory(
                req.params.userId,
                page,
                limit
            );

        res.status(200).json({
            success: true,
            data: sessions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Get Session By ID
const getSessionById = async (
    req,
    res
) => {

    try {

        const session =
            await expenseSessionService.getSessionById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: session
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Refresh Session
const refreshSession = async (
    req,
    res
) => {

    try {

        const session =
            await expenseSessionService.refreshSession(
                req.body.userId,
                req.body.title
            );

        res.status(200).json({
            success: true,
            message:
                "Session refreshed successfully",
            data: session
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Delete Session
const deleteSession = async (
    req,
    res
) => {

    try {

        await expenseSessionService.deleteSession(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Session deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const getFullSessionHistory = async (
    req,
    res
) => {

    try {

        const page =
        parseInt(req.query.page) || 1;

        const limit =
        parseInt(req.query.limit) || 10;




        const sessions =
        await expenseSessionService
        .getFullSessionHistory(

            req.params.userId,

            page,

            limit

        );




        res.status(200).json({

            success: true,

            data: sessions

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
    createSession,
    getActiveSession,
    getSessionHistory,
    getSessionById,
    getFullSessionHistory,
    refreshSession,
    deleteSession
};