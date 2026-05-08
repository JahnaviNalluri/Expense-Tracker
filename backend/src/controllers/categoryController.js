const categoryService = require(
    "../services/categoryService"
);



// Create Category
const createCategory = async (req, res) => {

    try {

        const category =
            await categoryService.createCategory(
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Category created successfully",
            data: category
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Get All Categories
const getAllCategories = async (
    req,
    res
) => {

    try {

        const page =
            parseInt(req.query.page) || 1;

        const limit =
            parseInt(req.query.limit) || 5;

        const categories =
            await categoryService.getAllCategories(
                page,
                limit
            );

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Get Category By ID
const getCategoryById = async (
    req,
    res
) => {

    try {

        const category =
            await categoryService.getCategoryById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



// Update Category By ID
const updateCategoryById = async (
    req,
    res
) => {

    try {

        const updatedCategory =
            await categoryService.updateCategoryById(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message:
                "Category updated successfully",
            data: updatedCategory
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



// Delete Category By ID
const deleteCategoryById = async (
    req,
    res
) => {

    try {

        await categoryService.deleteCategoryById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Category deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};