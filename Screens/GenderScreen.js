import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Si estás usando Expo

function GenderSelector({ navigation }) {
  const [gender, setGender] = useState('male');

  const toggleGender = () => {
    setGender((prevGender) => (prevGender === 'male' ? 'female' : 'male'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={toggleGender} style={styles.arrow}>
          <MaterialCommunityIcons name="chevron-left" size={44} color="white" />
        </TouchableOpacity>
        
        <MaterialCommunityIcons
          name={gender === 'male' ? 'gender-male' : 'gender-female'}
          size={450}
          color="white"
        />

        <TouchableOpacity onPress={toggleGender} style={styles.arrow}>
          <MaterialCommunityIcons name="chevron-right" size={44} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => navigation.navigate('Ubication')}
      >
        <Text style={styles.navigationButtonText}>Ir a Ubicación</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00569D', // Este es el color de fondo azul para toda la pantalla
    justifyContent: 'center', // Alinea el selector y el botón en el centro de la pantalla verticalmente
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    padding: 10,
  },
  navigationButton: {
    backgroundColor: '#318CE7', // Un azul más fuerte para el botón
    borderRadius: 10,
    paddingHorizontal: 40, // Ancho del botón
    paddingVertical: 12, // Altura del botón
    alignItems: 'center', // Asegura que el texto esté centrado horizontalmente
    justifyContent: 'center', // Centra verticalmente el texto en el botón
    marginVertical: 30, // Espacio vertical desde el selector de género
    alignSelf: 'center', // Alinea el botón en el centro horizontalmente
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GenderSelector;
