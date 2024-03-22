import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io("http://192.168.1.71:8765");

const ApiScreen = () => {
    const [distance, setDistance] = useState('');
    const [status, setStatus] = useState('Esperando datos...');

    useEffect(() => {
        socket.on('distance', (distanceData) => {
            console.log("Distancia recibida:", distanceData);
            setDistance(`${distanceData} cm`);
        });

        socket.on('status', (statusData) => {
            console.log("Estado recibido:", statusData);
            setStatus(statusData);
        });

        return () => {
            socket.off('distance');
            socket.off('status');
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Distancia: {distance}</Text>
            <Text style={styles.text}>Estado: {status}</Text>
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


