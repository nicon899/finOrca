import React from 'react';
import { FinProvider } from './contexts/FinContext';
import FinanceMaster from './screens/FinanceMaster';

export default function App() {
  return (
    <FinProvider>
      <FinanceMaster />
    </FinProvider>
  );
}
