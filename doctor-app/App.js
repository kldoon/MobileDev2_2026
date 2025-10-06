import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Dashboard from './screens/dashboard/dashboard';
import AddPatient from './screens/add-patient/add-patient';
import ManagePatients from './screens/manage-patients/manage-patients';

const Tab = createBottomTabNavigator();

const getScreenOptions = (navOpts) => {
  return {
    tabBarIcon: (tabOpts) => {
      let iconName = "";

      switch (navOpts.route.name) {
        case "Dashboard":
          iconName = tabOpts.focused ? 'view-dashboard-variant' : 'view-dashboard-variant-outline';
          break;
        case "AddPatient":
          iconName = tabOpts.focused ? 'account-plus' : 'account-plus-outline';
          break;
        case "ManagePatients":
          iconName = tabOpts.focused ? 'account-box-multiple' : 'account-box-multiple-outline';
          break;
      };
      return <MaterialCommunityIcons name={iconName} size={24} color={tabOpts.focused ? "blue" : "black"} />
    }
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={getScreenOptions}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
          />
          <Tab.Screen
            name="AddPatient"
            component={AddPatient}
            options={{ title: "Add Patient" }}
          />
          <Tab.Screen
            name="ManagePatients"
            component={ManagePatients}
            options={{ title: "Manage Patients" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
