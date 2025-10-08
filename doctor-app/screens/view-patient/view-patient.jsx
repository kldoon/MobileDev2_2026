import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native"
import { PATIENTS } from "../../data/patients";

const ViewPatient = () => {
  const router = useRoute();
  const email = router.params["email"] || "";
  const [currentPatient, setCurrentPatient] = useState({});

  useEffect(() => {
    const patient = PATIENTS.find(p => p.email === email);
    if (patient) {
      setCurrentPatient(patient);
    }
  }, [email]);

  return (
    <View>
      <Text style={{ fontSize: 25, fontWeight: 700 }}>
        ViewPatient
      </Text>
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
    </View>
  )
}

export default ViewPatient;