import React, { useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import { Divider } from "@react-native-material/core";

import BottomNavigationBar from "../Features/BottomNavigationBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 420,
    height: 50,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

const initialRoute = "http://localhost:3000";
const runFirst = `
      window.isRunningInWebView = true
      true; // note: this is required, or you'll sometimes get silent failures
    `;

const WebviewWrapper = () => {
  const webView = useRef<WebView>();
  const [route, setRoute] = useState(initialRoute);
  const stateChange = (event: any) => {
    setRoute(event.url);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WebView
          ref={webView}
          nestedScrollEnabled
          style={{ width: "100%" }}
          javaScriptEnabled={true}
          scrollEnabled={true}
          allowsFullscreenVideo={true}
          injectedJavaScriptBeforeContentLoaded={runFirst}
          onNavigationStateChange={stateChange}
          onMessage={(event) => {
            alert(event.nativeEvent.data);
          }}
          source={{
            uri: route,
            headers: {
              X_THRIVE_CLIENT: "thrive-ios",
            },
          }}
        />
      </ScrollView>
      <Divider />
      {!route.includes("login") && <BottomNavigationBar webviewRef={webView} />}
    </SafeAreaView>
  );
};

export default WebviewWrapper;
