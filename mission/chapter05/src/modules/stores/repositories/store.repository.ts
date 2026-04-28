import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addStore = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO store (region_id, name, address) VALUES (?, ?, ?)`,
      [data.regionId, data.name, data.address]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`addStore 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getStore = async (storeId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM store WHERE id = ?`, [storeId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`getStore 오류: ${err}`);
  } finally {
    conn.release();
  }
};