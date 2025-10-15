import { View, Text, StyleSheet } from "react-native"

const Dashboard = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dashboard
      </Text>
    </View>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 25,
    fontWeight: 700,
    marginBottom: 20
  }
})