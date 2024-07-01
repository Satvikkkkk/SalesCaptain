import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { colors } from '../utils/colors';

const ContactDetails = ({ route, navigation }) => {
    const { contact, lastMessage } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ text: lastMessage , time: (contact.last_message_timestamp), isUser: true }]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, time: new Date(), isUser: true }]);
            setMessage('');
        }
    };

    const renderMessageItem = ({ item }) => (
        <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.contactMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back-outline" size={30} color={colors.black} />
                </TouchableOpacity>
                <Avatar rounded source={{ uri: contact.avatar }} size="medium" />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>{`${contact.first_name} ${contact.last_name}`}</Text>
                    <Text style={styles.onlineStatus}>Online</Text>
                </View>
                <View style={styles.headerIcons}>
                    <Ionicons name="videocam-outline" size={30} color={colors.black} style={styles.icon} />
                    <Ionicons name="call-outline" size={30} color={colors.black} style={styles.icon} />
                </View>
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Ionicons name="send-outline" size={28} color={colors.primary} style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.gray,
        borderWidth: 0.3
    },
    backButton: {
        marginRight: 10,
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    onlineStatus: {
        fontSize: 14,
        color: colors.green,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 5,
    },
    chatContainer: {
        flexGrow: 1,
        padding: 10,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 600,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
    },
    contactMessage: {
        alignSelf: 'flex-start',
        backgroundColor: colors.lightGray,
    },
    messageText: {
        color: colors.white,
    },
    messageTime: {
        fontSize: 10,
        color: colors.lightGray,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: colors.lightGray,
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: colors.lightGray,
        marginRight: 10,
    },
    sendIcon: {
        padding: 5,
    },
});

export default ContactDetails;
