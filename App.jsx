import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import InboxScreen from './src/screens/InboxScreen';
import ContactScreen from './src/screens/ContactScreen';
import Dialer from './src/screens/Dialer';
import ContactDetails from './src/screens/ContactDetails';
import Layout from './src/screens/Layout';
import { LogBox } from 'react-native';
import RecentCalls from './src/screens/Recentcalls';

LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        
        <Stack.Screen name={"HOME"} component={HomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name={"SIGNUP"} component={SignupScreen} />
        <Stack.Screen name={"RESET"} component={PasswordResetScreen} />
        <Stack.Screen name={"RecentCalls"} component={RecentCalls} />
        <Stack.Screen name={"PROFILE"} component={ProfileScreen} />
        <Stack.Screen name={"Inbox"} component={InboxScreen} />
        <Stack.Screen name={"Contacts"} component={ContactScreen} />
        <Stack.Screen name={"Dial"} component={Dialer} />
        <Stack.Screen name={"ContactDetails"} component={ContactDetails} />
        <Stack.Screen name={"NAV"} component={Layout} />
        

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})