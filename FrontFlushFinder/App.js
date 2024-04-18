import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import GenderScreen from './Screens/GenderScreen';
import UbicationScreen from './Screens/UbicationScreen';
import ToiletsScreen from './Screens/ToiletsScreen';
import ApiScreen from './Screens/ApiScreen'
import SosScreen from './Screens/SosScreen';
import DashboardScreen from './Screens/Dashboard/DashboardScreen';
import LoginConserje from './Screens/LoginConserje';
import HomeConserje from './Screens/HomeConserje';
import HomeBuildings from './Screens/HomeBuildings';
import HomeAlerts from './Screens/HomeAlerts';
import DashboardBuildings from './Screens/Dashboard/DashboardBuildings';
import DashboardSos from './Screens/Dashboard/DashboardSos';
import Maintenance from './components/Maintenance';
import ButtonDisable from './components/ButtonDisable';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"/*"Api"*/
        screenOptions={{
          headerShown: false  // Esta línea oculta la cabecera en todas las pantallas
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Ubication" component={UbicationScreen} />
        <Stack.Screen name="Toilets" component={ToiletsScreen} />
        <Stack.Screen name="Sos" component={SosScreen} />
        <Stack.Screen name="Api" component={ApiScreen} />

        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="DashboardBuildings" component={DashboardBuildings} />
        <Stack.Screen name="DashboardSos" component={DashboardSos} />

        <Stack.Screen name="ConserjeLogin" component={LoginConserje} />
        <Stack.Screen name="HomeConserje" component={HomeConserje} />
        <Stack.Screen name="HomeBuildings" component={HomeBuildings} />
        <Stack.Screen name="HomeAlerts" component={HomeAlerts} />
        <Stack.Screen name="Mantenimiento" component={Maintenance} />
        <Stack.Screen name="test" component={ButtonDisable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
