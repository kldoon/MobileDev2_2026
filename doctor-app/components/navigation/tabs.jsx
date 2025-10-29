import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Dashboard from '../../screens/dashboard/dashboard';
import Todos from '../../screens/todos/todos';
import AddPatient from '../../screens/add-patient/add-patient';
import ManagePatients from '../../screens/manage-patients/manage-patients';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={(navOpts) => {
        return {
          tabBarIcon: (tabOpts) => {
            let iconName = "";

            switch (navOpts.route.name) {
              case "Dashboard":
                iconName = tabOpts.focused ? 'view-dashboard-variant' : 'view-dashboard-variant-outline';
                break;
              case "Todos":
                iconName = tabOpts.focused ? 'invoice-list' : 'invoice-list-outline';
                break;
              case "AddPatient":
                iconName = tabOpts.focused ? 'account-plus' : 'account-plus-outline';
                break;
              case "ManagePatients":
                iconName = tabOpts.focused ? 'account-box-multiple' : 'account-box-multiple-outline';
                break;
            };
            return <MaterialCommunityIcons name={iconName} size={24} />
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          animation: 'shift',
          headerShown: false
        }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        name="Todos"
        component={Todos}
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
  )
}

export default Tabs;