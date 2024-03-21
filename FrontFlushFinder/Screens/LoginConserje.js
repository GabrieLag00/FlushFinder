// En tu componente LoginConserje

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LoginConserje as loginConserjeApi } from '../api'; // Asegúrate de que este import está apuntando correctamente a tu función de API
import { z } from 'zod';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asegúrate de que tu esquema Zod esté definido correctamente
const LoginConserjeSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }).max(255, { message: "El nombre no debe exceder los 255 caracteres" }),
  matricula: z.string().min(4, { message: "La matrícula debe tener al menos 4 caracteres" }).max(4, { message: "La matrícula no debe exceder los 4 caracteres" }),
});

const LoginConserje = () => {
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');

  const login = async () => {
    try {
      // Convertir matricula a número ya que el backend espera un número
      const credenciales = { nombre, matricula: parseInt(matricula, 10) };
  
      // Verificar que matricula no sea NaN antes de enviar
      if (isNaN(credenciales.matricula)) {
        Alert.alert("Error de validación", "La matrícula debe ser numérica.");
        return;
      }
  
      const data = await loginConserjeApi(credenciales);
      await AsyncStorage.setItem('userToken', data.token);
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      // Redirección a otra pantalla
    } catch (error) {
      // Manejar errores de la petición aquí
      Alert.alert("Error de inicio de sesión", "No se pudo iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };
a  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión para Conserjes</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default LoginConserje;

