import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            // Clear async storage or perform any logout logic here
            await AsyncStorage.clear();

            // Navigate back to login or home screen
            navigation.navigate('LOGIN'); // Replace 'Login' with your actual login screen route
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'An error occurred while logging out. Please try again.');
        }
    };

    return (
            <View style={styles.profileContainer}>
                <Image source={require("../assets/sclogo.png")} style={styles.logo} resizeMode="contain" />
                <Text style={styles.nameText}>XYZ</Text>
                <Text style={styles.emailText}>Xyz@example.com</Text>
                <TouchableOpacity style={styles.logoutButtonWrapper} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 350,
        height: 250,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: 20,
    },
    emailText: {
        fontSize: 18,
        color: colors.black,
        marginTop: 10,
    },
    logoutButtonWrapper: {
        backgroundColor: colors.dark,
        borderRadius: 100,
        marginTop: 30,
    },
    logoutButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: '500',
        textAlign: "center",
        padding: 10,
    },
});
