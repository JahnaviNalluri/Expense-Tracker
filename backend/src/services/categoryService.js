const Category = require("../models/Category");



// Create Category
const createCategory = async (categoryData) => {

    const existingCategory = await Category.findOne({
        name: categoryData.name
    });

    if (existingCategory) {
        throw new Error("Category already exists");
    }

    const category = await Category.create(categoryData);

    return category;
};



// Get All Categories (Paginated)
const getAllCategories = async (page, limit) => {

    const skip = (page - 1) * limit;

    const categories = await Category.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalCategories =
        await Category.countDocuments();

    return {
        totalCategories,
        currentPage: page,
        totalPages: Math.ceil(
            totalCategories / limit
        ),
        categories
    };
};



// Get Category By ID
const getCategoryById = async (id) => {

    const category = await Category.findById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};



// Update Category By ID
const updateCategoryById = async (
    id,
    updateData
) => {

    // Prevent duplicate category names
    if (updateData.name) {

        const existingCategory =
            await Category.findOne({
                name: updateData.name,
                _id: { $ne: id }
            });

        if (existingCategory) {
            throw new Error(
                "Category already exists"
            );
        }
    }

    const updatedCategory =
        await Category.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

    if (!updatedCategory) {
        throw new Error("Category not found");
    }

    return updatedCategory;
};



// Delete Category By ID
const deleteCategoryById = async (id) => {

    const deletedCategory =
        await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        throw new Error("Category not found");
    }

    return deletedCategory;
};



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};