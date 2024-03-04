import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getEdificios, getConserjes } from '../api'; // Importa ambas funciones

const ApiScreen = () => {
    const [edificios, setEdificios] = useState([]);
    const [conserjes, setConserjes] = useState([]); // Corrige aquí

    const loadEdificios = async () => {
        try {
            const data = await getEdificios();
            console.log(data); // Para depuración
            setEdificios(data);
        } catch (error) {
            console.error("Error fetching edificios data: ", error);
        }
    };

    const loadConserjes = async () => {
        try {
            const data = await getConserjes();
            console.log(data); // Para depuración
            setConserjes(data);
        } catch (error) {
            console.error("Error fetching conserjes data: ", error);
        }
    };

    useEffect(() => {
        loadEdificios();
        loadConserjes();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Edificios</Text>
            <FlatList
                data={edificios}
                keyExtractor={(item) => item.EdificioID.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{item.Nombre}</Text>
                        <Text style={styles.disponibilidad}>{item.Disponibilidad}</Text>
                    </View>
                )}
            />
            <Text style={styles.sectionTitle}>Conserjes</Text>
            <FlatList
                data={conserjes}
                keyExtractor={(item) => item.ConserjeID.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.text}>{item.Nombre}</Text>
                        <Text style={styles.matricula}>Matrícula: {item.Matricula}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    text: {
        fontSize: 20,
        color: '#333333',
    },
    disponibilidad: {
        fontSize: 16,
        color: '#666666',
        marginTop: 5,
    },
    matricula: {
        fontSize: 16,
        color: '#666666',
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default ApiScreen;


