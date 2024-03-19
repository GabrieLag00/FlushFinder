import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { stylesToilets } from './ToiletsScreen';
import { stylesUbication } from './UbicationScreen';
import { stylesLogin } from './LoginScreen';

function SosScreen({ navigation }) {
  const imageReturn = require('../images/return.png');

  //Rating limpieza
  const [ratingClean, setRatingClean] = useState(0);
  const handleStarPress = (starIndex) => {
    setRatingClean(starIndex); //Actualiza el rating
  };

  //¿El baño no cuenta con?
  const [selectedImages, setSelectedImages] = useState({
    image1: false,
    image2: false,
  });
  const toggleImage = (imageKey) => {
    setSelectedImages((prevState) => ({
      ...prevState,
      [imageKey]: !prevState[imageKey],
    }));
  }; //Actualiza el rating


  return (
    <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>

      <View style={stylesSos.buttonContainer}>
        <TouchableOpacity style={stylesSos.buttonSos} onPress={() => navigation.goBack()}>
          <Image style={stylesSos.imgReturn} source={imageReturn} />
        </TouchableOpacity>
      </View>

      <Text style={stylesLogin.title}>Quejas y sugerencias</Text>

      <View style={stylesSos.ratingViewContainer}>
        <Text style={stylesSos.cleanTitle}>Limpieza</Text>
        <View style={stylesSos.viewRating}>
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity key={index} onPress={() => handleStarPress(index)} style={stylesSos.starButton}>
              <Image
                source={index <= ratingClean ? require('../images/jabon-rating-filled.png') : require('../images/jabon-rating-empty.png')}
                style={[stylesSos.starImage, {marginBottom:'20%'}]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={stylesSos.cleanTitle}>¿El baño no cuenta con?</Text>
        <View style={stylesSos.viewRating}>
          <TouchableOpacity onPress={() => toggleImage('image1')} style={stylesSos.starButton}>
            <Image
              source={selectedImages.image1 ? require('../images/papel-higienico-filled.png') : require('../images/papel-higienico.png')}
              style={stylesSos.starImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleImage('image2')} style={stylesSos.starButton}>
            <Image
              source={selectedImages.image2 ? require('../images/jabon-filled.png') : require('../images/jabon.png')}
              style={stylesSos.starImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={stylesLogin.input}
        placeholder="Nombre"
        keyboardType="first-name-sos"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="Gmail"
        keyboardType="email-address-sos"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="Problema"
        keyboardType="problem-sos"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
      />
      <TextInput
        style={[stylesLogin.input, stylesSos.inputSosComments]}
        placeholder="Comentarios"
        keyboardType="comments-sos"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
      />

      <View style={stylesLogin.buttonContainer}>
        <TouchableOpacity style={[stylesLogin.button, stylesSos.buttonSosContainer]} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={stylesLogin.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

export const stylesSos = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  buttonSos: {
    padding: 15,
    backgroundColor: '#0374FF',
    borderRadius: 30,
    alignItems: 'center',
    width: '20%',

    position: 'relative',
    left: '75%'
  },
  imgReturn: {
    width: 30,
    height: 30,
  },

  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%'
  },
  starButton: {
    margin: 2,
  },
  starImage: {
    width: 60, // Ajusta el tamaño de las estrellas según tus necesidades
    height: 60,
  },
  cleanTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FEFEFE',
    marginTop: '',
    textAlign: 'center',
  },
  buttonSosContainer: {
    marginBottom: '15%'
  },
  inputSosComments: {
    paddingVertical: '25%',
  },
  ratingViewContainer: {
    marginVertical: '10%',
    alignItems:'center'
  },

});

export default SosScreen;
