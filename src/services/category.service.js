const pool = require("./database");

const createCategory$ = async (category) => {
  try {
    const { type, name } = category;
    const query = `INSERT INTO category ("type", "name") VALUES ($1, $2) RETURNING *`;
    const queryResult = await pool.query(query, [type, name]);
    return queryResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createCategory$,
};
