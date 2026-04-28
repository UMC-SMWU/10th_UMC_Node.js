import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addUser = async (data: any): Promise<number | null> => {
  const conn = await pool.getConnection();
  try {
    const [confirm] = await pool.query<RowDataPacket[]>(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExist`,
      [data.email]
    );
    if (confirm[0]?.isExist) return null;

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO user (email, password, name, nickname, phone, gender, birth)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.email, data.password, data.nickname, data.nickname, data.phone, data.gender, data.birth]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`addUser 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getUser = async (userId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM user WHERE id = ?`, [userId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`getUser 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getCategoryIdByName = async (name: string): Promise<number | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id FROM food_category WHERE name = ?`, [name]
    );
    return rows[0]?.id ?? null;
  } catch (err) {
    throw new Error(`getCategoryIdByName 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const setPreference = async (userId: number, categoryId: number): Promise<void> => {
  const conn = await pool.getConnection();
  try {
    await pool.query(
      `INSERT INTO user_favor_category (user_id, food_category_id) VALUES (?, ?)`,
      [userId, categoryId]
    );
  } catch (err) {
    throw new Error(`setPreference 오류: ${err}`);
  } finally {
    conn.release();
  }
};