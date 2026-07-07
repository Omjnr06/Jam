import { StyleSheet,TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
          <Link href="../index.tsx" asChild>
      <TouchableOpacity style={{ padding: 20, backgroundColor: '#412D15', borderRadius: 10, marginTop: 50 }}>
        <Text style={{ color: '#E1DCC9', fontFamily: 'Bitcount' }}>Go to Login Screen</Text>
      </TouchableOpacity>
    </Link>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
