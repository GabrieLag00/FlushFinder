import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getEdificios } from '../api';

const ApiScreen = () => {
    const [edificios, setEdificios] = useState([]);

    const loadEdificios = async () => {
        try {
            const data = await getEdificios();
            console.log(data); // Para depuración
            setEdificios(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        loadEdificios();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={edificios}
                keyExtractor={(item) => item.EdificioID.toString()} // Usa EdificioID como clave única
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{item.Nombre}</Text>
                        <Text style={styles.disponibilidad}>{item.Disponibilidad}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Fondo claro
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc', // Color del borde para separar ítems
    },
    text: {
        fontSize: 20, // Tamaño de texto para el nombre
        color: '#333333', // Color de texto
    },
    disponibilidad: {
        fontSize: 16, // Tamaño de texto para la disponibilidad
        color: '#666666', // Color de texto
        marginTop: 5, // Espacio entre el nombre y la disponibilidad
    },
});

export default ApiScreen;

