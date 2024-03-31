import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { stylesLogin } from './LoginScreen';
import { loginConserje } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


function LoginConserje({navigation}) {
  const [matricula, setMatricula] = useState('');
  const [contrasena, setContrasena] = useState('');


  const handleLogin = async () => {
    try {
      // Convertir la matrícula de string a número
      const matriculaNumerica = parseInt(matricula, 10);
      if (isNaN(matriculaNumerica)) {
        Alert.alert("Error", "La matrícula debe ser un número.");
        return;
      }
  
      const response = await loginConserje({ matricula: matriculaNumerica, contrasena });
      if (response.token) {
        // Almacenar el token y los datos de sesión específicos del conserje
        await AsyncStorage.setItem('conserjeToken', response.token);
        // Considera también almacenar otros datos del conserje si es necesario
        await AsyncStorage.setItem('conserjeData', JSON.stringify({
          nombre: response.nombre,
          matricula: response.matricula
        }));
  
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeConserje' }],
        });
      } else {
        Alert.alert('Error', 'Inicio de sesión incorrecto');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar sesión :(');
    }
  };
  

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Inicio de sesión de conserje</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="Matricula"
        keyboardType="numeric"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
        onChangeText={setMatricula}
        value={matricula}
      />

      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#FEFEFE"
        onChangeText={setContrasena}
        value={contrasena}
      />

     <View style={stylesLogin.buttonContainer}>
        <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
          <Text style={stylesLogin.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={stylesLogin.ligaContainer}>
        <Text style={stylesLogin.ligaText}>¿No tienes cuenta?</Text>
        <View style={stylesLogin.viewSpace}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[stylesLogin.ligaText, stylesLogin.ligaTextBold]}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>  
    </View>
  );
}

export default LoginConserje;