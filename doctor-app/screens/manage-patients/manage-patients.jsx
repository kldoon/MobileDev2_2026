import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { PATIENTS } from "../../data/patients";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const ManagePatients = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      {
        PATIENTS.map(item => (
          <View key={item.email}>
            <Text>
              {item.firstName} {item.lastName}
            </Text>
            <Text>
              {item.dob}
            </Text>
            <Text>
              {item.gender === 1 ? "Male" : "Female"}
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate("ViewPatient", { email: item.email });
            }}>
              <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        ))
      }
    </ScrollView>
  )
}

export default ManagePatients