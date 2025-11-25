import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ViewPatient from '../../screens/view-patient/view-patient';
import AboutApp from '../../screens/about/about';
import Tabs from './tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import TakeImage from '../../screens/take-image/take-image';
import MyLocation from '../../screens/my-location/my-location';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <View style={{ marginVertical: 20, borderTopColor: '#ccc', borderTopWidth: 2 }} />
    <TouchableOpacity onPress={() => { alert("Logged Out!") }} style={{ marginLeft: 20 }}>
      <MaterialCommunityIcons name="logout" size={20} color="#ff4444" />
      <Text>Logout</Text>
    </TouchableOpacity>
  </DrawerContentScrollView>
)

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={(navOpts) => {
        return {
          drawerIcon: () => {
            let iconName = '';

            switch (navOpts.route.name) {
              case "Home":
                iconName = 'home-outline';
                break;
              case "ViewPatient":
                iconName = 'account-box-outline';
                break;
              case "TakeImage":
                iconName = 'camera-outline';
                break;
              case "MyLocation":
                iconName = 'crosshairs-gps';
                break;
              case "About":
                iconName = 'information-box-outline';
            };
            return <MaterialCommunityIcons name={iconName} size={24} />
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          animation: 'shift',
          headerTitle: 'Doctor App'
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Tabs}
      />
      <Drawer.Screen
        name="ViewPatient"
        component={ViewPatient}
      />
      <Drawer.Screen
        name="TakeImage"
        component={TakeImage}
        options={{ title: "Take Image" }}
      />
      <Drawer.Screen
        name="MyLocation"
        component={MyLocation}
        options={{ title: "Track Location" }}
      />
      <Drawer.Screen
        name="About"
        component={AboutApp}
        options={{ title: "About App" }}
      />
    </Drawer.Navigator >
  )
}

export default AppDrawer;