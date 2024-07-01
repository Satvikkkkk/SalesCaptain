import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const PasswordResetScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleResetPassword = () => {
        // Implement password reset functionality
        alert('Password reset link sent to ' + email);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                    <Ionicons name={"arrow-back-outline"} color={colors.black} size={30} />
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <View>
                        <Image source={require("../assets/sclogo.png")} style={styles.logo} resizeMode="contain" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Entypo name={"mail"} size={30} color={colors.black} style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor={colors.black}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <TouchableOpacity style={styles.resetButtonWrapper} onPress={handleResetPassword}>
                        <Text style={styles.resetButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 10,
    },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 150,
        left: 35,
    },
    formContainer: {
        flex: 1,
        marginTop: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
        backgroundColor: colors.white,
    },
    icon: {
        paddingHorizontal: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
    },
    resetButtonWrapper: {
        backgroundColor: colors.dark,
        borderRadius: 100,
        marginTop: 10,
    },
    resetButtonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: '500',
        textAlign: "center",
        padding: 10,
    },
});
