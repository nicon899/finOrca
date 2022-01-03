import React, { useState, useEffect, useContext } from 'react';
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
            if (!props.navigation.isFocused()) {
                return false;
            }
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
        return () => {
            backHandler.remove()
        };
    }, [selectedCategory]);

    return (
        <View style={styles.screen}>
            <View style={styles.topBar}>
                <View style={styles.dateBar}>
                    <DatePicker
                        style={styles.dateInput}
                        date={date}
                        setDate={setDate}
                        setTime={false}
                        showArrow={false}
                    />
                    <View style={styles.topBarDateIcons}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => setDate(new Date())}
                        >
                            <MaterialCommunityIcons name="timetable" size={scaleFontSize(24)} color="white" />
                            <Text style={{ color: 'white', fontSize: scaleFontSize(7) }}>Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                setLatestDate();
                            }}>
                            <MaterialCommunityIcons name="timer-sand-full" size={scaleFontSize(24)} color="white" />
                            <Text style={{ color: 'white', fontSize: scaleFontSize(7) }}>Latest</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                    onPress={() => props.navigation.navigate('Settings')}>
                    <MaterialCommunityIcons name="cog-outline" size={scaleFontSize(28)} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerCat}
                    onPress={() => {
                        props.navigation.navigate('EditCategory', { categoryId: selectedCategory.id, name: selectedCategory.name })
                    }}
                >
                    <Text style={{ color: 'white', fontSize: scaleFontSize(36), fontWeight: 'bold', textAlign: 'center' }}>{selectedCategory.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: scaleFontSize(36), fontWeight: 'bold', textAlign: 'center', color: selectedCategory.value > 0 ? 'green' : 'red' }}>{(selectedCategory.name + selectedCategory.value).length > 20 && '\n'}{selectedCategory.value} €</Text>
                </TouchableOpacity>
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

            <View style={styles.transBar}>
                {selectedCategory.id != -1 && <TouchableOpacity
                    style={[styles.transButton, { borderColor: '#00FF00', backgroundColor: '#00FF00' }]}
                    onPress={() => {
                        props.navigation.navigate('CreateBooking', {
                            categoryId: selectedCategory.id, editMode: false, value: 1
                        });
                    }}
                >
                    <Text style={{ color: 'white' }}>+</Text>
                </TouchableOpacity>}
                {selectedCategory.id != -1 && <TouchableOpacity
                    style={[styles.transButton, { borderColor: '#FF0000', backgroundColor: '#FF0000' }]}
                    onPress={() => {
                        props.navigation.navigate('CreateBooking', {
                            categoryId: selectedCategory.id, editMode: false, value: -1
                        });
                    }}
                >
                    <Text style={{ color: 'white' }}>-</Text>
                </TouchableOpacity>}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
        padding: 5
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    topBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    dateBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topBarDateIcons: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '40%'
    },
    headerCat: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    transBar: {
        flexDirection: 'row',
        width: '100%',
    },
    transButton: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        flex: 1,
    }
});

export default CategoryScreen;