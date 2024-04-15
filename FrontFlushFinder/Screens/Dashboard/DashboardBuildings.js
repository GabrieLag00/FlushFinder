import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { stylesLogin } from '../LoginScreen';
import Ubicacion, { stylesUbication } from '../UbicationScreen';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, useEdificios } from '../../components/ImagesBuildings';
import ButtonDisable from '../../components/ButtonDisable';

function DashboardBuildings({ navigation }) {
  const edificios = useEdificios();

  return (

    <SafeAreaView style={stylesDashboard.containerSafeArea}>
      <Header navigation={navigation} />
      <View style={stylesDashboard.bodyDash}>
        <Text>Maricon Emi</Text>

        <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
          <View style={stylesUbication.rowContainer}>
            {edificios.map((edificio, index) => (
              <View key={edificio.EdificioID} style={stylesUbication.itemContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Toilets', { edificioId: edificio.EdificioID })}>
                  <Image source={images[index % images.length]} style={stylesUbication.image} />
                  <Text style={[stylesUbication.textUbication, stylesUbication.textContainer]}>{edificio.Nombre}</Text>
                  <ButtonDisable />


                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

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

export default DashboardBuildings;