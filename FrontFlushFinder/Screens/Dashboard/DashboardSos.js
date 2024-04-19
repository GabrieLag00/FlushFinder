import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, Alert } from 'react-native';
import io from 'socket.io-client';
import Header from '../../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { stylesDashboard } from './DashboardScreen';
import NavBar from '../../components/NavBar';
import {getSOS, borrarSOS, borrarTodosSOS} from '../../api';

const socket = io("https://railway-production-2a8c.up.railway.app");

const jabonFilled = require('./images/jabon-filled.png');
const jabonEmpty = require('./images/jabon.png');
const papelFilled = require('./images/papel-higienico-filled.png');
const papelEmpty = require('./images/papel-higienico.png');

function DashboardSos({ navigation }) {
  const [sosReports, setSosReports] = useState([]);
  const [allReportsHandled, setAllReportsHandled] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    fetchInitialSOS();
    setupSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.off('reporte-sos-nuevo');
      }
    };
  }, []);

  useEffect(() => {
    setAllReportsHandled(sosReports.length === 0);
  }, [sosReports]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (allReportsHandled) {
        return;
      }

      e.preventDefault(); // Previene temporalmente al usuario de dejar la pantalla

      Alert.alert(
        'Reportes sin atender',
        'No puedes salir sin haber atendido todos los reportes. ¿Deseas marcar todos como atendidos?',
        [
          { text: "Cancelar", style: 'cancel', onPress: () => {} },
          {
            text: 'Marcar Todos como Atendidos',
            style: 'destructive',
            onPress: () => {
              handleDeleteAllSos(); // Función que marca todos los SOS como atendidos
            }
          }
        ]
      );
    });

    return unsubscribe;
  }, [navigation, allReportsHandled]);

  const fetchInitialSOS = async () => {
    try {
      const data = await getSOS();
      setSosReports(data);
    } catch (error) {
      console.error("Error al cargar los SOS iniciales:", error);
    }
  };

  const setupSocket = () => {
    if (!socketRef.current) {
      socketRef.current = io("https://railway-production-2a8c.up.railway.app");
    }
    socketRef.current.on('reporte-sos-nuevo', (newReport) => {
      console.log("Nuevo SOS recibido:", newReport);
      setSosReports(prevReports => {
        const existingReport = prevReports.find(report => report.SosReportID === newReport.SosReportID);
        if (!existingReport) {
          return [...prevReports, newReport];
        } else {
          return prevReports.map(report => 
            report.SosReportID === newReport.SosReportID ? newReport : report
          );
        }
      });
    });
  };

  const handleDeleteSos = async (sosReportID) => {
    try {
      await borrarSOS(sosReportID);
      setSosReports(sosReports.filter(report => report.SosReportID !== sosReportID));
      Alert.alert("Reporte Atendido", "El reporte ha sido marcado como atendido.");
    } catch (error) {
      console.error("Error al borrar el reporte SOS:", error);
    }
  };

  const handleDeleteAllSos = async () => {
    try {
      await borrarTodosSOS();
      setSosReports([]);
      Alert.alert("Todos Atendidos", "Todos los reportes han sido marcados como atendidos.");
    } catch (error) {
      console.error("Error al borrar todos los reportes SOS:", error);
    }
  };

  return (
    <SafeAreaView style={stylesDashboard.containerSafeArea}>
      <Header navigation={navigation} />
      <Button title="Marcar Todos como Atendidos" onPress={handleDeleteAllSos} color="red" />
      <ScrollView contentContainerStyle={stylesDashboard.bodyDash}>
        {sosReports.map((report, index) => (
          <View key={index} style={stylesSos.card}>
            <Text style={stylesSos.label}>Usuario: {report.UsuarioID}</Text>
            <Text style={stylesSos.label}>Nombre: {report.Nombre}</Text>
            <Text style={stylesSos.label}>Email: {report.Email}</Text>
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
            <Button title="Atendido" onPress={() => handleDeleteSos(report.SosReportID)} />
          </View>
        ))}
      </ScrollView>
      <NavBar navigation={navigation} />
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
