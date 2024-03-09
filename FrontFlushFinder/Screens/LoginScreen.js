import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
/*import fontSizes from '../styles/ClassStyle';*/
import { loginUsuario } from '../api';
import {z} from 'zod';

const LoginSchema = z.object({
  email: z.string()
    .email({ message: "Correo electrónico no válido" })
    .max(255, { message: "El correo electrónico no debe exceder los 255 caracteres" }),
  contrasena: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(50, { message: "La contraseña no debe exceder los 50 caracteres" }),
});




function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errors, setErrors] = useState({});



  const handleLogin = async () => {
    try {
      // Validar los datos de entrada con Zod
      LoginSchema.parse({ email, contrasena });

      // Intentar iniciar sesión a través de la API
      const response = await loginUsuario({ email, contrasena });

      // Si el inicio de sesión es exitoso, proceder según la lógica de tu app
      // Por ejemplo: navigation.navigate('Home');
      Alert.alert("Inicio de sesión exitoso", "Bienvenido a la aplicación.");

      // Limpia los errores, si los hubiera
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Actualizar el estado de errores con los mensajes de Zod
        const newErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        console.error("Error durante el inicio de sesión: ", error);
        Alert.alert("Error en el inicio de sesión", "No se pudo iniciar sesión. Inténtalo de nuevo.");
      }
    }
  };


  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Inicia sesión</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="Gmail"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#FEFEFE"
        value={contrasena}
        onChangeText={setContrasena}
      />
      {errors.contrasena && <Text style={styles.errorText}>{errors.contrasena}</Text>}
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

export const stylesLogin = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
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
