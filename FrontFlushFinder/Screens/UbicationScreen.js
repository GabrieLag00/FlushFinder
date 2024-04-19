import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';
import { getEdificios } from '../api'
import io from 'socket.io-client';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const socket = io("http://192.168.0.190:8765");

function Ubicacion({ navigation }) {
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    const cargarEdificios = async () => {
      try {
        const data = await getEdificios();
        setEdificios(data);
      } catch (error) {
        console.error("Error al cargar los edificios:", error);
      }
    };

    cargarEdificios();
    // Escuchar eventos de disponibilidad de edificios
    socket.on('edificio-deshabilitado', ({ edificioId }) => {
      updateEdificioDisponibilidad(edificioId, 'no disponible');
    });

    socket.on('edificio-habilitado', ({ edificioId }) => {
      updateEdificioDisponibilidad(edificioId, 'disponible');
    });

    return () => {
      socket.off('edificio-deshabilitado');
      socket.off('edificio-habilitado');
    };
  }, []);

  const updateEdificioDisponibilidad = (edificioId, disponibilidad) => {
    const updatedEdificios = edificios.map(edificio => {
      if (edificio.EdificioID === edificioId) {
        return { ...edificio, Disponibilidad: disponibilidad };
      }
      return edificio;
    });
    setEdificios(updatedEdificios);
  };

  const handleSelectEdificio = (edificio) => {
    if (edificio.Disponibilidad === 'no disponible') {
      Alert.alert("Acceso Denegado", `El baño de este edificio (${edificio.Nombre}) está en mantenimiento. Por favor, busca otro baño.`);
    } else {
      navigation.navigate('Toilets', { edificioId: edificio.EdificioID });
    }
  };

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

  return (
    <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
      <Header navigation={navigation} />
      <Text style={[stylesLogin.title, stylesUbication.titleUbication]}>Selecciona tu ubicación</Text>
      <View style={stylesUbication.rowContainer}>
        {edificios.map((edificio, index) => (
          <View key={edificio.EdificioID} style={stylesUbication.itemContainer}>
            <TouchableOpacity onPress={() => handleSelectEdificio(edificio)}>
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
    marginBottom: 60,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 180,
    width: '100%',
    flex: 1,
    display: 'flex',
  },
  itemContainer: {
    width: '50%', // Cada elemento ocupa el 50% del ancho del rowContainer
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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