import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const STATIONS = [
  'Image Picker',
  'Camera',
  'Location',
  'Haptics',
  'Share API',
  'Clipboard',
  'Linking',
  'Notifications',
];

export default function ExploreScreen({ navigation }) {
  const choose = (name) => {
    navigation.navigate('Feature', { station: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.p}>
        Pick ONE station. You will build it on the next screen.
      </Text>

      <Text style={styles.h}>Stations</Text>

      {STATIONS.map((name) => (
        <Pressable key={name} onPress={() => choose(name)} style={styles.item}>
          <Text style={styles.itemText}>{name}</Text>
        </Pressable>
      ))}

      <Text style={styles.hint}>
        Tip: start with Image Picker, Haptics, Clipboard, or Linking.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  p: { fontSize: 16, marginBottom: 10, lineHeight: 22 },
  h: { marginTop: 10, marginBottom: 8, fontSize: 18, fontWeight: '700' },
  item: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, fontWeight: '600' },
  hint: { marginTop: 12, color: '#555', lineHeight: 20 },
});