import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { stylesLogin } from '../LoginScreen';
import { stylesUbication } from '../UbicationScreen';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';


function DashboardScreen({ navigation }) {

  return (

    <SafeAreaView style={stylesDashboard.containerSafeArea}>
      <Header navigation={navigation} />
      <View style={stylesDashboard.bodyDash}>
        <Text>Pvto Emi</Text>
      </View>
      <NavBar navigation={navigation} style={stylesDashboard.containerNavBar} />
    </SafeAreaView>


  );
}

export const stylesDashboard = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: '#3451C6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default DashboardScreen;