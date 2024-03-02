import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
/*import fontSizes from '../styles/ClassStyle';*/
import { stylesLogin } from './LoginScreen';

function RegisterScreen({ navigation }) {
  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Regístrate</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="Nombre"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="Gmail"
        keyboardType="email-address"
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
        <TouchableOpacity style={stylesLogin.button} onPress={() => navigation.navigate('Login')}>
          <Text style={stylesLogin.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <View style={stylesLogin.ligaContainer}>
        <Text style={stylesLogin.ligaText}>¿Ya tienes cuenta?</Text>
        <View style={stylesLogin.test}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[stylesLogin.ligaText, stylesLogin.ligaTextBold]}>Inicia aquí</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default RegisterScreen;
