import { Pool } from "pg";
import config from "./dbConfig";

type QueryFunction = (sql: string, params?: any[]) => Promise<any>;

const pool = new Pool(config.postgresdb);

const query: QueryFunction = async (sql, params = []) => {
  try {
    const { rows } = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

export default query;
