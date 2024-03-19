import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stylesLogin } from './LoginScreen';
import { registrarUsuario } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asegúrate de incluir `route` en las props para acceder a los parámetros
function GenderSelector({ navigation, route }) {
  // Inicializa el género como 'M'
  const [gender, setGender] = useState('M');

  // Obtiene los datos del registro desde los parámetros de la ruta
  const { nombre, email, contrasena } = route.params;

  const completeRegistration = async (selectedGender) => {
    try {
      const response = await registrarUsuario({
        nombre,
        email,
        contrasena,
        genero: selectedGender,
      });

      if (response.token && response.usuario) {
        // Preparar los datos del usuario con solo el nombre y el email
        const userData = {
            token: response.token,
            usuario: {
                nombre: response.usuario.nombre,
                email: response.usuario.email,
            }
        };

        // Guardar el token y los datos de usuario en AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');

        // Navega a la pantalla Ubication
        navigation.navigate('Ubication');
        Alert.alert("Registro exitoso", "Tu cuenta ha sido creada.");
      } else {
        // Si no se obtiene un token, muestra un mensaje de error
        Alert.alert("Registro fallido", "No se pudo completar tu registro.");
      }
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