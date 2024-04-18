import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stylesLogin } from './LoginScreen';
import { registrarUsuario } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

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
                usuarioID: response.usuario.usuarioID,
                nombre: response.usuario.nombre,
                email: response.usuario.email,
                genero: response.usuario.genero,
            }
        };

        // Guardar el token y los datos de usuario en AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');

        navigation.reset({
          index: 0,
          routes: [{ name: 'Ubication' }], // Cambia 'Ubication' por la pantalla a la que quieres ir.
        });
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
      <View style={stylesGender.selectorContainer}>
        <TouchableOpacity onPress={() => setGender(gender === 'M' ? 'F' : 'M')} style={stylesGender.arrow}>
          <MaterialCommunityIcons name="chevron-left" size={120} color="#8594CB" />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={stylesGender.genderIcon}
          onPress={() => completeRegistration(gender)} // Envía el género actual al completar el registro
        >
          <MaterialCommunityIcons
            name={gender === 'M' ? "human-male" : "human-female"}
            size={300}
            color="#FEFEFE"
          />
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => setGender(gender === 'M' ? 'F' : 'M')} style={stylesGender.arrow}>
          <MaterialCommunityIcons name="chevron-right" size={120} color="#8594CB" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// No se hicieron cambios a los estilos, se mantienen como los proporcionaste
const stylesGender = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderIcon: {
    position: 'absolute',
    marginHorizontal: 30,
    zIndex: -1,
  },
  arrow: {
    marginHorizontal: 60,
  },
});

export default GenderSelector;