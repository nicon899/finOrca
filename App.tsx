import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { FinProvider } from './contexts/FinContext';
import FinanceMaster from './screens/FinanceMaster';

export default function App() {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="black" />
      <FinProvider>
        <FinanceMaster />
      </FinProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black'
  }
});