import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import WebviewWrapper from "./components/WebviewWrapper";
import "expo-asset";
import "react-native-url-polyfill/auto";
import {useExpoUpdates} from "./utils/hooks/useExpoUpdates";

function App() {
  useExpoUpdates()
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(App);
