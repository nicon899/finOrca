import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Platform, ToastAndroid, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import DatePicker from '../components/DatePicker';
import { AntDesign } from '@expo/vector-icons';
import CategoryPicker from '../components/CategoryPicker';

const CreateBookingScreen = props => {
    const [categoryId, setCategoryId] = useState(props.route.params.categoryId);
    const [name, setName] = useState(props.route.params.editMode ? props.route.params.name : '');
    const [value, setValue] = useState(props.route.params.editMode ? props.route.params.value > 0 ? props.route.params.value.toString() : (props.route.params.value * -1).toString() : '');
    const [details, setDetails] = useState(props.route.params.editMode ? props.route.params.details : '');
    const [date, setDate] = useState(props.route.params.editMode ? new Date(props.route.params.date) : new Date());
    const [isPositive, setIsPositive] = useState(props.route.params.value > 0);

    const scaleFontSize = (fontSize) => {
        return Math.ceil((fontSize * Math.min(Dimensions.get('window').width / 411, Dimensions.get('window').height / 861)));
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={styles.screen}>
                <Text style={{ color: 'white', marginBottom: 20, fontWeight: 'bold', fontSize: scaleFontSize(42) }}>{props.route.params.editMode ? 'Edit Booking' : 'New Booking'}</Text>

                <CategoryPicker categoryId={categoryId} setCategoryId={setCategoryId} />

                <TextInput
                    placeholder='Name'
                    placeholderTextColor="white"
                    style={[styles.input, { marginBottom: 25 }]}
                    blurOnSubmit
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={(input) => setName(input)}
                />

                <DatePicker
                    style={styles.dateInput}
                    date={date}
                    setDate={setDate}
                    setTime={false}
                />

                <View style={styles.valueInput}>
                    <TouchableOpacity
                        onPress={() => setIsPositive(!isPositive)}   >
                        {isPositive && <AntDesign style={{ marginRight: '10%' }} name="pluscircle" size={32} color="green" />}
                        {!isPositive && <AntDesign style={{ marginRight: '10%' }} name="minuscircle" size={32} color="red" />}
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.input, { width: '50%' }]}
                        placeholderTextColor="white"
                        placeholder='Amount'
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        keyboardType='number-pad'
                        onChangeText={(input) => setValue(input)}
                    />
                </View>

                <TextInput
                    placeholder='Details'
                    placeholderTextColor="white"
                    style={[styles.input, { marginBottom: 50 }]}
                    blurOnSubmit
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={details}
                    numberOfLines={4}
                    multiline={true}
                    onChangeText={(input) => setDetails(input)}
                />
            </View>

            <View style={{ width: '80%', height: '10%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                <TouchableOpacity
                    style={{ borderWidth: 1, borderColor: 'red', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 15, width: '30%', height: '50%' }}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <Text style={{ color: 'red' }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 15, width: '30%', height: '50%' }}
                    onPress={() => {
                        if (/^[0-9]+(\.[0-9]{1,2})?$/g.test(value)) {
                            // props.route.params.editMode ?
                                // dispatch(financeActions.updateBooking(props.route.params.id, name, isPositive ? value : -1 * value, details, date, categoryId)) :
                                // dispatch(financeActions.addBooking(name, isPositive ? value : -1 * value, details, date, categoryId));
                            props.navigation.goBack();
                        } else {
                            switch (Platform.OS) {
                                case 'android': ToastAndroid.show('Please enter a valid Value!', ToastAndroid.SHORT)
                                    break;
                                case 'web': alert('Please enter a valid Value');
                                    break;
                                default: Alert.alert('Invalid Value!', 'Please enter a valid Value');
                            }

                        }
                    }}
                >
                    <Text style={{ color: 'green' }}>OK</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 20,
    },
    input: {
        width: '75%',
        padding: 3,
        borderColor: 'grey',
        borderWidth: 1,
        color: 'white',
    },
    picker: {
        height: 25,
        width: '100%',
        padding: 10,
    },
    dateInput: {
        width: '75%',
        marginBottom: 25
    },
    valueInput: {
        flexDirection: 'row',
        width: '75%',
        alignItems: 'center',
        marginBottom: 25
    }
});

export default CreateBookingScreen;
