import { View, Text, StyleSheet } from "react-native"
// import * as SqlLite from 'expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import { useEffect, useState } from "react";

const db = openDatabaseSync("myData1.db");

const setupDatabase = () => {
  db.execSync(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT, email TEXT);'
  );
};

const insertUser = (name, email) => {
  db.runSync(
    `INSERT INTO users (name, email) VALUES ($name, $email);`, { $name: name, $email: email }
  );
};

const getUsers = () => {
  const results = db.getAllSync('SELECT * FROM users;');
  console.log(results);
  return results || [];
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setupDatabase();
    insertUser("Ahmad", "ahmad@hebron.edu");
    insertUser("Saeed", "Saeed@hebron.edu");
    const res = getUsers();
    setUsers(res);
  }, [])


  return (
    <View style={styles.container}>
      <Text>
        Dashboard
      </Text>
      {
        users.map(user => <Text>{user.id}|{user.name}|{user.email}</Text>)
      }
    </View>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})