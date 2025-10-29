import { SQLiteDatabase } from 'expo-sqlite';

/**
 * @param {SQLiteDatabase} db 
 */
export const initDatabase = async (db) => {

  try {
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      mobile TEXT,
      password TEXT NOT NULL,
      gender INTEGER NOT NULL DEFAULT 0,
      dob TEXT
    );
  `);
  } catch (err) {
    console.log("Error creating table!", err);
  }

  try {
    const res = await db.getFirstAsync('SELECT COUNT(*) as count FROM users');

    if (res.count < 2) {
      const sampleDob = new Date('1990-01-01').toISOString();

      const insertRes = await db.runAsync(`
      INSERT INTO users (firstName, lastName, email, mobile, password, gender, dob) 
      VALUES ($firstName, $lastName, $email, $mobile, $password, $gender, $dob)
      `, {
        $firstName: 'Ahmad',
        $lastName: 'Saeed',
        $email: 'ahmad2@example.com',
        $mobile: '123-456-7890',
        $password: '123456',
        $gender: 0,
        $dob: sampleDob
      });

      if (insertRes.changes != 0) {
        //success
      }
    }

  } catch (error) {
    console.log("Error inserting first item!", err);
  }
}