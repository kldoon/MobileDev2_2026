import { View, Text, StyleSheet, Alert, FlatList, TextInput } from "react-native"
import { Button } from '@rneui/base';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import TodoItem from '../../components/common/TodoItem';

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
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    if (!app) {
      try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
      } catch (error) {
        console.log("An error occured!");
        console.log(error);
      }
    }

    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData = [];
      querySnapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosData);
    }, (error) => {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Failed to fetch todos');
    });

    return () => {
      // This code will run when the component is unmounted
      unsubscribe();
    };
  }, []);

  const addData = async () => {
    if (!todoText.trim()) {
      Alert.alert('Error', 'Please enter a todo');
      return;
    }

    try {
      // Insert document (row)
      await addDoc(collection(db, 'todos'), {
        text: todoText,
        priority: 3,
        createdAt: new Date(),
        otherfield: "other field!"
      });
      setTodoText('');
    } catch (error) {
      console.log(error)
      Alert.alert("Something went wrong while adding db");
    }
  }

  const deleteItem = () => {
    // Homework implement this
  }

  const renderTodoItem = ({ item }) => <TodoItem item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new todo..."
          value={todoText}
          onChangeText={setTodoText}
        />
        <Button
          title="Add"
          onPress={addData}
          buttonStyle={styles.addButton}
        />
      </View>

      <Text style={styles.listTitle}>All Todos ({todos.length})</Text>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
        }
      />
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
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  addButton: {
    paddingHorizontal: 20,
    borderRadius: 8
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555'
  },
  listContainer: {
    paddingBottom: 20
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40
  }
})