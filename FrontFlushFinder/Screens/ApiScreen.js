import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io("http://192.168.100.18:5000");

const ApiScreen = () => {
    const [datosArduino, setDatosArduino] = useState('Esperando datos...');

    useEffect(() => {
        socket.on('datosArduino', (data) => {
            console.log("Datos de Arduino recibidos:", data);
            setDatosArduino(JSON.stringify(data));
        });

        // Limpiar la suscripción al evento al desmontar el componente
        return () => {
            socket.off('datosArduino');
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
