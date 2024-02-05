import React from 'react';
import { View, Text, Button } from 'react-native';

function UbicationScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ubiaction Screen</Text>
      <Button
        title="Go"
        onPress={() => navigation.navigate('Toilets')}
      />
    </View>
  );
}

export default UbicationScreen;