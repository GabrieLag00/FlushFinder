import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import { stylesLogin } from './LoginScreen';
import { stylesUbication } from './UbicationScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Banos({ navigation }) {
    const images = [
        require('../images/toilet.png'),
        require('../images/toilet.png'),
        require('../images/toilet.png'),
        require('../images/toilet.png'),
    ];

    const buildingNames = ['Sanitario 1', 'Sanitario 2', 'Sanitario 3', 'Sanitario 4', 'Sanitario 5', 'Sanitario 6', 'Sanitario 7', 'Sanitario 8', 'Sanitario 9', 'Sanitario 10'];

    const options = [
        { id: 1, label: [<MaterialCommunityIcons name="check-circle" size={20} />, <View style={stylesLogin.viewSpace} />, 'Disponibles'] },
        { id: 2, label: [<MaterialCommunityIcons name="alert-circle" size={20} />, <View style={stylesLogin.viewSpace} />, 'Ocupados'] },
        { id: 3, label: [<MaterialCommunityIcons name="clock" size={20} />, <View style={stylesLogin.viewSpace} />, 'En mantenimiento'] },
        { id: 4, label: [<MaterialCommunityIcons name="chart-bubble" size={20} />, <View style={stylesLogin.viewSpace} />, 'Con jabón'] },
        { id: 5, label: [<MaterialCommunityIcons name="paper-roll" size={20} />, <View style={stylesLogin.viewSpace} />, 'Con papel'] },
    ];

    const [selectedSanitarioIndex, setSelectedSanitarioIndex] = useState(null); // Estado para controlar el sanitario seleccionado
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    const handleSanitarioPress = (index) => {
        setSelectedSanitarioIndex(index);
        setModalVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={stylesUbication.containerScrollView}>

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

            {/*<Text style={stylesLogin.title}>Baños de {'{Ubication}'}</Text>*/}


            <View style={stylesUbication.rowContainer}>
                {images.map((image, index) => (
                    <View key={index} style={stylesUbication.itemContainer}>
                        <TouchableOpacity onPress={() => handleSanitarioPress(index)}>
                            <Image source={image} style={stylesToilets.image} />
                            <Text style={[stylesUbication.textUbication, stylesToilets.textContainer]}>{buildingNames[index]}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={stylesToilets.modalContainer}>
                        <View style={stylesToilets.modalContent}>
                            <Image source={images[selectedSanitarioIndex]} style={[stylesToilets.image, stylesToilets.imageModal]} />
                            <Text style={stylesToilets.bathTitle}>{buildingNames[selectedSanitarioIndex]}</Text>
                            <Text style={stylesToilets.bathStatus}>Disponible</Text>
                            <View style={stylesToilets.bathContainer}>
                                <Image source={require('../images/papel-higienico.png')} style={stylesToilets.bathImage} />
                                <Text style={stylesToilets.bathStatusText}>98%</Text>
                            </View>
                            <View style={stylesToilets.bathContainer}>
                                <Image source={require('../images/jabon.png')} style={stylesToilets.bathImage} />
                                <Text style={stylesToilets.bathStatusText}>62%</Text>
                            </View>
                            <TouchableOpacity style={stylesToilets.buttonBath}>
                                <Text style={stylesToilets.buttonBathText}>SOS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={stylesToilets.closeButton}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

        </ScrollView>
    );
}

export default Banos;

const stylesToilets = StyleSheet.create({
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