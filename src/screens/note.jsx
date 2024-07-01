import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const RecentCalls = () => {
    const navigation = useNavigation();
    const [recentCalls, setRecentCalls] = useState([]);

    useEffect(() => {
        const fetchRecentCalls = async () => {
            try {
                const calls = JSON.parse(await AsyncStorage.getItem('recentCalls')) || [];
                setRecentCalls(calls);
            } catch (error) {
                console.error('Error fetching recent calls:', error);
            }
        };

        fetchRecentCalls();
    }, []);

    const handleContactPress = (contact) => {
        console.log('Pressed contact:', contact);
        // navigation.navigate('ContactDetails', { contact });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Calls</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {recentCalls.length === 0 ? (
                    <Text style={styles.noDataText}>No recent calls available.</Text>
                ) : (
                    recentCalls.map((contact, index) => (
                        <TouchableOpacity key={index} onPress={() => handleContactPress(contact)} style={[styles.contactItem, { backgroundColor: index % 2 === 0 ? colors.gray : colors.white }]}>
                            <View style={styles.contactIcon}>
                                <Ionicons name="call-outline" size={40} color={colors.dark} />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>{contact.name || 'No Name'}</Text>
                                <Text style={styles.contactDetails}>{contact.phone || contact.email || 'No Details'}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        color: colors.black,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark,
        marginBottom: 1,
    },
    contactIcon: {
        marginRight: 15,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    contactDetails: {
        fontSize: 14,
        color: colors.grey,
    },
    noDataText: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default RecentCalls;
