import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, StatusBar, Image, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { colors } from '../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import edit from '../assets/edit.png';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const InboxScreen = () => {
    const navigation = useNavigation();
    const [inboxContacts, setInboxContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        handleInbox();
    }, []);

    useEffect(() => {
        filterContacts();
    }, [searchQuery, inboxContacts]);

    const handleInbox = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const companyId = await AsyncStorage.getItem('companyId');

            if (!companyId) {
                throw new Error('Company ID is not available');
            }

            const url = `https://dev-api.salescaptain.com/api/v1/contacts/get-all-inbox-contacts/${companyId.trim()}?itemsPerPage=30&page=1&is_opened=true`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Inbox Conversations:', result);

            if (result.status === 'success' && result.data?.entity?.data) {
                setInboxContacts(result.data.entity.data);
                setFilteredContacts(result.data.entity.data);
            } else {
                throw new Error('Failed to retrieve inbox contacts');
            }
        } catch (error) {
            console.error('Error fetching inbox contacts:', error);
            Alert.alert('Error', 'Failed to retrieve inbox contacts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const filterContacts = () => {
        if (searchQuery === '') {
            setFilteredContacts(inboxContacts);
        } else {
            const filtered = inboxContacts.filter(contact =>
                (contact.first_name && contact.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (contact.last_name && contact.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (contact.last_message && contact.last_message.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredContacts(filtered);
        }
    };

    const handleContactPress = (contact) => {
        console.log('Pressed contact:', contact);
        navigation.navigate('ContactDetails', { contact, lastMessage: contact.last_message });
    };

    const getLastMessageSnippet = (message) => {
        const maxLength = 35;
        return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
    };

    const renderItem = ({ item, index }) => {
        const backgroundColor = index % 2 === 0 ? colors.darkgray : colors.lightgray;

        const getInitials = (name) => {
            if (!name) return 'X';
            return name.charAt(0).toUpperCase();
        };

        return (
            <TouchableOpacity style={[styles.contactItem, { backgroundColor }]} onPress={() => handleContactPress(item)}>
                <Avatar
                    size="medium"
                    rounded
                    title={getInitials(item.first_name || item.email)}
                    containerStyle={{ backgroundColor: colors.primary, marginRight: 10 }}
                />
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{item.first_name || item.email || 'No Name'}</Text>
                    <Text style={styles.lastMessage}>{getLastMessageSnippet(item.last_message || '')}</Text>
                </View>
                <Text style={styles.lastMessageTime}>{item.last_message_timestamp}</Text>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Inbox</Text>
                </View>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={24} color={colors.black} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity>
                        <Image source={edit} resizeMode='contain' style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.contact_id}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: colors.sky,
        padding: 16,
        paddingRight: -1,
        paddingLeft: -1,
    },

    title: {
        fontSize: 44,
        fontWeight: 'bold',
        color: colors.gray,
        borderColor: colors.secondary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: colors.violet,
        paddingTop: 10,
        borderWidth: 20,
        borderLeftWidth: 20,
        bottom: 17,
        paddingHorizontal: 20,
        elevation: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray,
        height: 50,
        marginVertical: 22,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginLeft: 10,
        marginRight: 10,
        elevation: 30
    },
    searchInput: {
        flex: 1,
        height: "100%",
        marginHorizontal: 12,
        backgroundColor: colors.white,
    },
    editIcon: {
        width: 24,
        height: 24,
        backgroundColor: colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 0,
        marginBottom: 1,
        borderColor: colors.black,
        borderBottomWidth: 0.5,
        overflow: 'hidden',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    lastMessage: {
        fontSize: 14,
        color: colors.grey,
    },
    lastMessageTime: {
        fontSize: 12,
        color: colors.grey,
        bottom: 10
    },
});

export default InboxScreen;
