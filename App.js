import React from 'react';
import { SafeAreaView } from 'react-native';
import UserManagement from './components/user'; 

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <UserManagement />
        </SafeAreaView>
    );
}