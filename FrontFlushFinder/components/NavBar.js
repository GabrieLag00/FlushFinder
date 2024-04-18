import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesHeader } from './Header';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

function NavBar({ navigation }) {

  return (
    <View style={stylesNavBar.containerNavBar}>

      <View style={stylesNavBar.containerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardBuildings')}>
          <Image
            source={require('../images/building.png')}
            style={stylesNavBar.imgNavBar}
          />
        </TouchableOpacity>
        <TouchableOpacity style={stylesNavBar.containerTouch} onPress={() => navigation.navigate('Dashboard')}>
          <Image
            source={require('../images/home.png')}
            style={[stylesNavBar.imgNavBar]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardSos')}>
          <Image
            source={require('../images/warning.png')}
            style={stylesNavBar.imgNavBar}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

export const stylesNavBar = StyleSheet.create({
  containerNavBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#8594CB',
    paddingVertical: 10, // Añadido un poco de padding vertical para mejor visualización
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'center', // Asegura que los iconos estén centrados horizontalmente
    alignItems: 'center',
  },
  containerTouch: {
    marginHorizontal: isLargeScreen ? 60 : 35, // Ajusta los márgenes horizontalmente para mantener una buena separación
  },
  imgNavBar: {
    width: isLargeScreen ? 100 : 70, // Tamaño dinámico de los iconos
    height: isLargeScreen ? 100 : 70, // Mismo ajuste para la altura para mantener la proporción
  },
});

export default NavBar;