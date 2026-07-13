import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { Mail } from 'lucide-react-native'; 
import SpinningLogo from '../components/SpinningLogo'; 
import { router } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';

export default function SmartLoginScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const styles = getStyles(theme);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const authCheck = setTimeout(() => {
      setIsBooting(false); 
    }, 2500);
    return () => clearTimeout(authCheck);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.logoWrapper} onPress={toggleTheme}>
        <SpinningLogo scale={1} speed={800}>
          <Text style={styles.jamText}>JAM</Text> 
        </SpinningLogo>
      </Pressable>

      {!isBooting && (
        <Animated.View entering={FadeIn.duration(800)} style={styles.authContainer}>
          <View style={styles.textBlock}>
            <Text style={styles.tagline}>Find Artists.</Text>
            <Text style={styles.tagline}>Show your Portfolio.</Text>
            <Text style={styles.tagline}>Jam.</Text>
          </View>

          {/* Google Sign Up */}
          <TouchableOpacity style={styles.googleBtn}>
            <FontAwesome5 name="google" size={20} color={theme.accent} />
            <Text style={styles.btnTextLight}>Continue with Google</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          {/* Email Sign Up */}
          <TouchableOpacity style={styles.emailBtn} onPress={() => router.push('/(auth)/signup')}>
            <Mail size={20} color={theme.textPrimary} />
            <Text style={styles.btnTextDark}>Sign up with Email</Text>
          </TouchableOpacity>

          {/* Log In */}
          <View style={styles.loginRow}>
            <Text style={styles.mutedText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/email')}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    marginBottom: 20,
    marginTop: 40,
  },
  jamText: {
    fontFamily: 'Bitcount', 
    fontSize: 48,
    color: theme.textPrimary,
    letterSpacing: 2,
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
    color: theme.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  googleBtn: {
    flexDirection: 'row',
    backgroundColor: theme.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  emailBtn: {
    flexDirection: 'row',
    backgroundColor: theme.accent, 
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 40,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  btnTextLight: {
    fontFamily: 'Bitcount',
    color: theme.accent,
    fontSize: 16,
    marginLeft: 14,
    marginTop: 4, 
  },
  btnTextDark: {
    fontFamily: 'Bitcount',
    color: theme.textPrimary,
    fontSize: 16,
    marginLeft: 14,
    marginTop: 4,
  },
  orText: {
    fontFamily: 'Bitcount',
    marginVertical: 18,
    fontSize: 18,
    color: theme.textPrimary,
  },
  loginRow: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  mutedText: {
    fontFamily: 'Inter',
    color: theme.textSecondary,
    fontSize: 14,
  },
  loginText: {
    fontFamily: 'Inter',
    color: theme.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});