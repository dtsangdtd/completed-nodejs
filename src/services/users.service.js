const User = require("../models/user.model");
const pool = require("./database");

const getListUsers$ = async () => {
  try {
    const queryResult = await pool.query(
      `SELECT * FROM users ORDER BY "createdDate" ASC`
    );
    const { rows = [] } = queryResult;
    console.log(rows);
    return rows.map(
      (row) =>
        new User(
          row.id,
          row.employeeCode,
          row.age,
          row.createdDate,
          row.avatarFileData,
          row.avatarFileName
        )
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById$ = async (params) => {
  const id = params.id;
  const queryResult = await pool.query('SELECT * FROM users WHERE "id" = $1', [
    id,
  ]);
  const { rows } = queryResult;
  return rows;
};

const createUser$ = async (payload) => {
  const { employeeCode, age } = payload;
  try {
    const queryResult = await pool.query(
      `INSERT INTO users ("employeeCode", "age") VALUES ($1, $2) RETURNING *`,
      [employeeCode, age]
    );
    return queryResult;
  } catch (error) {
    res.status(500).json({ message: "Error creating record" });
  }
};

const updateUser$ = async (params, body) => {
  const { id } = params;
  const { employeeCode, age } = body;
  const queryResult = await pool.query(
    `UPDATE users SET "employeeCode" = $1, "age" = $2 WHERE "id" = $3`,
    [employeeCode, age, id]
  );
  return queryResult;
};

const deleteUserById$ = async (params) => {
  const id = params.id;
  const user = await getUserById$(params);
  if (!user[0]) {
    throw new Error("User not found");
  }
  const deleteQuery = 'DELETE FROM users WHERE "id" = $1';
  const queryResult = await pool.query(deleteQuery, [id]);
  return queryResult;
};

const createMultipleUsers$ = async (employeeDataArray) => {
  const insertQuery = `INSERT INTO users ("employeeCode", "age") VALUES ($1, $2) RETURNING *`;
  const insertedUsers = [];
  for (const employeeData of employeeDataArray) {
    const { employeeCode, age } = employeeData;
    const result = await pool.query(insertQuery, [employeeCode, age]);
    insertedUsers.push(result.rows[0]);
  }
  return insertedUsers;
};

const deleteMultipleUser$ = async (ids) => {
  const deleteQuery = `DELETE FROM users WHERE id = ANY($1::uuid[])`;
  const queryResult = await pool.query(deleteQuery, [ids]);
  return queryResult;
};

const createUserWithAvatar$ = async (payload) => {
  const { employeeCode, age, avatarFileName, avatarFileData } = payload;
  try {
    const queryResult = await pool.query(
      `INSERT INTO users ("employeeCode", "age","avatarFileName" , "avatarFileData" ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [employeeCode, age, avatarFileName, avatarFileData]
    );
    return queryResult;
  } catch (error) {
    res.status(500).json({ message: "Error creating record" });
  }
};
module.exports = {
  getListUsers$,
  getUserById$,
  createUser$,
  updateUser$,
  deleteUserById$,
  createMultipleUsers$,
  deleteMultipleUser$,
  createUserWithAvatar$,
};
