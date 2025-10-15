import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import { getUserById } from "../../services/user.service";
import { useSQLiteContext } from "expo-sqlite";

const ViewPatient = () => {
  const db = useSQLiteContext();
  const router = useRoute();
  const id = router.params?.["id"] || "";
  const [currentPatient, setCurrentPatient] = useState({});

  useEffect(() => {
    if (id) {
      const patient = getUserById(db, id);
      if (patient) {
        setCurrentPatient(patient);
      }
    } else {
      // Homework: Implement an alert input to enter the user id
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ViewPatient
      </Text>
      {
        currentPatient.id
          ? <>
            <Text>
              {currentPatient.firstName} {currentPatient.lastName}
            </Text>
            <Text>
              {currentPatient.gender === 1 ? "Male" : "Female"}
            </Text>
            <Text>
              {currentPatient.email}
            </Text>
            <Text>
              {currentPatient.dob}
            </Text>
            <Text>
              {currentPatient.mobile}
            </Text>
          </>
          : <Text>No Patent Selected!</Text>
      }

    </View>
  )
}

export default ViewPatient;


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
});