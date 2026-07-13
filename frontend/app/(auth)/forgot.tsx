import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import SpinningLogo from '@/components/SpinningLogo'; 
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
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
        <FontAwesome5 name="arrow-left" size={20} color={theme.textPrimary} />
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
                placeholderTextColor={theme.textSecondary}
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
            <FontAwesome5 name="check-circle" size={48} color={theme.textPrimary} style={styles.successIcon} />
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

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    color: theme.textPrimary,
    marginBottom: 8,
  },
  subText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: theme.textPrimary,
    marginBottom: 40,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Bitcount',
    fontSize: 14,
    color: theme.textPrimary,
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 16,
    backgroundColor: theme.surface, 
    color: theme.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  actionBtn: {
    backgroundColor: theme.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  btnTextLight: {
    fontFamily: 'Bitcount',
    color: theme.accent,
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
    color: theme.textPrimary,
    marginBottom: 10,
  },
  returnBtn: {
    backgroundColor: theme.accent, 
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  btnTextDark: {
    fontFamily: 'Bitcount',
    color: theme.textPrimary,
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
    color: theme.textPrimary,
    letterSpacing: 2,
  },
});