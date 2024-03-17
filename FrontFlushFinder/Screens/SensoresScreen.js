// SensoresScreen
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import io from 'socket.io-client';
import { LineChart } from 'react-native-chart-kit';

const socket = io('http://localhost:8655');

const SensoresScreen = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    socket.on('connect', () => console.log('Conectado al servidor Socket.IO'));

    socket.on('data', (data) => {
      setDataPoints(currentDataPoints => [...currentDataPoints, data]);
      setLabels(currentLabels => [...currentLabels, new Date().toLocaleTimeString()]);
      
      // Mantener solo los últimos 20 puntos y etiquetas para el gráfico
      if (dataPoints.length > 20) {
        setDataPoints(currentDataPoints => currentDataPoints.slice(1));
        setLabels(currentLabels => currentLabels.slice(1));
        console.log(data);
      }
      console.log("estos son los datos", data);
    });

    return () => {
      socket.off('connect');
      socket.off('data');
    };
  }, [dataPoints]);

  return (
    <View>
      <Text>Distancia en Tiempo Real</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: dataPoints
            }
          ]
        }}
        width={Dimensions.get("window").width - 16} // Ancho de la pantalla menos los márgenes
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // Número de decimales en los puntos de datos, ajusta según necesidad
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier // Suaviza la línea del gráfico
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

export default SensoresScreen;


