import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import CategoryItemList from '../components/CategoryItemList';
import DatePicker from '../components/DatePicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { finContext } from '../contexts/FinContext';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';


const CategoryScreen = props => {
    const context = useContext(finContext);
    const [date, _setDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState(context.categories[0]);
    const childCategories = selectedCategory ? context.categories.filter((category) => category.parentId === selectedCategory.id) : [];

    const scaleFontSize = (fontSize) => {
        return Math.ceil((fontSize * Math.min(Dimensions.get('window').width / 411, Dimensions.get('window').height / 861)));
    }

    useEffect(() => {
        setLatestDate();
    }, []);

    const setDate = (date) => {
        _setDate(date);
        context.actions.refresh(date.toISOString())
    }

    const setLatestDate = () => {
        let today = new Date();
        if (context.transactions[0]) {
            let newDate = new Date(context.transactions[0].date);
            setDate(newDate > today ? newDate : today);
        } else {
            setDate(today);
        }
    }

    useEffect(() => {
        const backAction = () => {
            if (selectedCategory.id === -1) {
                return false;
            } else {
                setSelectedCategory(context.categories.find((category) => category.id === selectedCategory.parentId));
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    });

    return (
        <View style={styles.screen}>
            <View style={styles.topBar}>
                <View style={styles.topBarCat}>
                    <Text style={{ color: 'white', fontSize: scaleFontSize(36), fontWeight: 'bold', textAlign: 'center' }}>{selectedCategory.name} <Text numberOfLines={1} style={{ color: selectedCategory.value > 0 ? 'green' : 'red' }}>{(selectedCategory.name + selectedCategory.value).length > 20 && '\n'}{selectedCategory.value} €</Text> </Text>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('EditCategory', { categoryId: selectedCategory.id, name: selectedCategory.name })
                        }}
                    >
                        <MaterialCommunityIcons name="lead-pencil" size={scaleFontSize(32)} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <CategoryItemList
                    style={{ maxHeight: '100%' }}
                    bookings={context.transactions.filter(t => t.categoryId === selectedCategory.id)}
                    categories={childCategories}
                    showBooking={(id) => props.navigation.push('Booking', { id: id })}
                    showCategory={(id) => setSelectedCategory(context.categories.find((category) => category.id === id))}
                    showBookings={selectedCategory.id != -1}
                />
            </View>

            <View style={styles.topBarDate}>
                <DatePicker
                    style={styles.dateInput}
                    date={date}
                    setDate={setDate}
                    setTime={false}
                />
                <View style={styles.topBarDateIcons}>
                    <TouchableOpacity
                        onPress={() => setDate(new Date())}
                    >
                        <MaterialCommunityIcons name="timetable" size={scaleFontSize(36)} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setLatestDate();
                        }}>
                        <MaterialCommunityIcons name="timer-sand-full" size={scaleFontSize(36)} color="white" />
                    </TouchableOpacity>
                    {selectedCategory.id != -1 && <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('CreateBooking', {
                                categoryId: selectedCategory.id, editMode: false,
                            });
                        }}
                    >
                        <MaterialCommunityIcons name="credit-card-plus" size={scaleFontSize(36)} color="#00FF00" />
                    </TouchableOpacity>}
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
    },
    topBar: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    topBarDate: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderTopWidth: 1,
        padding: 10,
    },
    topBarDateIcons: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '40%'
    },
    topBarCat: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    dateInput: {
        width: '60%',
    }
});

export default CategoryScreen;