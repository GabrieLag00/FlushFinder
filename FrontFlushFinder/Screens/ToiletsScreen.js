import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal, Dimensions } from 'react-native';
import { stylesLogin } from './LoginScreen';
import { stylesUbication } from './UbicationScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { getBanosDelEdificio } from '../api';
import { Icon } from 'react-native-elements';
import io from 'socket.io-client';

const socket = io("http://192.168.1.70:8765");

const { width, height } = Dimensions.get('window');
const isLargeScreen = width > 600;

function Banos({ navigation, route }) {
    const menuOptions = [
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={stylesToilets.buttonBathText}>Disponible</Text>
            <View style={stylesLogin.viewSpace} />
            <Icon
                name='check-circle'
                color='#FEFEFE'
            />
        </View>,
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={stylesToilets.buttonBathText}>Ocupado</Text>
            <View style={stylesLogin.viewSpace} />
            <Icon
                name='cancel'
                color='#FEFEFE'
            />
        </View>,
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={stylesToilets.buttonBathText}>Mantenimiento</Text>
        <View style={stylesLogin.viewSpace} />
        <Icon
            name='build'
            color='#FEFEFE'
        />
    </View>,
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={stylesToilets.buttonBathText}>Jabón</Text>
        <View style={stylesLogin.viewSpace} />
        <Icon
            name='soap'
            color='#FEFEFE'
        />
    </View>,
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={stylesToilets.buttonBathText}>Papel</Text>
        <View style={stylesLogin.viewSpace} />
        <Icon
            name='note'
            color='#FEFEFE'
        />
    </View>,
    ];

    const { edificioId } = route.params;
    const [banos, setBanos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [userGender, setUserGender] = useState(null);
    const [banoStatus, setBanoStatus] = useState('Esperando datos...');
    const [papelPercent, setPapelPercent] = useState('Esperando datos...');
    const [jabonPercent, setJabonPercent] = useState('Esperando datos...');
    const [banoH, setBanoH] = useState('Esperando datos...');
    const [banoM, setBanoM] = useState('Esperando datos...');
    const [selectedBano, setSelectedBano] = useState(null); // Cambiado para manejar el baño seleccionado
    const [selectedIndex, setSelectedIndex] = useState(0); // Index del baño seleccionado

    const nextBano = () => {
        // Solo avanzar si no es el último baño
        if (selectedIndex < banos.length - 1) {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(nextIndex);
            setSelectedBano(banos[nextIndex]);
        }
    };

    const prevBano = () => {
        // Solo retroceder si no es el primer baño
        if (selectedIndex > 0) {
            const prevIndex = selectedIndex - 1;
            setSelectedIndex(prevIndex);
            setSelectedBano(banos[prevIndex]);
        }
    };

    useEffect(() => {
        socket.on('Exit/30', data => {
          setPapelPercent(data);
        });
        socket.on('Exit/40', data => {
          setJabonPercent(data);
        });
        socket.on('Exit/10', setBanoH);
        socket.on('Exit/20', setBanoM);
    
        return () => {
          socket.off('Exit/30');
          socket.off('Exit/40');
        };
      }, []);

    useEffect(() => {
        if (banos.length > 0 && selectedIndex >= 0 && selectedIndex < banos.length) {
            setSelectedBano(banos[selectedIndex]);
        }
    }, [selectedIndex, banos]);



    useEffect(() => {
        const fetchUserGender = async () => {
            const userDataJson = await AsyncStorage.getItem('userData');
            if (userDataJson) {
                const userData = JSON.parse(userDataJson);
                setUserGender(userData.usuario.genero);
                setupSocketListeners(userData.usuario.genero);
            }
        };

        fetchUserGender();
        return () => {
            socket.off('Exit/10');
            socket.off('Exit/20');
        };
      }, []);

      const setupSocketListeners = (gender) => {
        const topic = gender === 'Hombre' ? 'Exit/10' : 'Exit/20';
        socket.on(topic, (data) => {
            setBanoStatus(data);
        });
    };

    const getStatusStyle = (status) => ({
        color: status === 'Ocupado' ? '#FF0000' : '#00FF00',
        fontWeight: 'bold',
        fontSize: 18,
    });


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

    {/* const options = [
        { id: 1, label: [<MaterialCommunityIcons name="check-circle" size={20} />, <View style={stylesLogin.viewSpace} />, 'Disponibles'] },
        { id: 2, label: [<MaterialCommunityIcons name="alert-circle" size={20} />, <View style={stylesLogin.viewSpace} />, 'Ocupados'] },
        { id: 3, label: [<MaterialCommunityIcons name="clock" size={20} />, <View style={stylesLogin.viewSpace} />, 'En mantenimiento'] },
        { id: 4, label: [<MaterialCommunityIcons name="chart-bubble" size={20} />, <View style={stylesLogin.viewSpace} />, 'Con jabón'] },
        { id: 5, label: [<MaterialCommunityIcons name="paper-roll" size={20} />, <View style={stylesLogin.viewSpace} />, 'Con papel'] },
    ]; */}

    return (
        <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>
            <Header navigation={navigation} />

            {/* <FlatList
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
            /> */}

            <ScrollView contentContainerStyle={stylesToilets.menuOptions}>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {menuOptions.map((option, index) => (
                            <TouchableOpacity key={index} style={stylesToilets.menuItem}>
                                <Text style={stylesToilets.menuText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

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
                    onRequestClose={() => {
                        setModalVisible(false);
                        setSelectedIndex(0); // Resetear el índice cuando se cierre el modal
                    }}

                >
                    <View style={stylesToilets.modalContainer}>

                        <View style={stylesToilets.modalOuterContainer}>
                            <TouchableOpacity style={[stylesToilets.prevNextButton, stylesToilets.navButtonLeft]} onPress={prevBano}>
                                <Icon
                                    name='chevron-left'
                                    color='#FEFEFE'
                                    size={70}
                                />
                            </TouchableOpacity>

                            <View style={stylesToilets.modalContent}>
                                <Image source={require('../images/toilet.png')} style={stylesToilets.imageModal} />
                                <Text style={stylesToilets.bathTitle}>{selectedBano.Nombre}</Text>
                                <Text style={getStatusStyle(banoStatus)}>
                                 {banoStatus}
                                 </Text>

                                <View style={stylesToilets.bathContainer}>
                                    <Image source={require('../images/papel-higienico.png')} style={stylesToilets.bathImage} />
                                    <Text style={stylesToilets.bathStatusText}>{jabonPercent}%</Text>
                                </View>
                                <View style={stylesToilets.bathContainer}>
                                    <Image source={require('../images/jabon.png')} style={stylesToilets.bathImage} />
                                    <Text style={stylesToilets.bathStatusText}>{papelPercent}%</Text>
                                </View>

                                <View style={{ width: '100%', alignItems: 'center' }}>
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

                            <TouchableOpacity style={[stylesToilets.prevNextButton, stylesToilets.navButtonRight]} onPress={nextBano}>
                                <Icon
                                    name='chevron-right'
                                    color='#FEFEFE'
                                    size={70}
                                />
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
    container: {
        flex: 1,
        padding: 20,
    },
    status: {
        fontSize: 18,
        fontWeight: 'bold',
    },
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
        flexDirection: 'row', // Alinea los botones a los lados
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Se cambió para mejorar la visibilidad del modal

        paddingHorizontal: 20, // Espacio para no sobreponer los botones
    },
    modalContent: {
        width: isLargeScreen ? '50%' : '85%',  // Ajuste el ancho a 85% en pantallas pequeñas para más espacio
        height: '50%',  // Altura máxima ajustada
        backgroundColor: '#F2F3FE',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        zIndex: -1,
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
        textAlign:'center',
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

    menuOptions: {
        paddingHorizontal: 20,
    },
    menuItem: {
        marginRight: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#007BFF', // Color de fondo de cada opción del menú
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuText: {
        color: '#ffffff', // Color del texto
        fontWeight: 'bold',
        fontSize: 16, // Tamaño del texto
    },

    modalOuterContainer: {
        flex: 1,
        flexDirection: 'row', // Alinea horizontalmente los elementos
        alignItems: 'center', // Centra verticalmente los botones en el modal
        justifyContent: 'center',
        position: 'relative',
    },
    prevNextButton: {
        borderRadius: 100,
        backgroundColor: '#8594CB',
    },
    navButtonLeft: {
        position: 'absolute',
        left: -10,
    },

    navButtonRight: {
        position: 'absolute',
        right: -10,
    },
});