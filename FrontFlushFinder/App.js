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
import DashboardScreen from './Screens/DashboardScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Api"/*"Api"*/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Ubication" component={UbicationScreen} />
        <Stack.Screen name="Toilets" component={ToiletsScreen} />
        <Stack.Screen name="Sos" component={SosScreen} />
        <Stack.Screen name="Api" component={ApiScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
