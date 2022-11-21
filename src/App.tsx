import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { registerRootComponent } from "expo"
import WebviewWrapper from "./components/WebviewWrapper";
import 'react-native-url-polyfill/auto';

function App() {
  return (
    <View style={styles.container}>
      <WebviewWrapper />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default registerRootComponent(App);
