import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal, Dimensions } from 'react-native';
import { stylesLogin } from './LoginScreen';
import { stylesUbication } from './UbicationScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { getBanosDelEdificio } from '../api';

import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width > 600;

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
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} onPress={() => {
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

                            <TouchableOpacity
                                style={stylesToilets.buttonBath}
                                onPress={() => {
                                    navigation.navigate('Sos', { banoId: selectedBano.BanoID }); // Navegar a SosScreen con BanoID
                                    setModalVisible(false);
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={stylesToilets.buttonBathText}>Reportar</Text>
                                    <View style={stylesLogin.viewSpace} />
                                    <Icon
                                        name='report'
                                        color='#FEFEFE'
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[stylesToilets.buttonBath, { backgroundColor: '#FF0303' }]} onPress={() => setModalVisible(false)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={stylesToilets.closeButton}>Cerrar</Text>
                                    <View style={stylesLogin.viewSpace} />
                                    <Icon
                                        name='close'
                                        color='#FEFEFE'
                                    />
                                </View>
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
        fontSize: isLargeScreen ? 30 : 20,  // Ajustar el tamaño del texto para grandes pantallas
        paddingVertical: isLargeScreen ? 15 : 10,
        width: 'auto',
    },
    image: {
        height: isLargeScreen ? 140 : 90,   // Ajustar el tamaño de las imágenes para diferentes pantallas
        width: isLargeScreen ? 140 : 90,
    },
    imageModal: {
        width: isLargeScreen ? '40%' : '60%',  // Ajuste porcentual basado en el tamaño de la pantalla
        height: isLargeScreen ? '40%' : '60%', // Mantener la proporción de la imagen
        resizeMode: 'contain' // Asegura que la imagen se ajuste dentro de los límites sin deformarse
    },
    option: {
        paddingHorizontal: 12,
        marginVertical: isLargeScreen ? 15 : 10,
    },
    optionText: {
        fontSize: isLargeScreen ? 18 : 14,  // Cambio en tamaño de fuente
        color: '#FEFEFE',
        backgroundColor: '#34C7FD',
        padding: isLargeScreen ? 20 : 15,
        borderRadius: 4,
        width: isLargeScreen ? 200 : 150,  // Ajustar el ancho para diferentes dispositivos
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Se cambió para mejorar la visibilidad del modal
    },
    modalContent: {
        width: isLargeScreen ? '50%' : '85%',  // Ajuste el ancho a 85% en pantallas pequeñas para más espacio
        height: '100%',  // Altura máxima ajustada
        backgroundColor: '#F2F3FE',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        fontSize: isLargeScreen ? 18 : 16,
        fontWeight: 'bold',
        color: '#FEFEFE',
    },
    bathContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bathImage: {
        height: 30,
        width: 30,
    },
    bathTitle: {
        fontWeight: 'bold',
        fontSize: isLargeScreen ? 40 : 25,  // Ajustar el tamaño del título en el modal
        color: '#8594CB',
        textAlign: 'center',
        marginBottom: '10%'
    },
    bathStatus: {
        fontSize: isLargeScreen ? 35 : 22,  // Ajustar el tamaño de fuente para el estado
        fontWeight: 'bold',
        color: '#71D6B1',
    },
    bathStatusText: {
        fontSize: 18,
        color: '#8594CB',
    },
    buttonBath: {
        paddingVertical: 10,
        backgroundColor: '#F6C910',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',  // Hacer que el ancho del botón sea relativo al contenedor del modal
        marginTop: 20,
    },
    buttonBathText: {
        color: '#FEFEFE',
        fontWeight: 'bold',
        fontSize: isLargeScreen ? 20 : 16,  // Ajustar el tamaño de la fuente del botón
    },
});