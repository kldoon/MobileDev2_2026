import { Alert } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";

/**
 * 
 * @param {SQLiteDatabase} db 
 * @returns 
 */
function getAllUsers(db) {
  try {
    const result = db.getAllSync('SELECT * FROM users ORDER BY id DESC');
    return result;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

function getUserById(db, id) {
  try {
    const user = db.getFirstSync('SELECT * FROM users WHERE id = $id', { $id: id });
    if (!user) {
      Alert.alert('Error', 'User not found.');
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

/**
 * 
 * @param {SQLiteDatabase} db 
 * @param {{firstName:string, lastName:string, dob:string}} user 
 * @returns 
 */
async function addUser(db, user) {
  try {
    await db.runAsync(`
          INSERT INTO users (firstName, lastName, email, mobile, password, gender, dob) 
          VALUES ($firstName, $lastName, $email, $mobile, $password, $gender, $dob)
        `,
      {
        $firstName: user.firstName,
        $lastName: user.lastName,
        $email: user.email,
        $mobile: user.mobile,
        $password: user.password,
        $gender: user.gender,
        $dob: user.dob
      });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      Alert.alert('Error', 'Email already exists.');
      return;
    }
    throw error;
  }
}

async function editUser(db, user) {
  // Homework: Implement
}

async function deleteUser(db, id) {
  // Homework: Implement
}

export {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserById
}

