import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import { stylesLogin } from './LoginScreen';
import Header from '../components/Header';
import {getEdificios} from '../api'
import io from 'socket.io-client';

const socket = io("");


function HomeBuildings({ navigation }) {
  //variables  y estados
  const [edificios, setEdificios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);


  //eluseeffect cargar edificios
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

  //el use effect para actualizar la disponibilidad

  useEffect(() => {
    const handleUpdate = (edificioId, disponibilidad) => {
      console.log(`Actualizando edificio ${edificioId} a ${disponibilidad}`); // Debugging de actualización
      setEdificios(currentEdificios => currentEdificios.map(edificio => {
        if (edificio.EdificioID === edificioId) {
          return { ...edificio, Disponibilidad: disponibilidad };
        }
        return edificio;
      }));
    };

    socket.on('edificio-deshabilitado', ({ edificioId }) => {
      console.log(`Evento deshabilitado recibido para edificio ${edificioId}`); // Debugging de eventos de socket
      handleUpdate(edificioId, 'no disponible');
    });

    socket.on('edificio-habilitado', ({ edificioId }) => {
      console.log(`Evento habilitado recibido para edificio ${edificioId}`);
      handleUpdate(edificioId, 'disponible');
    });
  
    return () => {
      socket.off('edificio-deshabilitado');
      socket.off('edificio-habilitado');
    };
  }, []);


  //sleccionar un edificio y que el modal  se muestre
  const selectEdificio = (edificio) => {
    console.log(`Edificio seleccionado: ${edificio.Nombre}`); // Debugging de selección de edificio
    setSelectedEdificio(edificio);
    setModalVisible(true);
  };

  //el modal  sleccionado y  que emitir el evento socket de disponibilidad
  const handleMaintenanceSelection = (selection) => {
    if (selectedEdificio) {
      console.log(`Poner ${selectedEdificio.Nombre} en mantenimiento: ${selection}`); // Debugging de acción de mantenimiento
      socket.emit('deshabilitar-edificio', { 
        edificioId: selectedEdificio.EdificioID,
        mantenimiento: selection
      });
      setModalVisible(false);
    }
  };
  //la funcion para volverlo a habilitar
  const handleReenable = () => {
    if (selectedEdificio && selectedEdificio.EdificioID) {
      console.log(`Rehabilitar edificio ${selectedEdificio.EdificioID}`); // Debugging de rehabilitación
      socket.emit('habilitar-edificio', { edificioId: selectedEdificio.EdificioID });
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
    <ScrollView contentContainerStyle={stylesHB.containerScrollView}>
    <Header navigation={navigation} />
    <Text style={[stylesLogin.title, stylesHB.titleUbication]}>Selecciona tu ubicación</Text>
    <View style={stylesHB.rowContainer}>
      {edificios.map((edificio, index) => (
        <View key={edificio.EdificioID} style={stylesHB.itemContainer}>
          <TouchableOpacity onPress={() => selectEdificio(edificio)}>
            <Image source={images[index % images.length]} style={stylesHB.image} />
            <Text style={[stylesHB.textUbication, stylesHB.textContainer]}>{edificio.Nombre}</Text>
          </TouchableOpacity>

          <Button title="Poner en mantenimiento" onPress={() => selectEdificio(edificio)} />
          <Button title="Re-habilitar" onPress={handleReenable} color="green" />

        </View>
      ))}

    </View>


    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={stylesHB.centeredView}>
        <View style={stylesHB.modalView}>
          <Text style={stylesHB.modalText}>Selecciona qué baños poner en mantenimiento:</Text>
          <Button title="Hombres" onPress={() => handleMaintenanceSelection('Hombres')} />
          <Button title="Mujeres" onPress={() => handleMaintenanceSelection('Mujeres')} />
          <Button title="Ambos" onPress={() => handleMaintenanceSelection('Ambos')} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </View>
      
    </Modal>

  </ScrollView>
  );
}

export default HomeBuildings;


export const stylesHB = StyleSheet.create({
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
