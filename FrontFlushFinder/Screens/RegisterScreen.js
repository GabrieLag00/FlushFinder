import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
/*import fontSizes from '../styles/ClassStyle';*/
import { stylesLogin } from './LoginScreen';
import { z } from 'zod';


const styles = StyleSheet.create({
  // Tus otros estilos existentes aquí
  errorText: {
    color: 'red', // El color del texto de error
    fontSize: 14, // Tamaño del texto
    marginLeft: 20, // Margen izquierdo para alinear con el input
    marginTop: 5, // Espacio entre el input y el mensaje de error
  },
});


const RegistroSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre no debe exceder los 100 caracteres" }),
  email: z.string()
    .email({ message: "Correo electrónico no válido" })
    .max(255, { message: "El correo electrónico no debe exceder los 255 caracteres" }),
  contrasena: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(50, { message: "La contraseña no debe exceder los 50 caracteres" })
    .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra" })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial" }),
  // Asumimos que el género será validado en otra pantalla
});


function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const formData = { nombre, email, contrasena }; // Prepara los datos del formulario

    try {
      RegistroSchema.parse(formData); // Intenta validar los datos con Zod
      setErrors({}); // Limpia los errores si la validación es exitosa
      navigation.navigate('Gender', { nombre, email, contrasena }); // Navega a la próxima pantalla
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message; // Construye un objeto de errores
          return acc;
        }, {});
        setErrors(newErrors); // Actualiza el estado de errores
      }
    }
  };
  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Regístrate</Text>
      
      <TextInput
        style={stylesLogin.input}
        placeholder="Nombre"
        autoCapitalize="none"
        placeholderTextColor="#FEFEFE"
        value={nombre}
        onChangeText={setNombre}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      
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
        <TouchableOpacity style={stylesLogin.button} onPress={handleRegister}>
          <Text style={stylesLogin.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
  
      <View style={stylesLogin.ligaContainer}>
        <Text style={stylesLogin.ligaText}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[stylesLogin.ligaText, stylesLogin.ligaTextBold]}>Inicia aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  }
export default RegisterScreen;
