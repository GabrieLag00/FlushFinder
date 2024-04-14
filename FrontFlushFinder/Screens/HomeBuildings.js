import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView,Modal, Button } from 'react-native';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';
import {getEdificios} from '../api'

function HomeBuilldings ({ navigation }) {
  const [edificios, setEdificios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);

  const handleMaintenanceSelection = (selection) => {
    console.log(`Poner ${selectedEdificio.Nombre} en mantenimiento: ${selection}`);
    // Aquí puedes añadir la lógica para marcar el edificio en mantenimiento
    setModalVisible(false); // Cierra el modal tras hacer la selección
  };

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
  }, []);

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
          <TouchableOpacity onPress={() => navigation.navigate('HomeAlerts')}>
            {/* Asegúrate de que el índice no exceda el tamaño del array de imágenes */}
            <Image source={images[index % images.length]} style={stylesUbication.image} />
            <Text style={[stylesUbication.textUbication, stylesUbication.textContainer]}>{edificio.Nombre}</Text>
          </TouchableOpacity>
                {/* Botón para poner en mantenimiento */}
            <TouchableOpacity
            onPress={() => {setSelectedEdificio(edificio); setModalVisible(true);}}
            style={stylesUbication.maintenanceButton}
            >
            <Text style={stylesUbication.maintenanceButtonText}>Poner en mantenimiento</Text>
            </TouchableOpacity>
                </View>
            ))}
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesUbication.centeredView}>
          <View style={stylesUbication.modalView}>
            <Text style={stylesUbication.modalText}>Selecciona qué baños poner en mantenimiento:</Text>
            <Button title="Hombres" onPress={() => handleMaintenanceSelection('Hombres')} />
            <Button title="Mujeres" onPress={() => handleMaintenanceSelection('Mujeres')} />
            <Button title="Ambos" onPress={() => handleMaintenanceSelection('Ambos')} />
            <Button title="Cancelar" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
  </ScrollView>
  );
}

export default HomeBuilldings;

export const stylesUbication = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    
    maintenanceButton: {
        marginTop: 10,
        backgroundColor: 'orange', // O el color que prefieras
        padding: 10,
        borderRadius: 4,
      },
      maintenanceButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
      },
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
