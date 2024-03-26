import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { stylesLogin } from './LoginScreen';



function LoginConserje() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Inicio de sesión de conserje</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="Matricula"
        keyboardType="numeric"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
      />

      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#FEFEFE"
      />

     <View style={stylesLogin.buttonContainer}>
        <TouchableOpacity style={stylesLogin.button}>
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