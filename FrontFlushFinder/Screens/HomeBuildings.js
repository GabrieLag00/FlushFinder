// HomeBuildings.js
import React from "react";
import { View, Text, Button } from 'react-native';
import Header from '../components/Header';

export default function HomeBuildings({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Header navigation={navigation} />
            <Text>Aquí van los edificios, veamos a que hora lo haces huevon.</Text>
            <Button
                title="Ir a Alertas"
                onPress={() => navigation.navigate('HomeAlerts')}
            />
        </View>
    );
}
