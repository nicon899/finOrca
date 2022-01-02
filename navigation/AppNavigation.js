import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CategoryScreen from '../screens/CategoryScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';
import CreateBookingScreen from '../screens/CreateBookingScreen';
import EditCategoryScreen from '../screens/EditCategoryScreen';

const FinanceStack = createStackNavigator();
export const FinanceStackNavigator = () => {
    return (
        <FinanceStack.Navigator
            screenOptions={{
                headerShown: true
            }}>
            <FinanceStack.Screen name="Category" component={CategoryScreen} />
            <FinanceStack.Screen name="CreateCategory" component={CreateCategoryScreen} />
            <FinanceStack.Screen name="EditCategory" component={EditCategoryScreen} />
            <FinanceStack.Screen name="Booking" component={BookingDetailsScreen} />
            <FinanceStack.Screen name="CreateBooking" component={CreateBookingScreen} />
        </FinanceStack.Navigator>
    );
}