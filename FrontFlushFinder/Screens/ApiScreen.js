import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const socket = io("http://192.168.1.71:8765");

const ApiScreen = () => {
    const [bathroomData, setBathroomData] = useState({ distance: '', status: 'Esperando datos...' });

    useEffect(() => {
        socket.on('bathroomStatus', (data) => {
            console.log("Datos recibidos:", data);
            setBathroomData(data);
        });

        return () => {
            socket.off('bathroomStatus');
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Distancia: {bathroomData.distance} cm</Text>
            <Text style={styles.text}>Estado: {bathroomData.status}</Text>
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

