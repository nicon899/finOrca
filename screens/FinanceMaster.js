import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { finContext } from '../contexts/FinContext';
import { FinanceStackNavigator } from '../navigation/AppNavigation';
import { useFonts } from 'expo-font';

const FinanceMaster = () => {
    let [fontsLoaded] = useFonts({
        'JetBrainsMono': require('../assets/fonts/JetBrainsMono-Thin.ttf'),
        'JetBrainsMono-Bold': require('../assets/fonts/JetBrainsMono-Bold.ttf'),
    });

    const context = useContext(finContext);
    if (context.isLoading || !fontsLoaded) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size={250} color='#2244FF80' />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <FinanceStackNavigator />
        </NavigationContainer>
    )
}

export default FinanceMaster

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
    }
})
