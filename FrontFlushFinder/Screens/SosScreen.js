import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { stylesToilets } from './ToiletsScreen';
import { stylesUbication } from './UbicationScreen';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';


const socket = io("http://10.10.50.21:8765");


function SosScreen({ navigation, route }) {
  const imageReturn = require('../images/return.png');
  const [ratingClean, setRatingClean] = useState(0);
  const [selectedImages, setSelectedImages] = useState({
    noPaper: false,
    noSoap: false
  });
  const [problema, setProblema] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [userData, setUserData] = useState(null);

  const handleStarPress = (starIndex) => {
    setRatingClean(starIndex);
  };


  const toggleImage = (imageKey) => {
    setSelectedImages(prevState => ({
      ...prevState,
      [imageKey]: !prevState[imageKey]
    }));
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const userDataJson = await AsyncStorage.getItem('userData');
      if (userDataJson) {
        const user = JSON.parse(userDataJson);
        setUserData(user);
      }
    };
    fetchUserData();
  }, []);


  
  const handleSendSos = async () => {
    if (!userData) {
      Alert.alert("Error", "No se pudo recuperar la información del usuario.");
      return;
    }

    const sosData = {
      UsuarioID: userData.usuario.usuarioID,  // Usar el usuarioID almacenado
      BanoID: route.params.banoId, // Asegúrate de que BanoID es pasado como parámetro
      Problema: problema,
      RatingLimpieza: ratingClean,
      Papel: selectedImages.image1,
      Jabon: selectedImages.image2,
      Comentarios: comentarios,
    };

    socket.emit('enviar-sos', sosData, (response) => {
      console.log('Respuesta del servidor:', response);
      Alert.alert("Reporte enviado", "Tu reporte ha sido enviado exitosamente.");
      navigation.goBack();
    });
  };

  return (
    <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>

      <Header navigation={navigation} />

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
                style={[stylesSos.starImage, { marginBottom: '20%' }]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={stylesSos.cleanTitle}>¿El baño no cuenta con?</Text>
        <View style={stylesSos.viewRating}>
          <TouchableOpacity onPress={() => toggleImage('noPaper')} style={stylesSos.starButton}>
            <Image
              source={selectedImages.noPaper ? require('../images/papel-higienico-filled.png') : require('../images/papel-higienico.png')}
              style={stylesSos.starImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleImage('noSoap')} style={stylesSos.starButton}>
            <Image
              source={selectedImages.noSoap ? require('../images/jabon-filled.png') : require('../images/jabon.png')}
              style={stylesSos.starImage}
            />
          </TouchableOpacity>
        </View>
      </View>

     
     
      <TextInput
        style={stylesLogin.input}
        placeholder="Describa el problema"
        onChangeText={setProblema}
        value={problema}
      />
      <TextInput
        style={[stylesLogin.input, stylesSos.inputSosComments]}
        placeholder="Comentarios adicionales"
        onChangeText={setComentarios}
        value={comentarios}
      />
      <TouchableOpacity style={stylesLogin.button} onPress={handleSendSos}>
        <Text style={stylesLogin.buttonText}>Enviar</Text>
      </TouchableOpacity>

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
    alignItems: 'center'
  },

});

export default SosScreen;
