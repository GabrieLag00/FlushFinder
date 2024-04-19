import React from "react";
import { View, Text, Button} from 'react-native';
import Header from '../components/Header';

function HomeAlerts ({navigation}) {



    return (    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Header navigation={navigation} />
      <Button
        title="Ir a "
        onPress={() => navigation.navigate('HomeConserje')}
      />
    </View>
    ); 
};

export default HomeAlerts;
