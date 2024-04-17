import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
/*import fontSizes from '../styles/ClassStyle';*/
import { loginUsuario } from '../api';
import { z } from 'zod';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isLargeScreen = width > 600;
const { width } = Dimensions.get('window');

const LoginSchema = z.object({
  email: z.string()
    .email({ message: "✘ Correo electrónico no válido" })
    .max(255, { message: "✘ El correo electrónico no debe exceder los 255 caracteres" }),
  contrasena: z.string()
    .min(8, { message: "✘ La contraseña debe tener al menos 8 caracteres" })
    .max(50, { message: "✘ La contraseña no debe exceder los 50 caracteres" }),
});

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    try {
      // Validación de los datos ingresados
      LoginSchema.parse({ email, contrasena });

      const response = await loginUsuario({ email, contrasena });

      if (response.token && response.usuario) {
        // Datos de usuario y token
        const userData = {
          token: response.token,
          usuario: {
            usuarioID: response.usuario.id,
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
      } else {
        Alert.alert("Inicio de sesión fallido", "Verifica tus credenciales.");
      }
    } catch (error) {
      if (error.response) {
        // Muestra el mensaje de error específico devuelto por el backend
        Alert.alert("Error en el inicio de sesión", error.response.data.message);
      } else if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formErrors);
      } else {
        Alert.alert("Error en el inicio de sesión", "No se pudo iniciar sesión. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Iniciar sesión</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={stylesLogin.errorText}>{errors.email}</Text>}
      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#FEFEFE"
        value={contrasena}
        onChangeText={setContrasena}
      />
      {errors.contrasena && <Text style={stylesLogin.errorText}>{errors.contrasena}</Text>}
      <View style={stylesLogin.buttonContainer}>
        <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
          <Text style={stylesLogin.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>


      <View style={stylesLogin.ligaContainer}>

        <View>
          <View style={stylesLogin.viewFlex}>
            <Text style={stylesLogin.ligaText}>¿No tienes cuenta?</Text>
            <View style={stylesLogin.viewSpace} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[stylesLogin.ligaText, stylesLogin.ligaTextBold]}>Regístrate</Text>
            </TouchableOpacity>
          </View>

          <View style={stylesLogin.viewFlex}>
            <Text style={stylesLogin.ligaText}>¿Eres un conserje?</Text>
            <View style={stylesLogin.viewSpace} />
            <TouchableOpacity onPress={() => navigation.navigate('ConserjeLogin')}>
              <Text style={[stylesLogin.ligaText, stylesLogin.ligaTextBold]}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>

      

    </View>
  );
}

export const stylesLogin = StyleSheet.create({
  errorText: {
    color: '#FF0303',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#3451C6',
    justifyContent: 'center',
    padding: 20, // Añade un poco de padding alrededor para evitar que los elementos toquen los bordes de la pantalla
  },
  title: {
    fontWeight: 'bold',
    fontSize: isLargeScreen ? 24 : 45,
    //fontSize: width < 600 ? 30 : 60, // Tamaño dinámico del título dependiendo de si es dispositivo móvil o web
    color: '#FEFEFE',
    marginBottom: 30,
    textAlign: 'center',
    marginVertical: 20, // Reducir el margen vertical para pequeñas pantallas
  },
  input: {
    backgroundColor: '#8594CB',
    //marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 4,
    width: '100%', // Usa el 100% del contenedor, ajusta el contenedor en su lugar
    alignSelf: 'center',
    fontSize: 20,
    color: '#FEFEFE'
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%', // Ajustar el ancho para hacer que los botones sean más accesibles en pantallas más pequeñas
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 20, // Reducir el padding vertical para dispositivos más pequeños
    backgroundColor: '#0374FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FEFEFE',
    fontWeight: 'bold',
    fontSize: 18, // Un tamaño de fuente ligeramente más pequeño para adaptarse mejor a diferentes tamaños de pantalla
  },
  ligaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    flexWrap: 'wrap', // Permitir que los enlaces se ajusten en pantallas pequeñas
  },
  ligaText: {
    color: '#FEFEFE',
    fontSize: 18, // Tamaño de fuente más adecuado para móviles y web
  },
  ligaTextBold: {
    fontWeight: 'bold',
  },
  viewSpace: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  viewFlex: {
    flexDirection: 'row',
    justifyContent: 'center', // Asegurarse de que los textos estén centrados
  },

});

export default LoginScreen;
