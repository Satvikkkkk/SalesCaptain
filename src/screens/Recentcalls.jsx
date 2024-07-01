import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { colors } from '../utils/colors';
import dialpad from '../assets/dialpad.png'
import { Image } from 'react-native-elements';

const RecentCalls = ({ navigation }) => {
  const isFocused = useIsFocused();
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
  }, [isFocused]); // Refresh when component is focused

  const handleContactPress = (contact) => {
    console.log('Pressed contact:', contact);
    // Handle contact press if needed
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
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Dial')}
        >
          <Image source={dialpad} resizeMode='contain' style={{ width: 34, height: 34 }} color={colors.black} />
        </TouchableOpacity>
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
    color: colors.gray,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderWidth: 20,
    borderColor: colors.secondary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.violet,
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

  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 180,
    backgroundColor: colors.gray,
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default RecentCalls;
