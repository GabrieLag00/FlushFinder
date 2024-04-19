import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { stylesLogin } from '../LoginScreen';
import { stylesUbication } from '../UbicationScreen';
import Header from '../../components/Header';
import NavBar, { stylesNavBar } from '../../components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import { stylesToilets } from '../ToiletsScreen';

const SOCKET_SERVER_URL = 'https://railway-production-2a8c.up.railway.app';

function DashboardScreen({ navigation }) {
  const [distanceData, setDistanceData] = useState([]);
  const [bano1, setBano1] = useState('Esperando datos...');
  const [bano2, setBano2] = useState('Esperando datos...');
  const [papel, setPapel] = useState('Esperando datos...');
  const [jabon, setJabon] = useState('Esperando datos...');

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => console.log('Conectado al servidor Socket.IO'));
    socket.on('disconnect', () => console.log('Desconectado del servidor Socket.IO'));

    socket.on('data', (data) => {
      console.log('Datos recibidos:', data);
      setDistanceData(currentData => [data.toString(), ...currentData]);
    });

    socket.on('Exit/10', data => {
      setBano1(data);
    });
    socket.on('Exit/20', data => {
      setBano2(data);
    });
    socket.on('Exit/30', data => {
      setPapel(data);
    });
    socket.on('Exit/40', data => {
      setJabon(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
        <Header navigation={navigation} />


        <View style={stylesUbication.rowContainer}>
          <Text style={stylesLogin.title}>Disponiblidad y Administracion</Text>
          <View style={stylesDashboard.cardContainer}>

            <View style={stylesDashboard.sensorContainer}>
              <Text style={[stylesToilets.bathTitle, {textAlign:'left', marginBottom:10, color:'#3451C6'}]}>Datos Baño1</Text>
              <Text style={[stylesToilets.bathStatusText]}>Baño 1: {bano1}</Text>
              <Text style={[stylesToilets.bathTitle, {textAlign:'left', marginBottom:10, color:'#3451C6'}]}>Datos Baño2</Text>
              <Text style={[stylesToilets.bathStatusText]}>Baño 2: {bano2}</Text>
              <Text style={[stylesToilets.bathTitle, {textAlign:'left', marginBottom:10, color:'#3451C6'}]}>Datos del Jabón</Text>
              <Text style={[stylesToilets.bathStatusText]}>Jabón: {papel}%</Text>
              <Text style={[stylesToilets.bathTitle, {textAlign:'left', marginBottom:10, color:'#3451C6'}]}>Datos del Papel</Text>
              <Text style={[stylesToilets.bathStatusText]}>Papel higiénico: {jabon}%</Text>
            </View>
            {/*<TouchableOpacity style={stylesDashboard.button}>
                <Text style={stylesDashboard.buttonText}>Learn More</Text>
                </TouchableOpacity>*/}
          </View>

          <Text
            data={distanceData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={stylesDashboard.row}>
                <Text style={stylesDashboard.distance}>{item} cm</Text>
              </View>

            )}
          />
        </View>

      </ScrollView>
      <NavBar navigation={navigation} />
    </>
  );
};

export const stylesDashboard = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3451C6',
    justifyContent: 'center',
    alignItems: 'center',

  },
  bodyDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sensorContainer: {
    backgroundColor: 'red'
  },
  sensorText: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: '45%',
    textAlign: 'center',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  distance: {
    fontSize: 16,
    fontWeight: 'bold',
  },



  cardContainer: {
    backgroundColor: '#F2F3FE',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  sensorContainer: {
    marginBottom: 20, // Espacio antes del botón
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sensorText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default DashboardScreen;
