import { SQLiteDatabase } from 'expo-sqlite';

/**
 * @param {SQLiteDatabase} db 
 */
export async function initDatabase(db) {
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

  const count = await db.getFirstAsync('SELECT COUNT(*) as count FROM users');
  if (count.count === 0) {
    const sampleDob = new Date('1990-01-01').toISOString();
    await db.runAsync(`
      INSERT INTO users (firstName, lastName, email, mobile, password, gender, dob) 
      VALUES ($firstName, $lastName, $email, $mobile, $password, $gender, $dob)
    `, {
      $firstName: 'Ahmad',
      $lastName: 'Saeed',
      $email: 'ahmad@example.com',
      $mobile: '123-456-7890',
      $password: '123456',
      $gender: 0,
      $dob: sampleDob
    });
  }
}