import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#fff"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>¡Comienza ahora!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <Button
          title="Go"
          onPress={() => navigation.navigate('Register')}
          color="#000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00569D', // Este es el color de fondo azul para toda la pantalla
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50, // Aumentado para más espacio
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#b5bac9',
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20, // Ajusta el espacio sobre el botón
    width: '80%', // Ancho del botón
    alignSelf: 'center', // Centra el botón horizontalmente
  },
  button: {
    paddingVertical: 12, // Altura del botón
    backgroundColor: '#318CE7', // Un azul más fuerte
    borderRadius: 10,
    alignItems: 'center', // Asegura que el texto esté centrado
    justifyContent: 'center', // Centra verticalmente el texto en el botón
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  navigationContainer: {
    paddingBottom: 20, // Aumenta este valor para mover el botón hacia arriba
  }
});

export default LoginScreen;
