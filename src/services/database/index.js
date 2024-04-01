const { Pool } = require('pg');
 const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hyper",
    password: "Maiyeuminhem09",
    port: 5433,
  });
pool.connect().then(res=>{
    console.log("Yupppp -------------------> Database connected successfuly!!!");
})
module.exports = pool;
