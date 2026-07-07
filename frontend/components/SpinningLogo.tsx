import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

const NUM_ICONS = 6;
const RADIUS = 110;
const ICONS = ['music', 'drum', 'microphone-alt', 'guitar', 'record-vinyl', 'headphones'];

interface SpinningLogoProps {
  scale?: number;
  speed?: number; 
  children?: React.ReactNode;
}

export default function SpinningLogo({ scale = 1, speed = 800, children }: SpinningLogoProps) {
  const step = useSharedValue(0);

  useEffect(() => {
    const metronome = setInterval(() => {
      step.value = withTiming(step.value + 1, {
        duration: speed,
        easing: Easing.inOut(Easing.quad), 
      });
    }, speed + 60);

    return () => clearInterval(metronome);
  }, [speed]); 

  return (
    <View style={[styles.orbitContainer, { transform: [{ scale }] }]}>
      {children}
      
      {ICONS.map((icon, index) => {
        const offsetAngle = ((2 * Math.PI) / NUM_ICONS) * index;

        const animatedOrbitStyle = useAnimatedStyle(() => {
          const currentAngle = offsetAngle + ((2 * Math.PI) / NUM_ICONS) * step.value;
          return {
            transform: [
              { translateX: Math.cos(currentAngle) * RADIUS },
              { translateY: Math.sin(currentAngle) * RADIUS },
            ],
          };
        });

        return (
          <Animated.View key={index} style={[styles.iconWrapper, animatedOrbitStyle]}>
            <FontAwesome5 name={icon} size={32} color="#412D15" />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  orbitContainer: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    position: 'absolute', 
  },
});