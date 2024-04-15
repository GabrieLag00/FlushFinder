import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesUbication } from '../Screens/UbicationScreen';


function ButtonDisable({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);

  const handleMaintenanceSelection = (selection) => {
    console.log(`Poner ${selectedEdificio.Nombre} en mantenimiento: ${selection}`);
    // Aquí puedes añadir la lógica para marcar el edificio en mantenimiento
    setModalVisible(false); // Cierra el modal tras hacer la selección
  };

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => { setSelectedEdificio(edificio); setModalVisible(true); }}
          style={stylesButtonDisable.maintenanceButton}>
          <Text style={stylesButtonDisable.maintenanceButtonText}>Poner en mantenimiento</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesButtonDisable.centeredView}>
          <View style={stylesButtonDisable.modalView}>
            <Text style={stylesButtonDisable.modalText}>Selecciona qué baños poner en mantenimiento:</Text>
            <Button title="Hombres" onPress={() => handleMaintenanceSelection('Hombres')} />
            <Button title="Mujeres" onPress={() => handleMaintenanceSelection('Mujeres')} />
            <Button title="Ambos" onPress={() => handleMaintenanceSelection('Ambos')} />
            <Button title="Cancelar" onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>

    </>

  );
}

export const stylesButtonDisable = StyleSheet.create({
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

export default ButtonDisable;