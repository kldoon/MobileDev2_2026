import { View, Text, StyleSheet, Alert } from "react-native"
import { Button } from '@rneui/base';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDzDKk6u6NJ1sIzCxK7-ZDcffbfjMnjItk",
  authDomain: "doctorapp1-hu.firebaseapp.com",
  projectId: "doctorapp1-hu",
  storageBucket: "doctorapp1-hu.firebasestorage.app",
  messagingSenderId: "368935397855",
  appId: "1:368935397855:web:143a98b3a868dc7bf3fc6a"
};

let app, db;

const Dashboard = () => {

  useEffect(() => {
    if (!app) {
      app = initializeApp(firebaseConfig);
      db = getFirestore(app);
    }

    // const q=query(collection(db, 'todos'), orderBy('createdAt','desc'));

  }, []);

  const addData = async () => {
    try {
      await addDoc(collection(db, 'todos'), {
        text: "Buy bread for home",
        priority: 3,
        createdAt: new Date()
      });
    } catch (error) {
      console.log(error)
     Alert.alert("Something went wrong while adding db");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Dashboard
        <Button title="Add data" onPress={addData} />
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