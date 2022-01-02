import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const BookingItem = props => {

    const scaleFontSize = (fontSize) => {
        return Math.ceil((fontSize * Math.min(Dimensions.get('window').width / 411, Dimensions.get('window').height / 861)));
    }

    return (
        <TouchableOpacity
            onPress={() => {
                props.showBooking(props.id);
            }}>
            <View style={[styles.item, { marginTop: props.isMarginTop ? '3%' : 0 }]}>
                <View style={{ width: '70%', justifyContent: 'center', }}>
                    <Text numberOfLines={1} style={{ color: 'white', fontSize: scaleFontSize(24) }}>{props.name}</Text>
                    <Text numberOfLines={1} style={{ color: 'grey', fontSize: scaleFontSize(16) }}>{""
                        + (props.date.getDate() < 10 ? "0" + props.date.getDate() : props.date.getDate()) + "."
                        + (props.date.getMonth() < 9 ? "0" + (props.date.getMonth() + 1) : (props.date.getMonth() + 1)) + "."
                        + props.date.getFullYear()}</Text>

                </View>
                <View style={{ width: '30%', alignItems: 'flex-end' }}>
                    <Text numberOfLines={1} style={{ color: props.value > 0 ? 'green' : 'red', fontSize: scaleFontSize(24), fontWeight: 'bold' }}>{props.value} €</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        paddingHorizontal: 4,
    }
});

export default BookingItem;
