import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stylesLogin } from './LoginScreen';
import { registrarUsuario } from '../api';

// Asegúrate de incluir `route` en las props para acceder a los parámetros
function GenderSelector({ navigation, route }) {
  // Inicializa el género como 'M'
  const [gender, setGender] = useState('M');

  // Obtiene los datos del registro desde los parámetros de la ruta
  const { nombre, email, contrasena } = route.params;

  const completeRegistration = async (selectedGender) => {
    try {
      await registrarUsuario({
        nombre,
        email,
        contrasena,
        genero: selectedGender === 'M' ? 'M' : 'F', // Convierte 'male' a 'M' y 'female' a 'F'
      });
      Alert.alert("Registro exitoso", "Tu cuenta ha sido creada.");
    } catch (error) {
      console.error("Error durante el registro: ", error);
      Alert.alert("Error en el registro", "No se pudo completar tu registro. Inténtalo de nuevo.");
    }
  };

  return (
    <View style={stylesLogin.container}>
      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={() => setGender(gender === 'M' ? 'F' : 'M')} style={styles.arrow}>
          <MaterialCommunityIcons name="chevron-left" size={60} color="#8594CB" />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.genderIcon}
          onPress={() => completeRegistration(gender)} // Envía el género actual al completar el registro
        >
          <MaterialCommunityIcons
            name={gender === 'M' ? "human-male" : "human-female"}
            size={100}
            color="#8594CB"
          />
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => setGender(gender === 'M' ? 'F' : 'M')} style={styles.arrow}>
          <MaterialCommunityIcons name="chevron-right" size={60} color="#8594CB" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// No se hicieron cambios a los estilos, se mantienen como los proporcionaste
const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderIcon: {
    position: 'absolute',
    zIndex: -1,
  },
  arrow: {
    marginHorizontal: 50,
  },
});

export default GenderSelector;