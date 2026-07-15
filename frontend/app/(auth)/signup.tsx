import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';

export default function SignUpScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFakeSignUp = () => {
    // Better Auth LOgic Here
    router.replace('/(auth)/verify-email');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.headerText}>Join.</Text>
        <Text style={styles.subText}>Create an account to start jamming.</Text>

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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a secure password"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.actionBtn, (!email || !password) && { opacity: 0.5 }]} 
          disabled={!email || !password}
          onPress={handleFakeSignUp}
        >
          <Text style={styles.btnTextLight}>Create Account</Text>
        </TouchableOpacity>
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
  }
});