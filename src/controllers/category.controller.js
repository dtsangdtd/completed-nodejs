const categoryService = require("./../services/category.service");
const productService = require("../services/product.service");
const createCategory = async (request, response) => {
  try {
    const { products = [], name, type } = request.body;
    const category = {
      name,
      type,
    };
    const categoryResult = await categoryService.createCategory$(category);
    let productResult = [];
    if (categoryResult.rows[0]) {
      const { id } = categoryResult.rows[0];
      await Promise.all(
        products.map(async (item) => {
          const productRes = await productService.createProduct$({
            categoryId: id,
            ...item,
          });
          productResult.push(productRes.rows[0]);
        })
      );
    }
    const data = {
      ...categoryResult.rows[0],
      products: productResult,
    };
    response
      .status(201)
      .json({ message: "created successfully !!", data: data });
  } catch (error) {
    response.status(500).json(error);
    throw error;
  }
};

module.exports = {
  createCategory,
};
