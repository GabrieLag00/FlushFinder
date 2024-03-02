import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
/*import fontSizes from '../styles/ClassStyle';*/

function LoginScreen({ navigation }) {
  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Inicia sesión</Text>
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
        <TouchableOpacity style={stylesLogin.button} onPress={() => navigation.navigate('Gender')}>
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

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3451C6',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#FEFEFE',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#8594CB',
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 4,
    width: '80%',
    alignSelf: 'center',
    fontSize: 20,
    color: '#FEFEFE'
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 30,
    backgroundColor: '#0374FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FEFEFE',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ligaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  ligaText: {
    color: '#FEFEFE',
    fontSize: 20,
  },
  ligaTextBold: {
    fontWeight: 'bold',
  },
  viewSpace: {
    paddingLeft: 5,
    paddingRight: 5,
  },

});

export default LoginScreen;
