import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name category is required",
      });
    }

    //check exist name category
    const existingName = await categoryModel.findOne({ name });
    if (existingName) {
      return res.status(200).send({
        success: true,
        message: "Category already existed",
      });
    }

    const category = await new categoryModel({
      name: name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New Category created",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in category",
      error,
    });
  }
};

//Update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name: name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Update successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//Get All Categories
export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting category",
    });
  }
};

//Get single category
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting one category",
    });
  }
};

//Delete single category
export const deleteSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Delete Successlly!",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting one category",
    });
  }
};
