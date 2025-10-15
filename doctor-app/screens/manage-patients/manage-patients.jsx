import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { getAllUsers } from "../../services/user.service";

import { useEffect, useState } from "react";
import { useSQLiteContext } from 'expo-sqlite';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const ManagePatients = () => {
  const navigation = useNavigation();  
  const [patient, setPatients] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const res = getAllUsers(db);
    setPatients(res);
  }, []);
  // Homework: fix the not loading issue

  return (
    <ScrollView style={styles.container}>
      {
        patient.map(patient => (
          <View style={styles.patient} key={patient.email}>
            <Text>
              {patient.firstName} {patient.lastName}
            </Text>
            <Text>
              {new Date(patient.dob).toLocaleDateString()}
            </Text>
            <Text>
              {patient.gender === 1 ? "Male" : "Female"}
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ViewPatient", { id: patient.id });
            }}>
              <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default ManagePatients;

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  patient: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});