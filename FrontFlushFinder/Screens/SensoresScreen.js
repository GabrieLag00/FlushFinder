import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import io from 'socket.io-client';
import { date } from 'zod';

const SOCKET_SERVER_URL = 'http://192.168.100.18:8765'; // Asegúrate de que esta dirección sea accesible desde tu dispositivo

const DistanceTableScreen = () => {
  const [distanceData, setDistanceData] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => console.log('Conectado al servidor Socket.IO'));
    socket.on('disconnect', () => console.log('Desconectado del servidor Socket.IO'));

    // Actualiza el estado para incluir los nuevos datos recibidos
    socket.on('data', (data) => {
      console.log('Datos recibidos:', data);
      // Añade los nuevos datos al inicio del arreglo para mostrar los más recientes arriba
      setDistanceData(currentData => [data.toString(), ...currentData]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabla de Distancia</Text>
      <FlatList
        data={distanceData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.distance}>{item} cm</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default DistanceTableScreen;

