import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesHeader } from './Header';
import { stylesUbication } from '../Screens/HomeBuildings';


function Maintenance({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);

  const handleMaintenanceSelection = (selection) => {
    console.log(`Poner ${selectedEdificio.Nombre} en mantenimiento: ${selection}`);
    // Aquí puedes añadir la lógica para marcar el edificio en mantenimiento
    setModalVisible(false); // Cierra el modal tras hacer la selección
  };

  return (
    <TouchableOpacity
      onPress={() => { setSelectedEdificio(edificio); setModalVisible(true); }}
      style={stylesUbication.maintenanceButton}
    >
      <Text style={stylesUbication.maintenanceButtonText}>Poner en mantenimiento</Text>
    </TouchableOpacity>
  );
}

export const stylesNavBar = StyleSheet.create({

});

export default Maintenance;