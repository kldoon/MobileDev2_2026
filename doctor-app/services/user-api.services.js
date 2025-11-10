import { Alert } from "react-native";
/*
const getUsers = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      return res.json()
        .then(data => {
          return data;
        });
    })
}
*/

const deleteUser = async (user) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'DELETE'
    });

    if (res.status === 200) {
      Alert.alert("Delete", "User Deleted Successfully!");
    }
  } catch (error) {
    Alert.alert("Failed", "Failed to Deleted User!");
  }
}

const updateUser = async (user) => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    });
    if (res.status === 200) {
      Alert.alert("Success", "User Updaed Successfully!");
    }
  } catch (error) {
    Alert.alert("Failed", "Failed to Updated User!");
  }
}

const createUser = async (user) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/", {
      method: 'POST',
      body: JSON.stringify(user)
    });
    if (res.status === 201) {
      Alert.alert("Success", "User Added Successfully!");
    }
  } catch (error) {
    Alert.alert("Failed", "Failed to Add User!");
  }
}

const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/");
  const data = await res.json();
  return data;
}

export {
  getUsers,
  createUser
}