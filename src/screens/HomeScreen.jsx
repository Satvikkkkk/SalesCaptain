import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/colors';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // Animated values
    const logoPosition = useSharedValue(-200);
    const logoOpacity = useSharedValue(0);

    // Animation function
    const logoAnimation = () => {
        logoPosition.value = withSpring(0, { damping: 15, stiffness: 100 });
        logoOpacity.value = withSpring(1);
    };

    // Run animation on component mount
    useEffect(() => {
        // Simulate an async operation (e.g., data fetching)
        const fetchData = async () => {
            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
            logoAnimation();
        };

        fetchData();
    }, []);

    // Animated style for logo
    const animatedLogoStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: logoPosition.value }],
            opacity: logoOpacity.value,
        };
    });

    const handleLogin = () => {
        navigation.navigate("LOGIN");
    };

    const handleSignup = () => {
        navigation.navigate("SIGNUP");
    };

    return (
        <LinearGradient colors={[colors.gray, colors.blue]} style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Image source={require("../assets/sclogo.png")} style={styles.loadingLogo} resizeMode="contain" />
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <>
                    <Animated.Image
                        source={require("../assets/sclogo.png")}
                        style={[styles.logo, animatedLogoStyle]}
                    />
                    <Text style={styles.banner}>Supercharge Your Business with AI 🚀</Text>
                    <Text style={styles.question1}>Ready</Text>
                    <Text style={styles.question2}>to</Text>
                    <Text style={styles.question3}>Grow?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.loginButtonWrapper, { backgroundColor: colors.secondary }]} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.loginButtonWrapper]} onPress={handleSignup}>
                            <Text style={styles.signupButtonText}>Sign-up</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
    logo: {
        height: 50,
        width: 330,
        marginVertical: 180,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
    },
    banner: {
        marginTop: -200,
        marginLeft: 85,
        color: colors.black,
        fontWeight: 'bold',
    },
    question1: {
        fontSize: 90,
        marginTop: 100,
        color: colors.black,
        fontWeight: 'bold',
        marginRight: 100,
        marginTop: 10,
    },
    question2: {
        color: colors.black,
        fontSize: 90,
        marginRight: 250,
        marginTop: -20,
        fontWeight: 'bold',
    },
    question3: {
        color: colors.black,
        fontSize: 90,
        right: 50,
        marginTop: -20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: "row",
        top: 40,
        borderWidth: 2,
        borderColor: colors.black,
        width: "80%",
        height: 60,
        borderRadius: 100,
    },
    loginButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        borderRadius: 99,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupButtonText: {
        fontSize: 18,
        color: colors.black,
        fontWeight: 'bold',
    },
});
