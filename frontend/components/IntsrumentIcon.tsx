import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';

interface InstrumentIconProps {
  instrument: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}

type MappedIcon =
  | { type: 'mci'; name: string }
  | { type: 'fa5'; name: string }
  | { type: 'custom'; name: 'cello' | 'clarinet' | 'flute' | 'harp' };

const ICON_MAP: Record<string, MappedIcon> = {
  'acoustic guitar': { type: 'mci', name: 'guitar-acoustic' },
  'guitar': { type: 'mci', name: 'guitar-acoustic' },
  'bass guitar': { type: 'mci', name: 'music-clef-bass' },
  'cello': { type: 'custom', name: 'cello' },
  'clarinet': { type: 'custom', name: 'clarinet' },
  'dj': { type: 'fa5', name: 'record-vinyl' },
  'drums': { type: 'fa5', name: 'drum' },
  'drum': { type: 'fa5', name: 'drum' },
  'electric guitar': { type: 'mci', name: 'guitar-electric' },
  'flute': { type: 'custom', name: 'flute' },
  'harp': { type: 'custom', name: 'harp' },
  'headphones': { type: 'mci', name: 'headphones' },
  'piano': { type: 'mci', name: 'piano' },
  'turntables': { type: 'fa5', name: 'record-vinyl' },
  'keyboard': { type: 'mci', name: 'piano' },
  'producer': { type: 'mci', name: 'headphones' },
  'saxophone': { type: 'mci', name: 'saxophone' },
  'trumpet': { type: 'mci', name: 'trumpet' },
  'violin': { type: 'mci', name: 'violin' },
  'vocals': { type: 'fa5', name: 'microphone-alt' },
  'microphone-alt': { type: 'fa5', name: 'microphone-alt' },
};

const normalize = (s: string) => s.trim().toLowerCase();
function CustomInstrumentSvg({ name, size, color }: { name: string; size: number; color: string }) {
  switch (name) {
    case 'cello':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2c-1.5 1-2 2.3-2 3.5 0 1 .4 1.6 1 2-1.8.6-3 2.3-3 4.3 0 1.6.8 2.8 2 3.5-1.4.7-2.3 2.1-2.3 3.7 0 2.3 1.9 4.2 4.3 4.2s4.3-1.9 4.3-4.2c0-1.6-.9-3-2.3-3.7 1.2-.7 2-1.9 2-3.5 0-2-1.2-3.7-3-4.3.6-.4 1-1 1-2 0-1.2-.5-2.5-2-3.5z"
            stroke={color}
            strokeWidth={1.5}
          />
          <Path d="M9.5 9.5c.5.8 1.5.8 2 0M14.5 9.5c-.5.8-1.5.8-2 0" stroke={color} strokeWidth={1} />
        </Svg>
      );
    case 'clarinet':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="10.5" y="2" width="3" height="16" rx="1.5" stroke={color} strokeWidth={1.5} />
          <Path d="M9 18l1.5 4h3L15 18" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
          <Circle cx="12" cy="7" r="0.8" fill={color} />
          <Circle cx="12" cy="10" r="0.8" fill={color} />
          <Circle cx="12" cy="13" r="0.8" fill={color} />
        </Svg>
      );
    case 'flute':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="10.5" width="20" height="3" rx="1.5" stroke={color} strokeWidth={1.5} />
          <Circle cx="7" cy="12" r="0.8" fill={color} />
          <Circle cx="11" cy="12" r="0.8" fill={color} />
          <Circle cx="15" cy="12" r="0.8" fill={color} />
          <Circle cx="19" cy="12" r="0.8" fill={color} />
        </Svg>
      );
    case 'harp':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M5 21V6c0-2 1.5-4 4-4h9l-4 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="7" y1="6" x2="12" y2="20" stroke={color} strokeWidth={0.8} />
          <Line x1="8.5" y1="5" x2="12.5" y2="18" stroke={color} strokeWidth={0.8} />
          <Line x1="10" y1="4.5" x2="13" y2="16" stroke={color} strokeWidth={0.8} />
        </Svg>
      );
    default:
      return null;
  }
}

export default function InstrumentIcon({ instrument, size = 18, color = '#412D15', style }: InstrumentIconProps) {
  const mapped = ICON_MAP[normalize(instrument)];

  if (!mapped) {
    return (
      <MaterialCommunityIcons
        name="music-clef-treble"
        size={size}
        color={color}
        style={style as StyleProp<TextStyle>}
      />
    );
  }

  if (mapped.type === 'mci') {
    return (
      <MaterialCommunityIcons
        name={mapped.name as any}
        size={size}
        color={color}
        style={style as StyleProp<TextStyle>}
      />
    );
  }
  if (mapped.type === 'fa5') {
    return (
      <FontAwesome5
        name={mapped.name}
        size={size}
        color={color}
        style={style as StyleProp<TextStyle>}
      />
    );
  }
  return (
    <View style={style as StyleProp<ViewStyle>}>
      <CustomInstrumentSvg name={mapped.name} size={size} color={color} />
    </View>
  );
}