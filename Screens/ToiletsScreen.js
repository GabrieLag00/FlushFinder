import React from 'react';
import { View, Text, Button } from 'react-native';

function ToiletsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Toilets Screen</Text>
      <Button
        title="Go"
      />
    </View>
  );
}

export default ToiletsScreen;