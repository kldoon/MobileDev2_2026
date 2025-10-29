import { SQLiteDatabase } from 'expo-sqlite';

/**
 * @param {SQLiteDatabase} db 
 */
export function initDatabase(db) {
  db.execAsync(`
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
  `).then().catch(err => {
    console.log("Error creating table!", err);
  });;

  // Sync (blocking) code
  // const x = Math.log10(500);
  // console.log(x);

  db.getFirstAsync('SELECT COUNT(*) as count FROM users')
    .then((res) => {
      if (res.count < 2) {
        const sampleDob = new Date('1990-01-01').toISOString();

        db.runAsync(`
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
        }).then(res => {
          console.log(res);
          if (res.changes != 0) {
            //success
          }
        }).catch(err => {
          console.log("Error inserting first item!", err);
        });
      }
    })
    .catch(err => {
      console.log("Error inserting first item!", err);
    });



















  // const count = await db.getFirstAsync('SELECT COUNT(*) as count FROM users');

  // if (count.count === 0) {
  //   const sampleDob = new Date('1990-01-01').toISOString();
  //   await db.runAsync(`
  //     INSERT INTO users (firstName, lastName, email, mobile, password, gender, dob) 
  //     VALUES ($firstName, $lastName, $email, $mobile, $password, $gender, $dob)
  //   `, {
  //     $firstName: 'Ahmad',
  //     $lastName: 'Saeed',
  //     $email: 'ahmad@example.com',
  //     $mobile: '123-456-7890',
  //     $password: '123456',
  //     $gender: 0,
  //     $dob: sampleDob
  //   });
  // }
}