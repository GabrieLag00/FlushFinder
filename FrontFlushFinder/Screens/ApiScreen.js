import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

// Conexión al servidor WebSocket. Asegúrate de usar la dirección correcta.
const socket = io("http://localhost:8765");

const DatosSensoresScreen = () => {
  const [bano1, setBano1] = useState('Esperando datos...');
  const [bano2, setBano2] = useState('Esperando datos...');
  const [papel, setPapel] = useState('Esperando datos...');
  const [jabon, setJabon] = useState('Esperando datos...');

  useEffect(() => {
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
        socket.off('Exit/10');
        socket.off('Exit/20');
        socket.off('Exit/30');
        socket.off('Exit/40');
      };
  }, []);

  return (
      <View style={styles.container}>
          <Text style={styles.text}>Baño 1: {bano1}</Text>
          <Text style={styles.text}>Baño 2: {bano2}</Text>
          <Text style={styles.text}>Papel Higiénico: {papel}</Text>
          <Text style={styles.text}>Jabón: {jabon}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  text: {
      fontSize: 18,
      marginBottom: 10,
  },
});

export default DatosSensoresScreen;

