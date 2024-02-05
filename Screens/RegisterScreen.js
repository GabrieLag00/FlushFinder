import React from 'react';
import { View, Text, Button } from 'react-native';

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      <Button
        title="Go"
        onPress={() => navigation.navigate('Gender')}
      />
    </View>
  );
}

export default RegisterScreen;
