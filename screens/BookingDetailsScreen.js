import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { finContext } from '../contexts/FinContext';

const BookingDetailScreen = props => {
    const { transactions, actions } = useContext(finContext);
    const booking = transactions.find((booking) => booking.id === props.route.params.id);


    if (!booking) {
        return (<Text>Booking gelöscht!</Text>);
    }

    const scaleFontSize = (fontSize) => {
        return Math.ceil((fontSize * Math.min(Dimensions.get('window').width / 411, Dimensions.get('window').height / 861)));
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Delete Booking',
                            'This Booking will be removed for good!',
                            [{ text: 'Cancel', style: 'cancel' },
                            {
                                text: 'OK', onPress: () => {
                                    props.navigation.goBack();
                                    actions.deleteTransaction(props.route.params.id)
                                }
                            },
                            ], { cancelable: true }
                        )
                    }}
                >
                    <MaterialCommunityIcons name="delete" size={scaleFontSize(48)} color="red" />
                </TouchableOpacity>
            </View>
            <View style={styles.name}>
                <Text style={{ color: 'white', fontSize: scaleFontSize(42), fontWeight: 'bold', maxWidth: '85%' }}>{booking.name} </Text>
                <TouchableOpacity
                    style={{ maxWidth: '15%' }}
                    onPress={() => {
                        props.navigation.navigate('CreateBooking', {
                            editMode: true,
                            categoryId: booking.categoryId,
                            name: booking.name,
                            id: booking.id,
                            value: booking.value,
                            date: booking.date.toString(),
                            details: booking.details
                        });
                    }}
                >
                    <MaterialCommunityIcons name="lead-pencil" size={scaleFontSize(36)} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text style={{ color: 'grey', fontSize: scaleFontSize(36) }}>{
                    "" + (booking.date.getDate() < 10 ? "0" + booking.date.getDate() : booking.date.getDate()) + "."
                    + (booking.date.getMonth() < 9 ? "0" + (booking.date.getMonth() + 1) : (booking.date.getMonth() + 1)) + "."
                    + booking.date.getFullYear()}</Text>
                <Text style={{ color: booking.value > 0 ? 'green' : 'red', fontSize: scaleFontSize(36), fontWeight: 'bold' }}>{booking.value} €</Text>
                <Text style={{ color: 'white', fontSize: scaleFontSize(22) }}>{booking.details}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    info: {
        marginHorizontal: 25,
    },
    topBar: {
        height: '10%',
        padding: 5,
        alignItems: 'flex-end'
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        marginHorizontal: 25,
    }
});

export default BookingDetailScreen;
