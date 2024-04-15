import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';
import { images, useEdificios } from '../components/ImagesBuildings';

function Ubicacion({ navigation }) {
  const edificios = useEdificios();

  return (
    <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
      <Header navigation={navigation} />
      <Text style={[stylesLogin.title, stylesUbication.titleUbication]}>Selecciona tu ubicación</Text>
      <View style={stylesUbication.rowContainer}>
        {edificios.map((edificio, index) => (
          <View key={edificio.EdificioID} style={stylesUbication.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Toilets', { edificioId: edificio.EdificioID })}>
              <Image source={images[index % images.length]} style={stylesUbication.image} />
              <Text style={[stylesUbication.textUbication, stylesUbication.textContainer]}>{edificio.Nombre}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default Ubicacion;

export const stylesUbication = StyleSheet.create({
  containerScrollView: {
    flexGrow: 1,
    backgroundColor: '#3451C6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleUbication: {
    marginVertical: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 30,
  },
  textContainer: {
    backgroundColor: '#0374FF',
    paddingVertical: 30,
    width: 'auto',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  image: {
    height: 220,
    width: 165,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textUbication: {
    fontSize: 20,
    color: '#FEFEFE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});