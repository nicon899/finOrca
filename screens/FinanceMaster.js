import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { finContext } from '../contexts/FinContext';
import { FinanceStackNavigator } from '../navigation/AppNavigation';

const FinanceMaster = () => {
    const context = useContext(finContext);
    if (context.isLoading) {
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
