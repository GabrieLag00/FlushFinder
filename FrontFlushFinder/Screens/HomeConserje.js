import React from "react";
import { View, Text, Button, StyleSheet} from 'react-native';
import Header from '../components/Header';

function HomeConserje ({navigation}) {



    return (    
      <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.text}>Aquí van tus vistas pinche huevon </Text>
      <Button
        title="Ir a edificios"
        onPress={() => navigation.navigate('HomeBuildings')}
      />
    </View>
    ); 
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 20,
    fontSize: 18,
  },
});


export default HomeConserje;


