import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io("http://192.168.1.71:8765");

const ApiScreen = () => {
    const [datosArduino, setDatosArduino] = useState('Esperando datos...');

    useEffect(() => {
        socket.on('data', (data) => {
            console.log("Datos recibidos:", data);
            setDatosArduino(`Distancia: ${data} cm`);
        });
    
        return () => {
            socket.off('data');
        };
    }, []);
    
    
      

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Datos recibidos del servidor:</Text>
            <Text>{datosArduino}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ApiScreen;
