import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import SpinningLogo from '@/components/SpinningLogo'; 

export default function EmailAuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFakeLogin = () => {
    router.replace('/(auth)/onboarding');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

            <View style={styles.logoWrapper}>
              <SpinningLogo scale={0.5} speed={800}>
                <Text style={styles.jamText}>JAM</Text> 
              </SpinningLogo>
            </View>


      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome5 name="arrow-left" size={20} color="#412D15" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.headerText}>Log In.</Text>
        <Text style={styles.subText}>Welcome back to the jam.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="artist@studio.com"
            placeholderTextColor="#A9A197"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#A9A197"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={handleFakeLogin}>
          <Text style={styles.btnTextLight}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push('/(auth)/forgot')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginTop: 60,
    marginLeft: 24,
    padding: 10,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    paddingBottom: 60, 
  },
  headerText: {
    fontFamily: 'Bitcount',
    fontSize: 48,
    color: '#412D15',
    marginBottom: 8,
  },
  subText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#412D15',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Bitcount',
    fontSize: 14,
    color: '#412D15',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 16,
    backgroundColor: '#F5F3ED', 
    color: '#412D15',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#E1DCC9',
  },
  signInBtn: {
    backgroundColor: '#412D15',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  btnTextLight: {
    fontFamily: 'Bitcount',
    color: '#E1DCC9',
    fontSize: 18,
  },
  forgotBtn: {
    marginTop: 24,
    alignItems: 'center',
  },
  forgotText: {
    fontFamily: 'InterBold',
    color: '#412D15',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
    logoWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
    jamText: {
    fontFamily: 'Bitcount', 
    fontSize: 48,
    color: '#412D15',
    letterSpacing: 2,
  },
  
});