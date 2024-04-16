import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import io from 'socket.io-client';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stylesDashboard } from './DashboardScreen';

const socket = io("http://192.168.100.18:8765");

// Asegúrate de que las rutas a las imágenes son correctas
const jabonFilled = require('./images/jabon-filled.png');
const jabonEmpty = require('./images/jabon.png');
const papelFilled = require('./images/papel-higienico-filled.png');
const papelEmpty = require('./images/papel-higienico.png');

function DashboardSos({ navigation }) {
  const [sosReports, setSosReports] = useState([]);

  useEffect(() => {
    console.log("Estableciendo conexión con el socket y suscribiendo a eventos...");
    socket.on('reporte-sos-nuevo', (newReport) => {
      console.log("Nuevo SOS recibido:", newReport);
      setSosReports(prevReports => [...prevReports, newReport]);
    });
  
    return () => {
      console.log("Desconectando del socket y removiendo suscripciones...");
      socket.off('reporte-sos-nuevo');
    };
  }, []);

  return (
    <SafeAreaView style={stylesDashboard.containerSafeArea}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={stylesDashboard.bodyDash}>
        {sosReports.map((report, index) => (
          <View key={index} style={stylesSos.card}>
            <Text style={stylesSos.label}>Usuario: {report.UsuarioID}</Text>
            <Text style={stylesSos.label}>Problema: {report.Problema}</Text>
            <Text style={stylesSos.label}>Rating de Limpieza:</Text>
            <View style={stylesSos.imageContainer}>
              {[...Array(report.RatingLimpieza)].map((_, i) => (
                <Image key={i} source={jabonFilled} style={stylesSos.starImage} />
              ))}
              {[...Array(5 - report.RatingLimpieza)].map((_, i) => (
                <Image key={i} source={jabonEmpty} style={stylesSos.starImage} />
              ))}
            </View>
            <Text style={stylesSos.label}>Papel Faltante: {report.Papel ? 'Sí' : 'No'}</Text>
            <Image source={report.Papel ? papelFilled : papelEmpty} style={stylesSos.iconImage} />
            <Text style={stylesSos.label}>Jabón Faltante: {report.Jabon ? 'Sí' : 'No'}</Text>
            <Image source={report.Jabon ? jabonFilled : jabonEmpty} style={stylesSos.iconImage} />
            <Text style={stylesSos.label}>Comentarios: {report.Comentarios}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesSos = StyleSheet.create({
  card: {
    backgroundColor: '#F2F3FE',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
    marginVertical: 10,
  },
});

export default DashboardSos;
