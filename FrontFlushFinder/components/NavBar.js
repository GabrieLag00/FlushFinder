import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesHeader } from './Header';


function NavBar({ navigation }) {

  return (
    <View style={stylesNavBar.containetNavBar}>

      <View style={stylesNavBar.containerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardBuildings')}>
          <Image
            source={require('../images/building.png')}
            style={stylesHeader.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity style={stylesNavBar.containerTouchs} onPress={() => navigation.navigate('Dashboard')}>
          <Image
            source={require('../images/home.png')}
            style={[stylesHeader.logo]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardSos')}>
          <Image
            source={require('../images/warning.png')}
            style={stylesHeader.logo}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

export const stylesNavBar = StyleSheet.create({
  containetNavBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#8594CB',
  },
  containerIcons: {
    flexDirection: 'row',
  },
  containerTouchs: {
    marginHorizontal: 100,
  },
});

export default NavBar;