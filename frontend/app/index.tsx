import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import SpinningLogo from '../components/SpinningLogo'; // Import your new component!

export default function SmartLoginScreen() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // We only keep the boot-up timer here since it controls the UI reveal
    const authCheck = setTimeout(() => {
      setIsBooting(false); 
    }, 2500);

    return () => clearTimeout(authCheck);
  }, []);

  return (
    <View style={styles.container}>
  
    <View style={styles.logoWrapper}>
      <SpinningLogo scale={1} speed={800}>
        <Text style={styles.jamText}>JAM</Text> 
      </SpinningLogo>
    </View>

      {!isBooting && (
        <Animated.View entering={FadeIn.duration(800)} style={styles.authContainer}>
          <View style={styles.textBlock}>
            <Text style={styles.tagline}>Find Artists.</Text>
            <Text style={styles.tagline}>Show your Portfolio.</Text>
            <Text style={styles.tagline}>Jam.</Text>
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <FontAwesome5 name="google" size={20} color="#E1DCC9" />
            <Text style={styles.btnTextLight}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.emailBtn}>
            <FontAwesome5 name="envelope" size={20} color="#412D15" />
            <Text style={styles.btnTextDark}>Sign in with Email</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    marginBottom: 20,
    marginTop: 40,
  },
  authContainer: {
    alignItems: 'center',
    width: '85%',
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tagline: {
    fontFamily: 'Bitcount', 
    fontSize: 18,
    color: '#412D15',
    marginBottom: 6,
    textAlign: 'center',
  },
  googleBtn: {
    flexDirection: 'row',
    backgroundColor: '#412D15',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  emailBtn: {
    flexDirection: 'row',
    backgroundColor: '#E1DCC9', 
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  btnTextLight: {
    fontFamily: 'Bitcount',
    color: '#E1DCC9',
    fontSize: 16,
    marginLeft: 14,
    marginTop: 4, 
  },
  btnTextDark: {
    fontFamily: 'Bitcount',
    color: '#412D15',
    fontSize: 16,
    marginLeft: 14,
    marginTop: 4,
  },
  orText: {
    fontFamily: 'Bitcount',
    marginVertical: 18,
    fontSize: 18,
    color: '#412D15',
  },
  jamText: {
    fontFamily: 'Bitcount', 
    fontSize: 48,
    color: '#412D15',
    letterSpacing: 2,
  },
});