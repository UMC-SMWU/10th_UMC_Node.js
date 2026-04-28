import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

export const addMission = async (data: any): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?)`,
      [data.storeId, data.reward, data.deadline, data.missionSpec]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`addMission 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getMission = async (missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mission WHERE id = ?`, [missionId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`getMission 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getChallengingMission = async (userId: number, missionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM member_mission 
       WHERE user_id = ? AND mission_id = ? AND status = 'CHALLENGING'`,
      [userId, missionId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`getChallengingMission 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const addMemberMission = async (userId: number, missionId: number): Promise<number> => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO member_mission (user_id, mission_id) VALUES (?, ?)`,
      [userId, missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`addMemberMission 오류: ${err}`);
  } finally {
    conn.release();
  }
};

export const getMemberMission = async (memberMissionId: number): Promise<any | null> => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM member_mission WHERE id = ?`, [memberMissionId]
    );
    return rows[0] ?? null;
  } catch (err) {
    throw new Error(`getMemberMission 오류: ${err}`);
  } finally {
    conn.release();
  }
};