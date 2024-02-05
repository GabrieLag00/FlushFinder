import React from 'react';
import { View, Text, Button } from 'react-native';

function GenderScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Gender Screen</Text>
      <Button
        title="Go"
        onPress={() => navigation.navigate('Ubication')}
      />
    </View>
  );
}

export default GenderScreen;
