import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>

      <Text style={styles.h}>1) API used</Text>
      <Text style={styles.p}>TODO: (Image Picker / Camera / Location / ...)</Text>

      <Text style={styles.h}>2) Permissions</Text>
      <Text style={styles.p}>TODO: What permission did you request? What happens if denied?</Text>

      <Text style={styles.h}>3) Real-world use case</Text>
      <Text style={styles.p}>TODO: Why would a real app need this?</Text>

      <Text style={styles.h}>4) One challenge</Text>
      <Text style={styles.p}>TODO: What was confusing or tricky?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  h: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 6 },
  p: { fontSize: 16, lineHeight: 22 },
});