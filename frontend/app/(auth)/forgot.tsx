import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import SpinningLogo from '@/components/SpinningLogo'; 

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleResetRequest = () => {
// where reset password will live later
    setIsSent(true);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome5 name="arrow-left" size={20} color="#412D15" />
      </TouchableOpacity>

        <View style={styles.logoWrapper}>
        <SpinningLogo scale={0.5} speed={800}>
            <Text style={styles.jamText}>JAM</Text> 
        </SpinningLogo>
        </View>

      <View style={styles.content}>
        <Text style={styles.headerText}>Reset.</Text>
        
        {!isSent ? (
          <>
            <Text style={styles.subText}>Enter your email and we'll send you a link</Text>
            
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

            <TouchableOpacity style={styles.actionBtn} onPress={handleResetRequest}>
              <Text style={styles.btnTextLight}>Send Reset Link</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successState}>
            <FontAwesome5 name="check-circle" size={48} color="#412D15" style={styles.successIcon} />
            <Text style={styles.successText}>Link sent!</Text>
            <Text style={styles.subText}>Check your inbox for the reset instructions.</Text>
            
            <TouchableOpacity style={styles.returnBtn} onPress={() => router.back()}>
              <Text style={styles.btnTextDark}>Return to Login</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 80,
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
    lineHeight: 24,
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
  actionBtn: {
    backgroundColor: '#412D15',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  btnTextLight: {
    fontFamily: 'Bitcount',
    color: '#E1DCC9',
    fontSize: 18,
  },
  successState: {
    alignItems: 'flex-start',
  },
  successIcon: {
    marginBottom: 20,
  },
  successText: {
    fontFamily: 'Bitcount',
    fontSize: 24,
    color: '#412D15',
    marginBottom: 10,
  },
  returnBtn: {
    backgroundColor: '#E1DCC9', 
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  btnTextDark: {
    fontFamily: 'Bitcount',
    color: '#412D15',
    fontSize: 18,
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