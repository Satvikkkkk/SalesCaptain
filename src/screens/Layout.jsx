import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InboxScreen from './InboxScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import { colors } from '../utils/colors';
import { Image, Platform, StyleSheet, View } from 'react-native';
import ContactScreen from './ContactScreen';
import QuickSend from './Recentcalls';
import calls from '../assets/calls.png';
import callnot from '../assets/callnot.png';
import chatf from '../assets/chatf.png';
import chatoutline from '../assets/chatoutline.png';
import Reviews from './Reviews';
import reviewf from '../assets/reviewf.png';
import reviewoutline from '../assets/reviewoutline.png';
import send from '../assets/send.png'
import sendoutline from '../assets/sendoutline.png';
import person from '../assets/person.png';
import personoutline from '../assets/personoutline.png';
import RecentCalls from './Recentcalls';
import contactsoutline from '../assets/contactsoutline.png';
import contacts from '../assets/contacts.png'


const Tab = createBottomTabNavigator();

const Layout = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: colors.violet,
                    height: Platform.OS === "android" ? 100 : 40,
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                }
            }}
        >
            <Tab.Screen name="Inbox" component={InboxScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? chatf : chatoutline}
                        resizeMode='contain'
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                )
            }}
            />
            <Tab.Screen name="Reviews" component={Reviews} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? reviewf : reviewoutline}
                        resizeMode='contain'
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                )
            }}
            />
            <Tab.Screen name="Calls" component={RecentCalls} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.violet,
                        height: Platform.OS === "android" ? 60 : 60,
                        width: Platform.OS === "android" ? 60 : 60,
                        top: Platform.OS === "android" ? -40 : -30,
                        borderRadius: Platform.OS === "android" ? 35 : 30,
                        borderWidth: 3,
                        borderColor: "transparent",
                        elevation: 50

                    }}>
                        <Image source={focused ? calls : callnot}
                            resizeMode='contain'
                            style={{
                                width: 64,
                                height: 64,
                                elevation: 5
                            }} />
                    </View>
                )
            }}
            />

            <Tab.Screen name="Send" component={ContactScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? contacts : contactsoutline}
                        resizeMode='contain'
                        style={{
                            width: 35,
                            height: 35,
                            
                        }}
                    />
                )
            }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? person : personoutline}
                        resizeMode='contain'
                        style={{
                            width: 35,
                            height: 35,
                        }}
                    />
                )
            }}
            />

        </Tab.Navigator>
    );
};

export default Layout;

const styles = StyleSheet.create({});
