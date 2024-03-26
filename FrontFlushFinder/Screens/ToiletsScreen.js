import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import { stylesLogin } from './LoginScreen';
import { stylesUbication } from './UbicationScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { getBanosDelEdificio } from '../api';

function Banos({ navigation, route }) {
    const { edificioId } = route.params;
    const [banos, setBanos] = useState([]);
    const [selectedBano, setSelectedBano] = useState(null); // Cambiado para manejar el baño seleccionado
    const [modalVisible, setModalVisible] = useState(false);
    const [userGender, setUserGender] = useState(null);

    useEffect(() => {
        // Recuperar el género del usuario de AsyncStorage
        const fetchUserGender = async () => {
            const userDataJson = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(userDataJson);
            setUserGender(userData.usuario.genero); // Asegúrate de que el género esté almacenado correctamente
        };

        fetchUserGender();
    }, []);


    useEffect(() => {
        const cargarBanos = async () => {
            try {
                const data = await getBanosDelEdificio(edificioId);
                // Filtrar los baños basados en el género del usuario
                const filteredBanos = data.filter(bano => bano.Genero === userGender);
                setBanos(filteredBanos);
            } catch (error) {
                console.error("Error al cargar los baños:", error);
            }
        };

        if (userGender) {
            cargarBanos();
        }
    }, [edificioId, userGender]);
    


    const options = [
        { id: 1, label: [<MaterialCommunityIcons name="check-circle" size={20} />, <View style={stylesLogin.viewSpace} />, 'Disponibles'] },
        { id: 2, label: [<MaterialCommunityIcons name="alert-circle" size={20} />, <View style={stylesLogin.viewSpace} />, 'Ocupados'] },
        { id: 3, label: [<MaterialCommunityIcons name="clock" size={20} />, <View style={stylesLogin.viewSpace} />, 'En mantenimiento'] },
        { id: 4, label: [<MaterialCommunityIcons name="chart-bubble" size={20} />, <View style={stylesLogin.viewSpace} />, 'Con jabón'] },
        { id: 5, label: [<MaterialCommunityIcons name="paper-roll" size={20} />, <View style={stylesLogin.viewSpace} />, 'Con papel'] },
    ];

  
 

    return (
        <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
        <Header navigation={navigation} />

        <FlatList
                data={options}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={stylesToilets.option}>
                        <TouchableOpacity>
                            <Text style={stylesToilets.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />

        {/* Aquí iría tu FlatList de opciones si aún necesitas incluirla */}

        <View style={stylesUbication.rowContainer}>
            {banos.map((bano) => (
                <View key={bano.BanoID} style={stylesUbication.itemContainer}>
                    <TouchableOpacity onPress={() => {
                        setSelectedBano(bano);
                        setModalVisible(true);
                    }}>
                        <Image source={require('../images/toilet.png')} style={stylesToilets.image} />
                        <Text style={[stylesUbication.textUbication, stylesToilets.textContainer]}>
                            {bano.Nombre}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>

        {selectedBano && (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={stylesToilets.modalContainer}>
                    <View style={stylesToilets.modalContent}>
                        <Image source={require('../images/toilet.png')} style={stylesToilets.imageModal} />
                        <Text style={stylesToilets.bathTitle}>{selectedBano.Nombre}</Text>
                        <Text style={stylesToilets.bathStatus}>{selectedBano.Estado}</Text>
                        {/* Aquí se asume que estas imágenes y textos son simbólicos */}
                        <View style={stylesToilets.bathContainer}>
                            <Image source={require('../images/papel-higienico.png')} style={stylesToilets.bathImage} />
                            <Text style={stylesToilets.bathStatusText}>98%</Text>
                        </View>
                        <View style={stylesToilets.bathContainer}>
                            <Image source={require('../images/jabon.png')} style={stylesToilets.bathImage} />
                            <Text style={stylesToilets.bathStatusText}>62%</Text>
                        </View>
                        <TouchableOpacity style={stylesToilets.buttonBath} onPress={() => navigation.navigate('Sos')}>
                            <Text style={stylesToilets.buttonBathText}>Reportar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={stylesToilets.closeButton}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )}
    </ScrollView>
    );
}

export default Banos;

export const stylesToilets = StyleSheet.create({
    textContainer: {
        fontSize: 45,
        paddingVertical: 30,
        width: 'auto',
    },
    image: {
        height: 180,
        width: 180,
    },
    imageModal: {
        marginTop: '10%',
    },
    option: {
        paddingHorizontal: 12,
        marginVertical: 30,
    },
    optionText: {
        fontSize: 20,
        color: '#FEFEFE',
        backgroundColor: '#34C7FD',
        padding: 30,
        borderRadius: 4,
        width: 220,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(148, 148, 148, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#F2F3FE',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF2626',
        marginTop: '10%',
    },
    bathContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bathImage: {
        height: 40,
        width: 40,
    },
    bathTitle: {
        fontWeight: 'bold',
        fontSize: 60,
        color: '#8594CB',
        textAlign: 'center',
        marginBottom: '10%'
    },
    bathStatus: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#71D6B1',
        marginTop: '',
    },
    bathStatusText: {
        fontSize: 20,
        color: '#8594CB',
    },
    buttonBath: {
        paddingVertical: 10,
        backgroundColor: '#34C7FD',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        marginVertical: '10%'
    },
    buttonBathText: {
        color: '#FEFEFE',
        fontWeight: 'bold',
        fontSize: 45,
    },
});