import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const Dialer = () => {
    const navigation = useNavigation();
    const [dialedNumber, setDialedNumber] = useState('');

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleNumberPress = (number) => {
        setDialedNumber(prevNumber => prevNumber + number);
    };

    const handleLongPress = (number) => {
        if (number === '0')
            setDialedNumber(prevNumber => prevNumber + '+');
    }

    const handleDeletePress = () => {
        setDialedNumber(prevNumber => prevNumber.slice(0, -1));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="arrow-back-outline" size={30} color={colors.black} />
                </TouchableOpacity>
                <View style={styles.numberContainer}>
                    <Text style={styles.headerText}>Primary</Text>
                    <Text style={styles.phoneNumber}>{'123456789'}</Text>
                </View>
            </View>

            {/* Display dialed number just above the dial pad */}
            <Text style={styles.dialedNumber}>{dialedNumber}</Text>

            
            {dialedNumber.length > 0 && (
                <TouchableOpacity style={styles.deleteContainer} onPress={handleDeletePress}>
                    <Ionicons name="close-outline" size={30} color={colors.black} style={styles.delete} />
                </TouchableOpacity>
            )}

            <View style={styles.dialPad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.dialButton} onPress={() => handleNumberPress(item)} onLongPress={() => handleLongPress(item)}
                    >
                        <Text style={styles.dialButtonText}>{item}</Text>
                        <Text style={styles.dialButtonSubText}>{getDialPadLetters(item)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={50} color={colors.white} />
            </TouchableOpacity>
        </View>
    );
};

const getDialPadLetters = (number) => {
    switch (number) {
        case '2':
            return 'ABC';
        case '3':
            return 'DEF';
        case '4':
            return 'GHI';
        case '5':
            return 'JKL';
        case '6':
            return 'MNO';
        case '7':
            return 'PQRS';
        case '8':
            return 'TUV';
        case '9':
            return 'WXYZ';
        case '0':
            return '+';
        default:
            return '';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.blue,
    },
    numberContainer: {
        alignItems: 'center',
        flex: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
    },
    phoneNumber: {
        fontSize: 16,
        color: colors.black,
    },
    dialedNumber: {
        fontSize: 34,
        textAlign: 'center',
        marginVertical: 10,
        color: colors.black,
    },
    dialPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    dialButton: {
        width: '28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: colors.blue,
        borderRadius: 50,
    },
    dialButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
    },
    dialButtonSubText: {
        fontSize: 12,
        color: colors.black,
    },
    callButton: {
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderRadius: 50,
        padding: 15,
        marginBottom: 20,
    },
    deleteContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
    },

    delete: {
        top: 68,
    }
});

export default Dialer;
