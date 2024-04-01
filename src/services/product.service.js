const pool = require("./database");

const createProduct$ = async (product) => {
  try {
    const { categoryId, productName, productDescription } = product;
    const query = `INSERT INTO products ("categoryId", "productName", "productDescription") VALUES ($1, $2, $3) RETURNING *`;
    const queryResult = await pool.query(query, [
      categoryId,
      productName,
      productDescription,
    ]);
    console.log(queryResult);
    return queryResult;
  } catch (error) {
    response.status(500).json(error);
    throw error;
  }
};

module.exports = {
  createProduct$,
};
