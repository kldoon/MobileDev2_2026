import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppDrawer from './components/navigation/drawer';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase } from './utils/db';

export default function App() {
  return (
    <SQLiteProvider databaseName="users.db" onInit={initDatabase}>
      <View style={styles.container}>
        <NavigationContainer>
          <AppDrawer />
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
