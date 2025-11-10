import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { createUser, getUsers } from "../../services/user-api.services";
import { Button } from "@rneui/themed";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="Add User" onPress={() => {
        const user = {
          firstName: "Ahmad",
          lastName: "Saeed",
          age: 15,
          email: 'Ahmad@example.com',
          password: '123',
          confirmPassowrd: '123'
        };

        createUser(user);
      }} />
      {
        users.map(user => {
          return <Text key={user.id}>
            {user.id}
            /
            {user.name}
            /
            {user.username}
            /
            {user.email}
            /
            {user.address?.street}
            /
            {user.address?.city}
            ===========================================
          </Text>
        })
      }
    </View>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333'
  }
})