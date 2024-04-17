import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Dimensions } from 'react-native';
import { stylesToilets } from './ToiletsScreen';
import { stylesUbication } from './UbicationScreen';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const socket = io("http://192.168.100.18:8765");


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
    <ScrollView contentContainerStyle={[stylesUbication.containerScrollView, { paddingHorizontal: 20 }]}>

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
        placeholder="Asunto"
        onChangeText={setProblema}
        value={problema}
      />
      <TextInput
        style={[stylesLogin.input, stylesSos.inputSosComments]}
        placeholder="Descripción del problema"
        onChangeText={setComentarios}
        value={comentarios}
        multiline={true} // Permite múltiples líneas
        numberOfLines={4} // Establece un número inicial de líneas
      />
      <View style={stylesLogin.buttonContainer}>
        <TouchableOpacity style={stylesLogin.button} onPress={handleSendSos}>
          <Text style={stylesLogin.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <View style={stylesLogin.buttonContainer}>
        <TouchableOpacity style={[stylesLogin.button, {backgroundColor:'lightgray'}]} onPress={() => navigation.goBack()}>
          <Text style={stylesLogin.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

export const stylesSos = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonSos: {
    padding: 15,
    backgroundColor: '#0374FF',
    borderRadius: 30,
    alignItems: 'center',
    width: isLargeScreen ? '10%' : '20%', // Ajuste de ancho relativo
    alignSelf: 'flex-end',  // Alineación a la derecha de forma más consistente
    marginRight: isLargeScreen ? '5%' : '10%',  // Margen derecho para alinear correctamente el botón
  },
  imgReturn: {
    width: 30,
    height: 30,
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isLargeScreen ? '5%' : '10%',  // Ajuste del margen inferior basado en el tamaño de pantalla
  },
  starButton: {
    margin: 2,
  },
  starImage: {
    width: isLargeScreen ? 40 : 60,  // Ajuste del tamaño de las imágenes para pantallas grandes
    height: isLargeScreen ? 40 : 60,
  },
  cleanTitle: {
    fontSize: width < 600 ? 30 : 60,
    //fontSize: isLargeScreen ? 24 : 45,
    fontWeight: 'bold',
    color: '#FEFEFE',
    textAlign: 'center',
    marginVertical: 20,  // Espacio vertical para mejorar la distribución
  },
  inputSosComments: {
    paddingVertical: 30, // Reducción de padding vertical para que no sea demasiado en pantallas grandes
  },
  ratingViewContainer: {
    marginVertical: isLargeScreen ? '2%' : '10%',  // Ajuste del espaciado vertical
    alignItems: 'center'
  },

});

export default SosScreen;
