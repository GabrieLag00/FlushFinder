import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Header({ navigation }) {
  const [user, setUser] = useState({ name: 'Cargando...', email: 'Cargando...' });

  const [isActive, setIsActive] = useState(false);
  const handlePress = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUser({ name: userData.usuario.nombre, email: userData.usuario.email });
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('isLoggedIn');
    navigation.navigate('Login');
  };

  return (
    <View style={stylesHeader.ContainerUserInfo}>
      <TouchableOpacity onPress={handlePress}>
        <View style={stylesHeader.container}>
          <Image
            source={require('../images/FlushFinder-logo-white.png')}
            style={stylesHeader.logo}
          />
          {isActive && (
            <TouchableOpacity style={stylesHeader.overlay} onPress={handleLogout}>
              <Text style={stylesHeader.logoutText}>
                LogOut
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <View style={stylesHeader.userInfoText}>
        <Text style={stylesHeader.userName}>{user.name}</Text>
        <Text style={stylesHeader.userEmail}>{user.email}</Text>
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
    backgroundColor: 'green'
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

export default Header;