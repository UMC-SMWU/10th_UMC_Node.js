import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addReview = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO review (user_id, store_id, body, score) VALUES (?, ?, ?, ?)`,
      [data.userId, data.storeId, data.body, data.score]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`addReview 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getReview = async (reviewId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM review WHERE id = ?`, [reviewId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`getReview 오류: ${err}`);
  } finally {
    conn.release();
  }
};
