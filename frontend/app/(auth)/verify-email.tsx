import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { router } from 'expo-router';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { Theme } from '@/constants/theme';

export default function VerifyEmailScreen() {
  const { theme } = useThemeStore();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    let interval: number; 
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) return;
    setIsVerifying(true);
    

    setTimeout(() => {
      setIsVerifying(false);
      router.replace('/(auth)/onboarding');
    }, 1500);
  };

  const handleResend = () => {
    if (timer === 0) setTimer(59);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <Mail color={theme.textPrimary} size={32} />
            </View>
            <Text style={styles.title}>Check your email.</Text>
            <Text style={styles.subtitle}>
              We sent a 6-digit verification code to your inbox.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.otpContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null
                  ]}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  placeholder="0"
                  placeholderTextColor={theme.accent}
                />
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.primaryButton,
                code.join('').length !== 6 && styles.buttonDisabled
              ]}
              onPress={handleVerify}
              disabled={code.join('').length !== 6 || isVerifying}
            >
              <Text style={styles.primaryButtonText}>
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </Text>
              {!isVerifying && <ArrowRight color={theme.accent} size={20} />}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resendContainer}
              onPress={handleResend}
              disabled={timer > 0}
            >
              <RefreshCw 
                color={timer > 0 ? theme.textSecondary : theme.textPrimary} 
                size={16} 
                style={styles.resendIcon}
              />
              <Text style={[
                styles.resendText,
                timer > 0 && styles.resendTextDisabled
              ]}>
                {timer > 0 ? `Resend in 0:${timer.toString().padStart(2, '0')}` : 'Resend code'}
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background, 
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.surface, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.accent,
  },
  title: {
    fontFamily: 'Bitcount', 
    fontSize: 32,
    color: theme.textPrimary, 
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: theme.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    opacity: 0.8,
  },
  formContainer: {
    width: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 48,
    height: 60,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.accent,
    borderRadius: 12,
    color: theme.textPrimary,
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: theme.primary, 
    backgroundColor: theme.background,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    height: 58,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontFamily: 'Bitcount',
    color: theme.accent,
    fontSize: 18,
    marginRight: 8,
    marginTop: 4,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  resendIcon: {
    marginRight: 8,
  },
  resendText: {
    fontFamily: 'Bitcount',
    color: theme.textPrimary,
    fontSize: 14,
    marginTop: 2,
  },
  resendTextDisabled: {
    color: theme.textSecondary,
  },
});