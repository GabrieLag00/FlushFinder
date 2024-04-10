import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Header({ navigation }) {
  const [userDetails, setUserDetails] = useState({ name: 'Cargando...', detail: 'Cargando...' });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataString = await AsyncStorage.getItem('userData');
      const conserjeDataString = await AsyncStorage.getItem('conserjeData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserDetails({ name: userData.usuario.nombre, detail: userData.usuario.email });
      } else if (conserjeDataString) {
        const conserjeData = JSON.parse(conserjeDataString);
        setUserDetails({ name: conserjeData.nombre, detail: `Matrícula: ${conserjeData.matricula}` });
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['userData', 'isLoggedIn', 'conserjeData', 'conserjeToken']);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  return (
    <View style={stylesHeader.ContainerUserInfo}>
    <TouchableOpacity onPress={() => setIsActive(!isActive)}>
      <View style={stylesHeader.container}>
        <Image
          source={require('../images/FlushFinder-logo-white.png')}
          style={stylesHeader.logo}
        />
        {isActive && (
          <TouchableOpacity style={stylesHeader.overlay} onPress={handleLogout}>
            <Text style={stylesHeader.logoutText}>Salir</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
    <View style={stylesHeader.userInfoText}>
      <Text style={stylesHeader.userName}>{userDetails.name}</Text>
      <Text style={stylesHeader.userEmail}>{userDetails.detail}</Text>
    </View>
  </View>
  );
}

export const stylesHeader = StyleSheet.create({
  logo: {
    width: 60,
    height: 80,
  },
  ContainerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'green'//
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
    borderRadius: 50,
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },




});

export default Header;