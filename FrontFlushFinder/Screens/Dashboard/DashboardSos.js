import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Button, Alert } from 'react-native';
import { stylesLogin } from '../LoginScreen';
import { stylesUbication } from '../UbicationScreen';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stylesDashboard } from './DashboardScreen';

import AwesomeAlert from 'react-native-awesome-alerts';

function DashboardSos({ navigation }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const showAlert = () => {
    setAlertVisible(true);
  };
  const hideAlert = () => {
    setAlertVisible(false);
  };

  return (
    <SafeAreaView style={stylesDashboard.containerSafeArea}>




      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Mostrar Alerta" onPress={showAlert} />
        <AwesomeAlert
          show={alertVisible}
          showProgress={false}
          title="Alerta Personalizada"
          message="¡Hola! Este es un mensaje de alerta personalizado."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancelar"
          confirmText="Aceptar"
          confirmButtonColor="#DD6B55"
          onCancelPressed={hideAlert}
          onConfirmPressed={hideAlert}
          onDismiss={hideAlert}
        />
      </View>


      <Header navigation={navigation} />
      <View style={stylesDashboard.bodyDash}>



        <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
          <View style={stylesUbication.rowContainer}>

            <View style={stylesDashboardSos.card}>
              <Text style={stylesDashboardSos.label}>Nombre:</Text>
              <Text style={stylesDashboardSos.label}>Apellido:</Text>
              <Text style={stylesDashboardSos.label}>Correo:</Text>
              <Text style={stylesDashboardSos.label}>Edad:</Text>
            </View>

            <View style={stylesDashboardSos.card}>
              <Text style={stylesDashboardSos.label}>Nombre:</Text>
              <Text style={stylesDashboardSos.label}>Apellido:</Text>
              <Text style={stylesDashboardSos.label}>Correo:</Text>
              <Text style={stylesDashboardSos.label}>Edad:</Text>
            </View>

            <View style={stylesDashboardSos.card}>
              <Text style={stylesDashboardSos.label}>Nombre:</Text>
              <Text style={stylesDashboardSos.label}>Apellido:</Text>
              <Text style={stylesDashboardSos.label}>Correo:</Text>
              <Text style={stylesDashboardSos.label}>Edad:</Text>
            </View>

            <View style={stylesDashboardSos.card}>
              <Text style={stylesDashboardSos.label}>Nombre:</Text>
              <Text style={stylesDashboardSos.label}>Apellido:</Text>
              <Text style={stylesDashboardSos.label}>Correo:</Text>
              <Text style={stylesDashboardSos.label}>Edad:</Text>
            </View>

            <View style={stylesDashboardSos.card}>
              <Text style={stylesDashboardSos.label}>Nombre:</Text>
              <Text style={stylesDashboardSos.label}>Apellido:</Text>
              <Text style={stylesDashboardSos.label}>Correo:</Text>
              <Text style={stylesDashboardSos.label}>Edad:</Text>
            </View>

            <View style={stylesDashboardSos.card}>
              <Text style={stylesDashboardSos.label}>Nombre:</Text>
              <Text style={stylesDashboardSos.label}>Apellido:</Text>
              <Text style={stylesDashboardSos.label}>Correo:</Text>
              <Text style={stylesDashboardSos.label}>Edad:</Text>
            </View>

          </View>
        </ScrollView>

      </View>
      <NavBar navigation={navigation} style={stylesDashboard.containerNavBar} />
    </SafeAreaView>


  );
}

const windowWidth = Dimensions.get('window').width;

export const stylesDashboardSos = StyleSheet.create({
  card: {
    backgroundColor: '#F2F3FE',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: windowWidth * 0.05,
    marginVertical: 10,
    elevation: 3,
    maxWidth: windowWidth * 0.9,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DashboardSos;