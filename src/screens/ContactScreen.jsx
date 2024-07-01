import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Voice, Call } from '@twilio/voice-react-native-sdk';

const ContactScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callState, setCallState] = useState('');
    const [voiceToken, setVoiceToken] = useState(null);
    const [currentCall, setCurrentCall] = useState(null);
    const voice = new Voice();

    useEffect(() => {
        const fetchVoiceToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    throw new Error('User token not found in AsyncStorage');
                }

                const response = await fetch(
                    `https://dev-api.salescaptain.com/api/v1/voice/call-token/fe1d5680-81ae-44f5-8000-cb952f873266`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch voice token');
                }

                const result = await response.json();
                const newVoiceToken = result.data.entity.token;

                setVoiceToken(newVoiceToken);
                await AsyncStorage.setItem('voiceToken', newVoiceToken);
            } catch (error) {
                console.error('Error fetching voice token:', error);
                Alert.alert('Error', 'Failed to fetch voice token');
            }
        };

        fetchVoiceToken();
    }, []);

    const handleIncomingCallInvite = (callInvite) => {
        callInvite.accept();
    };

    useEffect(() => {
        if (voiceToken) {
            voice.register(voiceToken);

            voice.on(Voice.Event.CallInvite, handleIncomingCallInvite);

            return () => {
                voice.unregister(voiceToken);
                voice.removeAllListeners();
            };
        }
    }, [voiceToken]);

    const handleCall = async () => {
        try {
            if (!phoneNumber) {
                Alert.alert('Error', 'Please enter a phone number.');
                return;
            }

            if (!voiceToken) {
                Alert.alert('Error', 'Voice token not available. Please try again later.');
                return;
            }

            setCallState('connecting');

            const callParams = {
                To: phoneNumber,
                From: '+15077095289',
                customParameters: {
                    from_user: 'client:fe1d5680-81ae-44f5-8000-cb952f873266',
                    account_id: 'fe1d5680-81ae-44f5-8000-cb952f873266',
                }
            };

            const call = await voice.connect(voiceToken, callParams);

            if (!call || typeof call !== 'object' || !call.on) {
                throw new Error('Invalid call object received');
            }

            setCurrentCall(call);
            setCallState('connected');

            call.on(Call.Event.Disconnected, () => {
                setCallState('disconnected');
                setCurrentCall(null);
            });

            call.on(Call.Event.Error, (error) => {
                setCallState('connectError');
                Alert.alert('Error', `Failed to connect call: ${error.message}`);
            });

        } catch (error) {
            setCallState('connectError');
            Alert.alert('Error', `Failed to connect call: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Call State: {callState}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
            />
            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
            {currentCall && (
                <View style={styles.callControls}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => currentCall.mute(true)}>
                        <Text style={styles.controlButtonText}>Mute</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={() => currentCall.hold(true)}>
                        <Text style={styles.controlButtonText}>Hold</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton} onPress={() => currentCall.disconnect()}>
                        <Text style={styles.controlButtonText}>Disconnect</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    callButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    callButtonText: {
        color: 'white',
        fontSize: 16,
    },
    callControls: {
        marginTop: 20,
    },
    controlButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    controlButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ContactScreen;
