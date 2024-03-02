import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { stylesLogin } from './LoginScreen';

function Ubicacion({ navigation }) {
  const images = [
    require('../images/ut/ut a.jpg'),
    require('../images/ut/ut b.jpg'),
    require('../images/ut/ut c.jpg'),
    require('../images/ut/ut d.jpg'),
    require('../images/ut/ut e.jpg'),
    require('../images/ut/ut f.jpg'),
    require('../images/ut/ut g.jpg'),
    require('../images/ut/ut h.jpg'),
    require('../images/ut/ut k.jpg'),
    require('../images/ut/ut m.jpg'),
  ];

  // Array de nombres de edificios
  const buildingNames = ['Edificio A', 'Edificio B', 'Edificio C', 'Edificio D', 'Edificio E', 'Edificio F', 'Edificio G', 'Edificio H', 'Edificio K', 'Edificio M'];

  return (
    <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>

      <Text style={[stylesLogin.title, stylesUbication.titleUbication]}>Selecciona tu ubicación</Text>

      <View style={stylesUbication.rowContainer}>
        {images.map((image, index) => (
          <View key={index} style={stylesUbication.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Toilets')}>
              <Image source={image} style={stylesUbication.image} />
              <Text style={[stylesUbication.textUbication,stylesUbication.textContainer]}>{buildingNames[index]}</Text>
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