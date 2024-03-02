import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stylesLogin } from './LoginScreen';

function GenderSelector({ navigation }) {
  const [gender, setGender] = useState('male');

  const toggleGender = () => {
    setGender((prevGender) => (prevGender === 'male' ? 'female' : 'male'));
  };

  return (
    <View style={stylesLogin.container}>

      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={toggleGender} style={styles.arrow}>
          <MaterialCommunityIcons name="chevron-left" size={200} color="#8594CB" />
        </TouchableOpacity>


        <TouchableOpacity style={styles.genderIcon} onPress={() => navigation.navigate('Ubication')}>
          <MaterialCommunityIcons
            name={gender === 'male' ? 'human-male' : 'human-female'}
            size={400}
            color="#FEFEFE"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleGender} style={styles.arrow}>
          <MaterialCommunityIcons name="chevron-right" size={200} color="#8594CB" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderIcon: {
    position: 'absolute',
    zIndex: -1,
  },
  arrow: {
    marginHorizontal: 50,
  },
});

export default GenderSelector;