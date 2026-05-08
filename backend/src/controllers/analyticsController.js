const analyticsService = require(
    "../services/analyticsService"
);



// Get Session Analytics
const getSessionAnalytics = async (
    req,
    res
) => {

    try {

        const analytics =
            await analyticsService.getSessionAnalytics(
                req.params.sessionId
            );

        res.status(200).json({
            success: true,
            data: analytics
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    getSessionAnalytics
};