import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';

export default function FeatureScreen({ route }) {
  const station = route?.params?.station ?? 'Pick a station in Explore';

  const [text, setText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (station !== 'Notifications') return;

    (async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status: requestedStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = requestedStatus;
      }

      if (finalStatus !== 'granted') {
        setPermissionGranted(false);
        setStatusMessage('Permission denied');
        return;
      }

      setPermissionGranted(true);
      setStatusMessage('');
    })();
  }, [station]);

  const scheduleNotification = async () => {
    if (!permissionGranted) {
      setStatusMessage('Enable notifications first');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Station H — Notifications',
        body: 'This notification was scheduled 5 seconds ago.',
      },
      trigger: { seconds: 5 },
    });

    setStatusMessage('Scheduled!');
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    setStatusMessage('Copied!');
  };

  const handlePaste = async () => {
    const value = await Clipboard.getStringAsync();
    setText(value);
    setStatusMessage('Pasted!');
  };

  if (station === 'Clipboard') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Station F — Clipboard</Text>
        <Text style={styles.p}>Copy and paste text.</Text>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type something to copy..."
          placeholderTextColor="#999"
          multiline
        />

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={handleCopy}>
            <Text style={styles.buttonText}>Copy</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handlePaste}>
            <Text style={styles.buttonText}>Paste</Text>
          </Pressable>
        </View>

        {statusMessage ? (
          <Text style={styles.status}>{statusMessage}</Text>
        ) : null}
      </View>
    );
  }

  if (station === 'Notifications') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Station H — Notifications</Text>
        <Text style={styles.p}>
          Schedule a local notification 5 seconds in the future.
        </Text>

        <Pressable style={styles.button} onPress={scheduleNotification}>
          <Text style={styles.buttonText}>Schedule Notification (5s)</Text>
        </Pressable>

        {statusMessage ? (
          <Text style={styles.status}>{statusMessage}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Feature</Text>
      <Text style={styles.p}>Selected station:</Text>
      <Text style={styles.station}>{station}</Text>

      <Text style={styles.p}>
        Implement ONE station on this screen. Don’t try to build all of them.
      </Text>

      <Text style={styles.h}>Starter plan</Text>
      <Text style={styles.p}>
        1) Install the station dependency{'\n'}
        2) Add state for output (image URI, coords, etc.){'\n'}
        3) Request permission (if needed){'\n'}
        4) Trigger the API with a button{'\n'}
        5) Render output or an error message
      </Text>

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Placeholder Button</Text>
      </Pressable>

      <Text style={styles.hint}>
        Replace the placeholder with your real feature UI.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  station: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  h: { marginTop: 10, marginBottom: 6, fontSize: 18, fontWeight: '700' },
  p: { fontSize: 16, marginBottom: 10, lineHeight: 22 },
  hint: { marginTop: 12, color: '#555', lineHeight: 20 },
  button: {
    marginTop: 10,
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 10 },
  status: { marginTop: 12, fontSize: 16, fontWeight: '600', color: '#2e7d32' },
});