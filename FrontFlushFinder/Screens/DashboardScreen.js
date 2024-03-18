import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { stylesLogin } from './LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


function DashboardScreen({ navigation }) {
  const [isActive, setIsActive] = useState(false);
  const handlePress = () => {
    setIsActive(!isActive);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData'); // Asumiendo que así guardaste los datos de sesión
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.navigate('Login'); // Asegúrate de que 'Login' corresponda al nombre de tu pantalla de login en el Navigator
  };
  


  return (
    <View style={stylesLogin.container}>

      <View style={stylesDashboard.container}>
        {/* Logo a la izquierda */}
        <Image
          source={require('../images/FlushFinder-logo-white.png')}
          style={stylesDashboard.logo}
        />

        {/* Contenido del usuario a la derecha */}
        <View style={stylesDashboard.userInfo}>

          <Image
            /*source={{ uri: user.photoUrl }}*/
            source={require('../images/pxndx-photo-user.jpg')}
            style={stylesDashboard.userPhoto}
          />

          <TouchableOpacity onPress={handlePress}>
            <View style={stylesDashboard.container}>
              <Image
                source={require('../images/FlushFinder-logo-white.png')}
                style={stylesDashboard.logo}
              />
              {isActive && (
                <TouchableOpacity style={stylesDashboard.overlay} onPress={handleLogout}>
                  <Text style={stylesDashboard.logoutText}>
                    LogOut
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          <View style={stylesDashboard.userInfoText}>
            <Text style={stylesDashboard.userName}>{/*{user.name}*/}Gahel</Text>
            <Text style={stylesDashboard.userEmail}>{/*{user.email}*/}gahel@gmail.com</Text>
          </View>
        </View>
      </View>

    </View>
  );
}

export const stylesDashboard = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#8594CB',
  },
  logo: {
    width: 60,
    height: 80,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
  },
  userInfoText: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F2F3FE',
  },
  userEmail: {
    fontSize: 18,
    color: '#F2F3FE',
  },





  container: {
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
  },




});

export default DashboardScreen;