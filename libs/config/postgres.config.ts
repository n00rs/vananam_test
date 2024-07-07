import { Client, Pool } from "pg";

export  function createPgConnection(db = "") {
  try {
    // const client = new Client(
    //     {
    //         user: process.env.POSTGRESS_USER,
    //         password: process.env.POSTGRESS_PASSWORD,
    //         host: process.env.POSTGRESS_HOST,
    //         port: Number(process.env.POSTGRESS_PORT),
    //         database: process.env.POSTGRESS_DATABASE_NAME,
    //         ssl:true
    //     });
    // await client.connect();
    // return client;

    const pool = new Pool({
      user: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      database: process.env.POSTGRESS_DATABASE_NAME,
      ssl: true,
      max: 1000,
      // idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
    });
    // const client = await pool.connect();
    return pool;
  } catch (err) {
    throw new Error(err);
  }
}
