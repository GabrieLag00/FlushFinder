import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';


function DashboardScreen({ navigation }) {

  return (
    <View style={stylesLogin.container}>
      <Header navigation={navigation} />
    </View>
  );
}

export const stylesDashboard = StyleSheet.create({

});

export default DashboardScreen;