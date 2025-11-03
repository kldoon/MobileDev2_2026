import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { getUsers } from "../../services/user-api.services";

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
      {
        users.map(user => {
          return <Text>
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