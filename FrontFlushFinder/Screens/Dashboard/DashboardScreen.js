import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { stylesLogin } from '../LoginScreen';
import { stylesUbication } from '../UbicationScreen';
import Header from '../../components/Header';
import NavBar, { stylesNavBar } from '../../components/NavBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8765';

const DashboardScreen = ({ navigation }) => {
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
    <SafeAreaView style={stylesDashboard.containerSafeArea}>
      <Header navigation={navigation} />
      <View style={stylesDashboard.bodyDash}>
        <Text>pendejo aldair cachetes de marrana </Text>
        <View style={stylesDashboard.sensorContainer}>
          <Text style={stylesDashboard.sensorText}>Baño 1: {bano1}</Text>
          <Text style={stylesDashboard.sensorText}>Baño 2: {bano2}</Text>
          <Text style={stylesDashboard.sensorText}>Papel Higiénico: {papel}</Text>
          <Text style={stylesDashboard.sensorText}>Jabón: {jabon}</Text>
        </View>
        <Text style={stylesDashboard.title}>Tabla de Distancia</Text>
        <FlatList
          data={distanceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={stylesDashboard.row}>
              <Text style={stylesDashboard.distance}>{item} cm</Text>
            </View>
          )}
        />
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export const stylesDashboard = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: '#3451C6',
  },
  bodyDash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sensorContainer: {
    marginBottom: 20,
  },
  sensorText: {
    fontSize: 18,
    marginBottom: 10,
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
});

export default DashboardScreen;
