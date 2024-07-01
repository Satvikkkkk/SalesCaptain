import { Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation()
  const [secureEntry, setSecureEntry] = useState(true);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN")
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.black} size={30} />
      </TouchableOpacity>
      
      {/* form */}
        <View style={styles.formContainer}>
          <View>
            <Image source={require("../assets/sclogo.png")} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.inputContainer}>
          <Entypo name={"man"} size={30} color={colors.black} style={styles.icon} />
          <TextInput style={styles.textInput} placeholder="Name" placeholderTextColor={colors.black} keyboardType="email-address" />
          </View>
          <View style={styles.inputContainer}>
            <Entypo name={"mail"} size={30} color={colors.black} style={styles.icon} />
            <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor={colors.black} keyboardType="email-address" />
          </View>
        <View style={styles.inputContainer}>
          <Entypo name={"lock"} size={30} color={colors.black} style={styles.icon} />
            <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor={colors.black} secureTextEntry={secureEntry} />
            <TouchableOpacity onPress={() => { setSecureEntry((prev) => !prev); }}>
              <Entypo name={"eye"} size={30} color={colors.black}></Entypo>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Sign-in</Text>
          </TouchableOpacity>
          <Text style={styles.continueText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButtonContainer}>
            <Image source={require("../assets/googleicon48.png")} style={styles.googleimg} />
            <Text style={styles.google}>Google</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </ScrollView>
  )
}

export default SignupScreen;

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
    left: 35

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

  forgotPasswordText: {
    textAlign: "right",
    color: colors.black,
    fontWeight: '500',
    marginVertical: 10
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
    textAlign: "center",
    padding: 10,
  },

  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },

  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 100,
    justifyContent: "center",
    gap: 10,
  },

  googleimg: {
    height: 40,
    width: 25,
    top: 5
  },
  google: {
    fontSize: 20,
    color: colors.black,
    fontWeight: '500',
    textAlign: "center",
    padding: 10,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 2,
  },

  accountText: {
    color: colors.black,
    fontWeight: '400',
  },
  signupText: {
    color: colors.black,
    fontWeight: '500'
  },

})