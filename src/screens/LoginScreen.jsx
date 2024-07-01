import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/colors';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const handleProfile = () => {
    navigation.navigate('NAV');
  };

  const handleReset = () => {
    navigation.navigate('RESET');
  };

  const fetchVoiceToken = async (accessToken) => {
    try {
      const accountId = await AsyncStorage.getItem('accountId');
      const response = await fetch(`https://dev-api.salescaptain.com/api/v1/voice/call-token/${accountId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voice token');
      }

      const result = await response.json();
      const newVoiceToken = result.data.entity.token;
      console.log('New Voice Token:', newVoiceToken);

      return newVoiceToken;
    } catch (error) {
      console.error('Error fetching voice token:', error);
      throw error;
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const requestBody = JSON.stringify({ email, password });
      const response = await fetch('https://dev-api.salescaptain.com/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (result && result.data && result.data.access_token) {
        // Storing tokens securely
        await AsyncStorage.setItem('userToken', result.data.access_token);
        await AsyncStorage.setItem('companyId', result.data.company_id);
        await AsyncStorage.setItem('accountId', result.data.account_id);

        // Fetch Twilio voice token (optional, depending on your flow)
        // const voiceToken = await fetchVoiceToken(result.data.access_token);

        // Navigate to next screen
        handleProfile(result.data.access_token, result.data.company_id);
      } else {
        throw new Error('Login failed: Token not received in response');
      }
    } catch (error) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[colors.gray, colors.blue]} style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Image source={require('../assets/sclogo.png')} style={styles.loadingLogo} resizeMode="contain" />
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
              <Ionicons name={'arrow-back-outline'} color={colors.black} size={30} />
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <View>
                <Image source={require('../assets/sclogo.png')} style={styles.logo} resizeMode="contain" />
              </View>

              <View style={styles.inputContainer}>
                <Entypo name={'mail'} size={30} color={colors.black} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor={colors.black}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Entypo name={'lock'} size={30} color={colors.black} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor={colors.black}
                  secureTextEntry={secureEntry}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
                  <Entypo name={'eye'} size={30} color={colors.black} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleReset}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>

              <Text style={styles.continueText}>or continue with</Text>

              <TouchableOpacity style={styles.googleButtonContainer}>
                <Image source={require('../assets/googleicon48.png')} style={styles.googleimg} />
                <Text style={styles.google}>Google</Text>
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleSignup}>
                  <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 200,
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
    flexDirection: 'row',
    alignItems: 'center',
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
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.black,
    fontWeight: '500',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.dark,
    borderRadius: 100,
    marginTop: 10,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 100,
    justifyContent: 'center',
    gap: 10,
  },
  googleimg: {
    height: 40,
    width: 25,
    top: 5,
  },
  google: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 2,
  },
  accountText: {
    color: colors.black,
    fontWeight: '400',
  },
  signupText: {
    color: colors.black,
    fontWeight: '500',
  },
});
